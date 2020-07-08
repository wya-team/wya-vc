import {
	createVue,
	createComponent,
	destroyVM,
	wait,
	waitImmediate,
	triggerEvent
} from '@tests/helper';
import {
	expect
} from 'chai';
import Cascader from '..';
import dataSource from '../examples/basic/big-data';
import MCascader from '../index.m';

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

const ANIMATION_TIME = 1000;
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
					}
					]
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
					}
					]
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

	it('empty data when dataSource is empty', async () => {
		const vm = createComponent({
			template: `
					<vc-cascader 
						v-model="value"
						/>
				`,
			components: {
				'vc-cascader': Cascader
			},
			data() {
				return {
					value: [],
				};
			}
		});
		const el = vm.$el;
		const trigger = el.querySelector('.vc-input');
		trigger.click();
		await waitImmediate();
		const content = document.querySelector('.vc-cascader__content');
		expect(content.innerText).to.be.empty;
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
							resolve([{
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

describe('MCascader', () => {
	let vm;

	it('create', () => {
		vm = createComponent(MCascader);
		expect(vm.$el).to.exist;
	});

	afterEach(() => {
		vm.$destroy(true);
		destroyVM(vm);
	});

	it('basic', () => {
		expect(!!MCascader).to.equal(true);
	});

	it('show popover when click', (done) => {
		const vm = createComponent({
			template: `
					<vcm-cascader
					v-model="value"
					:data-source="dataSource"
					@ok="handleOk"
				/>`,
			components: {
				'vcm-cascader': MCascader
			},
			data() {
				return {
					dataSource,
					value: [],
					okValue: false,
				};
			},
			methods: {
				handleOk() {
					this.okValue = true;
				},
			}
		});
		const trigger = document.querySelector('.vcm-picker');
		trigger.click();
		setTimeout(() => {
			let popoverEl = document.querySelector('.vcm-cascader-picker-popup');
			expect(popoverEl).to.exist;
			const confirmBtn = document.querySelector('.vcm-cascader-picker-popup .vcm-picker-popup__item.is-right');
			confirmBtn.click();
			setTimeout(() => {
				expect(vm.okValue).to.be.true;
				destroyVM(vm);
				done();
			}, 1500);
			destroyVM(vm);
			done();
		}, ANIMATION_TIME);
	});

	it('use cascader-view', (done) => {
		const vm = createComponent({
			template: `
					<vcm-cascader-view
					ref="target"
					v-model="value"
					:data-source="dataSource"
					changeOnSelect
				/>`,
			components: {
				'vcm-cascader-view': MCascader.View
			},
			data() {
				return {
					dataSource: [{
						value: 'beijing',
						label: '北京',
						children: [{
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
						]
					},
					{
						value: 'jiangsu',
						label: '江苏',
						children: [{
							value: 'nanjing',
							label: '南京',
							children: [{
								value: 'fuzimiao',
								label: '夫子庙',
							}]
						},
						{
							value: 'suzhou',
							label: '苏州'
						}
						],
					}
					],
					value: [],
				};
			},
			mounted() {
				setTimeout(() => {
					this.value = ['jiangsu', 'nanjing'];
				}, 0);
			},
		});

		setTimeout(() => {
			expect(vm).to.exist;
			destroyVM(vm);
			done();
		}, 2000);
	});

	it('use function open', (done) => {
		MCascader.open({
			dataSource: options,
			value: ['jiangsu', 'nanjing'],
		});
		setTimeout(() => {
			let popoverEl = document.querySelector('.vcm-cascader-picker-popup');
			expect(popoverEl).to.exist;
			const valueTrigger = document.querySelector('.vcm-cascader-picker-popup .vcm-cascader-col__item');
			valueTrigger.click();
			setTimeout(() => {
				const selectIcon = document.querySelector('.vcm-cascader-picker-popup .vcm-cascader-col__select');
				expect(selectIcon).to.exist;
				const confirmBtn = document.querySelector('.vcm-cascader-picker-popup .vcm-picker-popup__item.is-right');
				confirmBtn.click();
				setTimeout(() => {
					popoverEl = document.querySelector('.vcm-cascader-picker-popup');
					expect(popoverEl).to.not.exist;
					destroyVM(vm);
					done();
				}, 2000);
			}, 1500);
		}, 1500);
	});

	it('should close popup when click', (done) => {
		MCascader.open({
			dataSource: options,
			value: [],
			onOk: () => {},
			onCancel: () => {}
		});
		setTimeout(() => {
			const closeBtn = document.querySelector('.vcm-cascader-picker-popup .vcm-picker-popup__item.is-left');
			closeBtn.click();
			setTimeout(() => {
				const popoverEl = document.querySelector('.vcm-cascader-picker-popup');
				expect(popoverEl).to.not.exist;
				destroyVM(vm);
				done();
			}, 1500);
		}, ANIMATION_TIME);
	});

	it('async load data', (done) => {
		const vm = createComponent({
			template: `
					<vcm-cascader
					v-model="value"
					:data-source="options"
					:load-data="loadData"
					@cancel="handleCancel"
				/>`,
			components: {
				'vcm-cascader': MCascader
			},
			data() {
				return {
					options: [],
					value: [],
					cancelValue: false
				};
			},
			methods: {
				loadData() {
					this.options = [{
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
					];
				},
				handleCancel() {
					this.cancelValue = true;
				}
			}
		});
		const trigger = document.querySelector('.vcm-picker');
		trigger.click();
		setTimeout(() => {
			let popoverEl = document.querySelector('.vcm-cascader-col__item');
			expect(popoverEl.innerText).to.equal('故宫');
			popoverEl.click();
			setTimeout(() => {
				expect(vm.options.length).to.equal(3);
				const closeBtn = document.querySelector('.vcm-cascader-picker-popup .vcm-picker-popup__item.is-left');
				closeBtn.click();
				setTimeout(() => {
					expect(vm.cancelValue).to.be.true;
					destroyVM(vm);
					done();
				}, 1500);
			}, 3000);
		}, 3000);
	});

	it('vcm-cascader-view default value', () => {
		const vm = createComponent({
			template: `
					<vcm-cascader-view
					ref="target"
					v-model="value"
					:data-source="dataSource"
					changeOnSelect
				/>`,
			components: {
				'vcm-cascader-view': MCascader.View
			},
			data() {
				return {
					dataSource: [],
					value: [],
				};
			},
		});
		const col = document.querySelector('vcm-cascader-col');
		expect(col).to.be.null;
		destroyVM(vm);
	});

	it('vcm-cascader-view async load data', (done) => {
		const vm = createComponent({
			template: `
					<vcm-cascader-view
					ref="target"
					v-model="value"
					:data-source="dataSource"
					:load-data="loadData"
				/>`,
			components: {
				'vcm-cascader-view': MCascader.View
			},
			data() {
				return {
					dataSource: [{
						value: 'beijing',
						label: '北京',
						children: [],
						loading: false
					}],
					value: [],
				};
			},
			methods: {
				loadData() {
					return new Promise((resolve) => {
						setTimeout(() => {
							resolve([{
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
						}, 0);
					});
				}
			}
		});
		const trigger = document.querySelector('.vcm-cascader-col__item');
		trigger.click();

		setTimeout(() => {
			expect(vm.dataSource[0].children.length).to.equal(3);
			destroyVM(vm);
			done();
		}, ANIMATION_TIME);
	});
	it('vcm-cascader-view use header', (done) => {
		const vm = createComponent({
			template: `
				<vcm-cascader-view
				v-model="value"
				:data-source="region"
				header
			/>`,
			components: {
				'vcm-cascader-view': MCascader.View
			},
			data() {
				return {
					dataSource,
					value: [],
					region: []
				};
			},
			mounted() {
				let chinaData = {
					label: '中国',
					value: 'china',
					children: []
				};
				let overseaData = {
					label: '海外地区',
					value: 'oversea',
					children: []
				};
				this.dataSource.forEach(item => {
					if (item.value === 1) {
						chinaData.children.push(...item.children);
					} else {
						overseaData.children.push(item);
					}
				});
				this.region = [chinaData, overseaData];
			}
		});
		setTimeout(() => {
			const trigger = document.querySelectorAll('.vcm-cascader-view__tab .vcm-cascader-view__label')[1]; // 点击海外
			trigger.click();

			setTimeout(() => {
				const list = document.querySelectorAll('.vcm-cascader-col__item');
				expect(list.length).to.equal(239);
				expect(vm.value[0]).to.equal('oversea');
				const colItem = document.querySelector('.vcm-cascader-col__item');
				colItem.click();
				setTimeout(() => {
					expect(vm.value[1]).to.equal(2);
					destroyVM(vm);
					done();
				}, ANIMATION_TIME);
			}, ANIMATION_TIME);
		}, ANIMATION_TIME);
	});
	it('vcm-cascader use header', (done) => {
		const vm = createComponent({
			template: `
				<vcm-cascader
				v-model="value"
				:data-source="region"
				header
			/>`,
			components: {
				'vcm-cascader': MCascader
			},
			data() {
				return {
					dataSource,
					value: [],
					region: []
				};
			},
			mounted() {
				let chinaData = {
					label: '中国',
					value: 'china',
					children: []
				};
				let overseaData = {
					label: '海外地区',
					value: 'oversea',
					children: []
				};
				this.dataSource.forEach(item => {
					if (item.value === 1) {
						chinaData.children.push(...item.children);
					} else {
						overseaData.children.push(item);
					}
				});
				this.region = [chinaData, overseaData];
			}
		});
		setTimeout(() => {
			const trigger = document.querySelector('.vcm-picker');
			trigger.click();
			setTimeout(() => {
				vm.$nextTick(() => {
					const header = document.querySelector('.vcm-cascader-view__tab');
					expect(header).to.exist;
					const headerItem = document.querySelectorAll('.vcm-cascader-view__tab .vcm-cascader-view__label')[1]; // 点击海外
					headerItem.click();

					setTimeout(() => {
						const list = document.querySelectorAll('.vcm-cascader-col__item');
						expect(list.length).to.equal(239);
						const colItem = document.querySelector('.vcm-cascader-col__item');
						colItem.click();
						setTimeout(() => {
							const childrenList = document.querySelectorAll('.vcm-cascader-col__item');
							expect(childrenList.length).to.equal(12);
							const childrenColItem = document.querySelector('.vcm-cascader-col__item');

							childrenColItem.click();
							const okBtn = document.querySelector('.vcm-cascader-picker-popup .vcm-picker-popup__item.is-right');
							okBtn.click();
							setTimeout(() => {
								expect(vm.value[1]).to.equal(2);
								destroyVM(vm);
								done();
							}, ANIMATION_TIME);
						}, ANIMATION_TIME);
					}, ANIMATION_TIME);
				});
			}, ANIMATION_TIME);
		}, 0);
	});
});
