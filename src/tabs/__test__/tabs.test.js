import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
import { DOM } from '@wya/utils';
import Tabs from '..';
import MTabs from '../index.m';

describe('Tabs', () => {
	it('basic', () => {
		expect(!!Tabs).to.equal(true);
		expect(!!MTabs).to.equal(true);
	});


	it('click', async () => {
		let count = 0;
		let vm = createVue({
			template: `
				<vc-tabs
					v-model="value"
					:animated="animated"
					:type="type"
					closable
					@click="handleClick"
					@tab-remove="handleRemove"
				>
					<template #extra>
						<div>extra</div>
					</template>
					<vc-tabs-pane
						v-for="i in tabs"
						:label="i.label"
						:name="i.name.toString()"
						:key="i.name"
					>
						<div v-for="item in list" :key="item">
							<div>标签{{i.label}}的内容</div>
							<div>标签{{i.label}}的内容</div>
						</div>
					</vc-tabs-pane>
				</vc-tabs>
			`,
			data() {
				return {
					value: 6,
					animated: false,
					type: 'line',
					list: Array.from({ length: 200 }, (_, i) => i),
					tabs: Array.from({ length: 20 }, (_, i) => {
						return {
							label: `标签${i}`,
							name: i
						};
					})
				};
			},
			components: {
				'vc-tabs': Tabs,
				'vc-tabs-pane': Tabs.Pane
			},
			methods: {
				handleClick() {
					count++;
				},
				handleRemove() {
				},
			}
		});

		// 渲染节点
		await wait(0.2);
		let items = document.querySelectorAll('.vc-tabs__item');
		items[11].click();
		expect(count).to.equal(1);
		expect(vm.value).to.equal('11');


		items[1].click();
		vm.tabs[3].label = '第3标签';
		// 防抖
		await wait(0.3);
		items[0].click();
		expect(vm.value).to.equal('0');

		await wait(0.3);
		items[1].click();
		expect(vm.value).to.equal('1');

		await wait(0.3);
		items[1].click();
		expect(vm.value).to.equal('1');

		destroyVM(vm);
	});

	it('wrap-resize', async () => {
		let vm = createVue({
			template: `
				<vc-tabs
					v-model="value"
					:animated="animated"
					:type="type"
					closable
				>
					<template #extra>
						<div>extra</div>
					</template>
					<vc-tabs-pane
						v-for="(i, index) in tabs"
						:label="i.label"
						:key="index"
					>
						<div v-for="item in list" :key="item">
							<div>标签{{i.label}}的内容</div>
							<div>标签{{i.label}}的内容</div>
						</div>
					</vc-tabs-pane>
				</vc-tabs>
			`,
			data() {
				return {
					value: 6,
					animated: false,
					type: 'line',
					list: Array.from({ length: 20 }, (_, i) => i),
					tabs: Array.from({ length: 20 }, (_, i) => {
						return {
							label: `标签${i}`,
							name: ''
						};
					})
				};
			},
			components: {
				'vc-tabs': Tabs,
				'vc-tabs-pane': Tabs.Pane
			}
		});

		vm.tabs = vm.tabs.slice(0, 8);
		await wait(0.2);
		destroyVM(vm);
	});

	it('prev-next', async () => {
		let vm = createVue({
			template: `
				<div :style="style">
					<vc-tabs
						v-model="value"
						:animated="animated"
						:type="type"
						ref="tabs"
						closable
					>
						<template #extra>
							<div>extra</div>
						</template>
						<vc-tabs-pane
							v-for="(i, index) in tabs"
							:label="i.label"
							:key="index"
						>
							<div v-for="item in list" :key="item">
								<div>标签{{i.label}}的内容</div>
								<div>标签{{i.label}}的内容</div>
							</div>
						</vc-tabs-pane>
					</vc-tabs>
				</div>
			`,
			data() {
				return {
					value: 6,
					animated: false,
					type: 'line',
					list: Array.from({ length: 20 }, (_, i) => i),
					tabs: Array.from({ length: 20 }, (_, i) => {
						return {
							label: `标签${i}`,
							name: ''
						};
					}),
					style: {
						width: '670px'
					}
				};
			},
			components: {
				'vc-tabs': Tabs,
				'vc-tabs-pane': Tabs.Pane
			}
		});
		let target = vm.$refs.tabs;
		await wait(0.2);
		let prev = document.querySelector('.is-left');
		let next = document.querySelector('.is-right');
		let boxWidth = target.$refs.scroll.offsetWidth;
		let totalWidth = target.$refs.nav.offsetWidth;
		next.click();
		expect(target.scrollOffset).to.equal(boxWidth);
		let scrollOffset = target.scrollOffset;
		next.click();
		expect(target.scrollOffset).to.equal(scrollOffset + boxWidth);
		next.click();
		expect(target.scrollOffset).to.equal(totalWidth - boxWidth);
		next.click();
		scrollOffset = target.scrollOffset;
		prev.click();
		expect(target.scrollOffset).to.equal(scrollOffset - boxWidth);
		prev.click();
		prev.click();
		prev.click();
		expect(target.scrollOffset).to.equal(0);
		next.click();
		next.click();
		next.click();
		prev.click();
		next.click();
		target.$el.querySelector('.vc-tabs__bar').style.width = '1000px';
		await wait(0.1);
		vm.tabs = vm.tabs.slice(0, 8);
		target.$el.querySelector('.vc-tabs__bar').style.width = '2000px';
		await wait(0.1);
		destroyVM(vm);
	});

	it('mtabs', async () => {
		let vm = createVue({
			template: `
				<vcm-tabs
					ref="tabs"
					v-model="value"
					:average="average"
					:animated="animated"
					:sticky="sticky"
					:theme="theme"
					:autoAfloatWidth="autoAfloatWidth"
					:showWrapper="showWrapper"
					closable
					@click="$emit('click')"
					@tab-remove="$emit('remove')"
				>
					<template #extra>
						<div>extra</div>
					</template>
					<vcm-tabs-pane
						v-for="(i, index) in tabs"
						:label="i.label"
						:key="index"
					>
						<div v-for="item in list" :key="item">
							<div>标签{{i.label}}的内容</div>
							<div>标签{{i.label}}的内容</div>
						</div>
					</vcm-tabs-pane>
				</vcm-tabs>
			`,
			data() {
				return {
					value: 6,
					sticky: false,
					animated: false,
					theme: 'light',
					type: 'line',
					autoAfloatWidth: true,
					showWrapper: false,
					average: false,
					list: Array.from({ length: 20 }, (_, i) => i),
					tabs: Array.from({ length: 20 }, (_, i) => {
						return {
							label: `标签${i}`,
							name: ''
						};
					}),
					style: {
						width: '80px'
					}
				};
			},
			components: {
				'vcm-tabs': MTabs,
				'vcm-tabs-pane': MTabs.Pane
			}
		});

		let target = vm.$refs.tabs;
		vm.showWrapper = true;
		await wait(0.1);
		vm.value = 10;
		await wait(0.1);
		let $ = target.$refs.nav.querySelectorAll(`.vcm-tabs__item`)[10];
		expect(target.afloatWidth).to.equal($.querySelector('span').offsetWidth);
		vm.theme = 'dark';
		await wait(0.1);
		expect(target.afloatWidth).to.equal(20);
		vm.theme = 'light';
		vm.autoAfloatWidth = false;
		await wait(0.1);
		expect(target.afloatWidth).to.equal($.offsetWidth);

		vm.value = -1;
		await wait(0.1);
		expect(target.afloatOffset).to.equal(0);

		vm.average = true;
		await wait(0.1);
		expect(DOM(target.$el.querySelector('.vcm-tabs__item')).hasClass('is-average')).to.equal(true);

		target.$el.style.width = '1000px';
		await wait(0.1);

		destroyVM(vm);
	});

	it('mtabs-sticky', async () => {
		let vm = createVue({
			template: `
				<div
					style="width: 100%; height: 3000px; overflow: auto;"
					class="tab-wrap"
				>
					<span>asdasdasdasdasdasdasda</span>
					<vcm-tabs
						ref="tabs"
						v-model="value"
						:sticky="sticky"
						closable
						@click="$emit('click')"
						@tab-remove="$emit('remove')"
					>
						<template #extra>
							<div>extra</div>
						</template>
						<vcm-tabs-pane
							v-for="(i, index) in tabs"
							:label="i.label"
							:key="index"
						>
							<div v-for="item in list" :key="item">
								<div>标签{{i.label}}的内容</div>
								<div>标签{{i.label}}的内容</div>
							</div>
						</vcm-tabs-pane>
					</vcm-tabs>
				</div>
			`,
			data() {
				return {
					value: 6,
					sticky: true,
					list: Array.from({ length: 20 }, (_, i) => i),
					tabs: Array.from({ length: 20 }, (_, i) => {
						return {
							label: `标签${i}`,
							name: ''
						};
					}),
					style: {
						width: '80px'
					}
				};
			},
			components: {
				'vcm-tabs': MTabs,
				'vcm-tabs-pane': MTabs.Pane
			}
		});

		let target = vm.$refs.tabs;
		document.scrollingElement.scrollTop = 3000;
		expect(target.isFixed).to.equal(true);
		await wait(0.1);
		destroyVM(vm);
	});
});
