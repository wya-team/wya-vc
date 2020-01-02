import { createVue, destroyVM } from '@tests/helper';
import { DropdownMenu } from 'iview';
import Popconfirm from '..';

describe('Popconfirm', () => {
	let vm;

	afterEach(() => {
		vm && destroyVM(vm);
	});
	it('basic', () => {
		expect(!!Popconfirm).to.equal(true);
	});

	const createVM = () => {
		const contentRender = (h) => {
			return h(
				'div',
				{
					class: '_content'
				},
				'This is content'
			);
		};
		return createVue({
			template: `
				<vc-popconfirm 
					v-model="visible" 
					ref="popconfirm" 
					:render-content="contentRender"
				>
					<div class="_trigger">trigger</div>
				</vc-popconfirm>
			`,
			components: {
				'vc-popconfirm': Popconfirm
			},
			data() {
				return {
					visible: false
				};
			},
			methods: {
				contentRender
			}
		});
	};

	it('cancel', done => {
		// vm = createVM();
		const contentRender = (h) => {
			return h(
				'div',
				{
					class: '_content'
				},
				'This is content'
			);
		};
		vm = createVue({
			template: `
				<vc-popconfirm 
					v-model="visible" 
					ref="popconfirm" 
					:render-content="contentRender"
				>
					<div class="_trigger">trigger</div>
				</vc-popconfirm>
			`,
			components: {
				'vc-popconfirm': Popconfirm
			},
			data() {
				return {
					visible: false
				};
			},
			methods: {
				contentRender
			}
		});

		const popEl = vm.$refs.popconfirm.$el;

		popEl.querySelector('._trigger').click();

		expect(vm.visible).to.be.true;

		setTimeout(() => {
			const content = document.body.querySelector('._content');
			expect(content).to.be.exist;
			const footerBtns = document.body.querySelectorAll('.vc-popconfirm__footer .vc-btn');
			footerBtns[0].click();
		}, 500);

		setTimeout(() => {
			const content = document.body.querySelector('._content');
			expect(content).to.be.null;
			done();
		}, 2000);

	});

	it('promise ok', done => {
		vm = createVue({
			template: `
				<vc-popconfirm 
					v-model="visible" 
					ref="popconfirm" 
					@ok="handleOk"
				>
					<div class="_trigger">trigger</div>
					<template>
						<div class="_content">This is content.</div>
					</template>
				</vc-popconfirm>
			`,
			components: {
				'vc-popconfirm': Popconfirm
			},
			data() {
				return {
					visible: false,
					flag: false
				};
			},
			methods: {
				handleOk(e, cb) {
					return new Promise((resolve, reject) => {
						if (this.flag) {
							cb();
							resolve();
						} else {
							reject();
						}
					});
				}
			}
		});

		const instance = vm.$refs.popconfirm;
		instance.$el.querySelector('._trigger').click();

		expect(vm.visible).to.be.true;

		setTimeout(() => {
			const content = document.body.querySelector('._content');
			expect(content).to.be.exist;
			const footerBtns = document.body.querySelectorAll('.vc-popconfirm__footer .vc-btn');
			footerBtns[1].click();
		}, 500);

		setTimeout(() => {
			const content = document.body.querySelector('._content');
			expect(content).to.be.exist;
			vm.flag = true;
			const footerBtns = document.body.querySelectorAll('.vc-popconfirm__footer .vc-btn');
			footerBtns[1].click();
		}, 1000);

		setTimeout(() => {
			const content = document.body.querySelector('._content');
			expect(content).to.be.null;
			done();
		}, 5000);

	});
});