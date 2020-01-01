import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
import Button from '../index';
import MButton from '../index.m';

describe('Button', () => {
	let vm;
	afterEach(() => {
		vm && destroyVM(vm);
	});
	// 基础设置
	it('basic', () => {
		expect(typeof Button).to.equal('object');
		expect(typeof MButton).to.equal('object');

		vm = createComponent(Button, {});
		expect(typeof vm).to.equal('object');

	});

	it('type', () => {
		vm = createComponent(Button, {
			type: 'primary'
		});
		expect(vm.$el.classList.contains('vc-btn')).to.equal(true);
		expect(vm.$el.classList.contains('is-primary')).to.equal(true);
	});

	it('disabled', () => {
		vm = createComponent(Button, {
			disabled: true
		});
		
		expect(vm.$el.classList.contains('is-disabled')).to.equal(true);
	});

	it('circle', () => {
		vm = createComponent(Button, {
			circle: true
		});
		
		expect(vm.$el.classList.contains('is-circle')).to.equal(true);
	});

	it('size', () => {
		vm = createComponent(Button, {
			size: 'medium'
		});
		
		expect(vm.$el.classList.contains('is-medium')).to.equal(true);
	});

	it('icon', () => {
		vm = createComponent(Button, {
			icon: 'm-search'
		});
		
		expect(!!vm.$el.querySelector('.vc-icon')).to.equal(true);
		expect(vm.icon).to.equal('m-search');
	});

	it('long', () => {
		vm = createComponent(Button, {
			long: true
		});
		
		expect(vm.$el.classList.contains('is-long')).to.equal(true);
	});

	it('htmlType', async () => {
		vm = createComponent(Button, {
			htmlType: 'submit'
		});
		
		expect(vm.$el.getAttribute('type')).to.be.equal('submit');
	});

	it('wait', async () => {
		let count = 0;
		vm = createVue({
			template: `
				<vc-button @click="handleClick" :wait="0.25">测试</vc-button>
			`,
			components: {
				'vc-button': Button
			},
			methods: {
				handleClick() {
					count++;
				}
			}
		});

		vm.$el.click();
		vm.$el.click();
		vm.$el.click();

		expect(count).to.equal(1);

		await wait(1);
		vm.$el.click();
		vm.$el.click();
		vm.$el.click();
		expect(count).to.equal(2);
	});

	it('promise resolve', async () => {
		let count = 0;
		vm = createVue({
			template: `
				<vc-button ref="target" @click="handleClick" :wait="0.25">测试</vc-button>
			`,
			components: {
				'vc-button': Button
			},
			methods: {
				handleClick() {
					return new Promise((resolve) => {
						setTimeout(resolve, 2000);
					});
				}	
			}
		});
		vm = vm.$refs.target;
		vm.$el.click();
		expect(vm.isLoading).to.be.equal(true);
		await wait(3);
		expect(vm.isLoading).to.be.equal(false);
	});

	it('promise reject', async () => {
		let count = 0;
		vm = createVue({
			template: `
				<vc-button ref="target" @click="handleClick" :wait="0.25">测试</vc-button>
			`,
			components: {
				'vc-button': Button
			},
			methods: {
				handleClick() {
					return new Promise((resolve, reject) => {
						setTimeout(reject, 2000);
					});
				}	
			}
		});
		vm = vm.$refs.target;
		vm.$el.click();
		expect(vm.isLoading).to.be.equal(true);
		await wait(3);
		expect(vm.isLoading).to.be.equal(false);
	});

	it('group', async () => {
		let count = 0;
		vm = createVue({
			template: `
				<vc-button-group ref="target" size="small" circle vertical>
					<vc-button>small</vc-button>
					<vc-button>small</vc-button>
					<vc-button>small</vc-button>
				</vc-button-group>
			`,
			components: {
				'vc-button': Button,
				'vc-button-group': Button.Group
			}
		});
		vm = vm.$refs.target;
		expect(vm.$el.classList.contains('vc-btn-group')).to.equal(true);
		expect(vm.$el.classList.contains('is-small')).to.equal(true);
		expect(vm.$el.classList.contains('is-circle')).to.equal(true);
		expect(vm.$el.classList.contains('is-vertical')).to.equal(true);
	});
});
