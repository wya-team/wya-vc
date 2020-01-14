import { createVue, createComponent, destroyVM, wait, waitImmediate, triggerEvent } from '@tests/helper';
import Cascader from '..';

const options = [{
	value: 'zhejiang',
	label: 'Zhejiang',
	children: [{
		value: 'hangzhou',
		label: 'Hangzhou',
		children: [{
			value: 'xihu',
			label: 'West Lake'
		}, {
			value: 'binjiang',
			label: 'Bin Jiang'
		}]
	}, {
	  value: 'ningbo',
	  label: 'NingBo',
	  children: [{
			value: 'jiangbei',
			label: 'Jiang Bei'
	  }, {
			value: 'jiangdong',
			label: 'Jiang Dong',
			disabled: true
	  }]
	}]
}, {
	value: 'jiangsu',
	label: 'Jiangsu',
	disabled: true,
	children: [{
		value: 'nanjing',
		label: 'Nanjing',
		children: [{
			value: 'zhonghuamen',
			label: 'Zhong Hua Men',
		}]
	}]
}];

const ANIMATION_TIME = 200; 
const getMenus = () => document.querySelectorAll('.vc-cascader-col');
const getOptions = (menuIndex) => getMenus()[menuIndex].querySelectorAll('.vc-cascader-col__item');
const selectedValue = ['zhejiang', 'hangzhou', 'xihu'];

describe('Cascader', () => {
	let vm;

	it('create', () => {
		vm = createComponent(Cascader);
		expect(vm.$el).to.exist;
	});

	afterEach(() => {
		vm.$destroy(true);
		destroyVM(vm);
	});

	it('basic', () => {
		expect(!!Cascader).to.equal(true);
	});

	it('toggle dropdown visible', async () => {
		vm = createComponent(Cascader);
		expect(document.querySelector('.vc-popover-core')).to.not.exist;
		vm.$el.click();
		await waitImmediate();
		expect(document.querySelector('.vc-popover-core')).to.exist;
	});

	it('expand', async () => {
		const vm = createComponent({
			template: `
				<vc-cascader 
					ref="cascader"
					v-model="value"
					:data-source="options"
					clearable />
			`,
			components: {
				'vc-cascader': Cascader
			},
			data() {
				return {
					value: [],
					options: [{
						value: 'beijing',
						label: '北京'
					},
					{
						value: 'suzhou',
						label: '苏州'
					}]
				};
			}
		});
		
		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();
		await wait(1);
		expect(getMenus().length).to.equal(1);
		destroyVM(vm);
	});

	it('should clear value when clearable icon click', async () => {
		const vm = createComponent({
			template: `
				<vc-cascader 
					ref="cascader"
					v-model="value"
					:data-source="options"
					clearable
					/>
			`,
			components: {
				'vc-cascader': Cascader
			},
			data() {
				return {
					value: selectedValue,
					options,
				};
			}
		});
		const trigger = vm.$el.querySelector('.vc-input');
		const icon = trigger.querySelector('.vc-icon');
		triggerEvent(document.querySelector('.vc-cascader'), 'mouseenter');
		icon.click();
		await waitImmediate();
		expect(icon.className).to.includes('vc-cascader__icon');
		expect(vm.value.length).to.equal(0);
		destroyVM(vm);
	});

	it('disabled', async () => {
		const vm = createComponent({
			template: `
				<vc-cascader 
					ref="cascader"
					v-model="value"
					:data-source="options"
					disabled
					clearable />
			`,
			components: {
				'vc-cascader': Cascader
			},
			data() {
				return {
					value: ['beijing', 'suzhou'],
					options: [{
						value: 'beijing',
						label: '北京'
					},
					{
						value: 'suzhou',
						label: '苏州'
					}]
				};
			}
		});
		const trigger = vm.$el.querySelector('.vc-input');
		expect(trigger.className).to.includes('is-disabled');
		const icon = trigger.querySelector('.vc-icon');
		icon.click();
		await waitImmediate();
		expect(vm.value.length).to.equal(2);
		destroyVM(vm);
	});

	it('with default value', async () => {
		const vm = createComponent({
			template: `
				<vc-cascader 
					v-model="value"
					:data-source="options"
					/>
			`,
			components: {
				'vc-cascader': Cascader
			},
			data() {
				return {
					value: selectedValue,
					options,
				};
			}
		});
		const el = vm.$el;
		const trigger = el.querySelector('.vc-input');
		trigger.click();
		await waitImmediate();
		expect(getMenus().length).to.equal(3);
		expect(vm.$el.querySelector('input').value).to.equal('Zhejiang / Hangzhou / West Lake');
		destroyVM(vm);
	});

	it('async set selected value', async () => {
		const vm = createComponent({
			template: `
				<vc-cascader 
					v-model="value"
					:data-source="options"
					/>
			`,
			components: {
				'vc-cascader': Cascader
			},
			data() {
				return {
					value: [],
					options,
				};
			}
		});

		const el = vm.$el;
		const trigger = el.querySelector('.vc-input');
		trigger.click();
		vm.value = selectedValue;
		await wait(1);
		
		expect(getMenus().length).to.equal(3);
		expect(getOptions(2)[0].className).to.includes('is-select');
		expect(vm.$el.querySelector('input').value).to.equal('Zhejiang / Hangzhou / West Lake');
		destroyVM(vm);
	});

	it('cell enter', async () => {
		const vm = createComponent({
			template: `
				<vc-cascader 
					ref="cascader"
					v-model="value"
					:data-source="options"
					clearable
					/>
			`,
			components: {
				'vc-cascader': Cascader
			},
			data() {
				return {
					value: selectedValue,
					options,
				};
			}
		});
		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();
		await waitImmediate();
		const cell = getOptions(2)[1];
		triggerEvent(cell, 'mouseenter');
		await wait(1);
		expect(getOptions(2)[1].className).to.includes('is-select');
		cell.click();
		await wait(1);
		expect(vm.value[2]).to.equal('binjiang');
		destroyVM(vm);
	});

	it('async load data', async () => {
		const vm = createComponent({
			template: `
				<vc-cascader 
					ref="cascader"
					v-model="value"
					:data-source="options"
					:load-data="loadData"
					clearable
					/>
			`,
			components: {
				'vc-cascader': Cascader
			},
			data() {
				return {
					value: [],
					options: [{
						value: 'beijing',
						label: '北京',
						loading: false,
						children: []
					}]
				};
			},
			methods: {
				loadData() {
					return new Promise((resolve) => {
						setTimeout(() => {
							resolve([
								{
									value: 'gugong',
									label: '故宫'
								},
								{
									value: 'tiantan',
									label: '天坛'
								},
								{
									value: 'wangfujing',
									label: '王府井'
								}
							]);
						}, 200);
					});
				},
			}
		});
		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();
		await waitImmediate();
		const cell = getOptions(0)[0];
		triggerEvent(cell, 'mouseenter');
		await wait(2);
		expect(cell.className).to.includes('is-select');
		expect(getMenus().length).to.equal(2);
		destroyVM(vm);
	});
});