import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
import List from '..';
import MList from '../index.m';
import MForm from '../../form/index.m';

describe('List', () => {
	it('basic', () => {
		expect(!!List).to.equal(true);
		expect(!!MList).to.equal(true);
	});

	it('border', () => {
		const vm = createComponent(MList, {});
		expect(vm.$el.classList.contains('is-border')).to.equal(true);
	});

	it('arrow-icon', async () => {
		const vm = createVue({
			template: `
				<vcm-list :label-width="100" style="margin: 20px 0;">
					<vcm-list-item :arrow="arrow" label="姓名" ref="it">
						<template #label="">
							<div/>
						</template>
						<template #extra="">
							<div>2</div>
						</template>
					</vcm-list-item>
					<vcm-list-item label="姓名" extra="啦啦啦" />
					<vcm-list-item :arrow="arrow" label="姓名" extra="啦啦啦" />
				</vcm-list>
			`,
			components: {
				'vcm-list': MList,
				'vcm-list-item': MList.Item
			},
			data() {
				return {
					arrow: false
				};
			}
		});

		let it = vm.$refs.it;
		expect(it.arrow).to.equal(false);
		expect(it.icon).to.equal('right');
		vm.arrow = 'left';
		await wait(0.1);
		expect(it.icon).to.equal('left');
	});

	it('click', async () => {
		const vm = createVue({
			template: `
				<vcm-list :label-width="100" style="margin: 20px 0;">
					<vcm-list-item
						label="姓名"
						extra="啦啦啦"
						ref="it"
						@click="count++"
					/>
				</vcm-list>
			`,
			components: {
				'vcm-list': MList,
				'vcm-list-item': MList.Item
			},
			data() {
				return {
					count: 0
				};
			}
		});

		let it = vm.$refs.it;
		it.$el.click();
		await wait(0.1);
		expect(vm.count).to.equal(1);

		// 内部重定向无法测试 暂不测试
	});

	it('label-width', async () => {
		const vm = createVue({
			template: `
				<vcm-list style="margin: 20px 0;">
					<vcm-list-item
						label="姓名"
						extra="啦啦啦"
						:label-width="labelWidth"
						ref="it"
						@click="count++"
					/>
				</vcm-list>
			`,
			components: {
				'vcm-list': MList,
				'vcm-list-item': MList.Item
			},
			data() {
				return {
					labelWidth: 80
				};
			}
		});

		let it = vm.$refs.it;
		expect(it.labelStyle.width).to.equal('80px');
		vm.labelWidth = 0;
		await wait(0.1);
		expect(it.labelStyle.width).to.equal('auto');
	});

	it('form-list', () => {
		const vm = createVue({
			template: `
				<vcm-form>
					<vcm-form-item>
						<vcm-list-item label="姓名" ref="it" :multiple="multiple">
							<template #label="">
								<div>鬼畜嵌套</div>
							</template>
						</vcm-list-item>
					</vcm-form-item>
				</vcm-form>
			`,
			components: {
				'vcm-list': MList,
				'vcm-list-item': MList.Item,
				'vcm-form': MForm,
				'vcm-form-item': MForm.Item
			},
			data() {
				return {
					labelWidth: 80,
					multiple: false
				};
			}
		});
		let it = vm.$refs.it;
		expect(it.classes['is-alone']).to.equal(true);
		expect(it.classes['is-line']).to.equal(true);
		expect(it.classes['is-multi']).to.equal(false);
	});
});
