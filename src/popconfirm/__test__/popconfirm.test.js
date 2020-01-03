import { createVue, destroyVM } from '@tests/helper';
import Popconfirm from '..';

describe('Popconfirm', () => {
	let vm;

	afterEach(() => {
		vm && destroyVM(vm);
	});
	it('basic', () => {
		expect(!!Popconfirm).to.equal(true);
	});

	const createVM = (options = {}) => {
		const { promise = true } = options;

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
					:renderContent="contentRender"
					@ok="handleOk"
				>
					<div class="_trigger">trigger</div>
				</vc-popconfirm>
			`,
			components: {
				'vc-popconfirm': Popconfirm
			},
			data() {
				return {
					visible: false,
					flag: false,
					promise
				};
			},
			methods: {
				contentRender,
				handleOk(e, cb) {
					if (this.promise) {
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
			}
		});
	};

	it('cancel', done => {
		vm = createVM();

		const popEl = vm.$refs.popconfirm.$el;

		popEl.querySelector('._trigger').click();

		expect(vm.visible).to.be.true;

		setTimeout(() => {
			const content = document.body.querySelector('._content');
			expect(vm.visible).to.be.true;
			expect(content).to.be.exist;

			const footerBtns = document.body.querySelectorAll('.vc-popconfirm__footer .vc-btn');
			footerBtns[0].click();
		}, 500);

		setTimeout(() => {
			const content = document.body.querySelector('._content');
			expect(vm.visible).to.be.false;
			expect(content).to.be.null;
			done();
		}, 1000);

	});

	it('sync ok', done => {

		vm = createVM({ promise: false });

		const instance = vm.$refs.popconfirm;
		instance.$el.querySelector('._trigger').click();

		expect(vm.visible).to.be.true;

		let actionBtns;
		let content;

		setTimeout(() => {
			content = document.body.querySelector('._content');
			expect(vm.visible).to.be.true;
			expect(content).to.be.exist;

			actionBtns = document.body.querySelectorAll('.vc-popconfirm__footer .vc-btn');
			actionBtns[1].click();
		}, 500);

		setTimeout(() => {
			content = document.body.querySelector('._content');
			expect(vm.visible).to.be.false;
			expect(content).to.be.null;
			done();
		}, 1000);
	});

	it('promise ok', done => {
		vm = createVM();

		const instance = vm.$refs.popconfirm;
		instance.$el.querySelector('._trigger').click();

		expect(vm.visible).to.be.true;

		let actionBtns;
		let content;

		// 期望页面上存在popover
		setTimeout(() => {
			content = document.body.querySelector('._content');
			expect(vm.visible).to.be.true;
			expect(content).to.be.exist;

			actionBtns = document.body.querySelectorAll('.vc-popconfirm__footer .vc-btn');
			// 点击‘确定’，此时期望reject
			actionBtns[1].click();
		}, 500);

		// 期望页面上的popover未被关闭
		setTimeout(() => {
			content = document.body.querySelector('._content');
			expect(vm.visible).to.be.true;
			expect(content).to.be.exist;

			// 再次点击‘确定’，此时期望resolve
			vm.flag = true;
			actionBtns[1].click();
		}, 1000);

		// 期望页面上的popover已被关闭，dom中不存在
		setTimeout(() => {
			content = document.body.querySelector('._content');
			expect(vm.visible).to.be.false;
			expect(content).to.be.null;
			done();
		}, 1500);
	});
});