import { createVue, destroyVM } from '@tests/helper';
import Checkbox from '..';

describe('Checkbox', () => {
	let vm;

	afterEach(() => {
		destroyVM(vm);
	});
	
	it('basic', () => {
		expect(!!Checkbox).to.equal(true);
	});

	it('create', () => {
		vm = createVue({
			template: `
				<vc-checkbox v-model="checked"></vc-checkbox>
			`,
			components: {
				'vc-checkbox': Checkbox
			},
			data() {
				return {
					checked: false
				};
			}
		});
		let checkboxEl = vm.$el;
		checkboxEl.click();
		expect(vm.checked).to.be.true;
	});

	it('disabled', () => {
		vm = createVue({
			template: `
				<vc-checkbox v-model="checked" disabled></vc-checkbox>
			`,
			components: {
				'vc-checkbox': Checkbox
			},
			data() {
				return {
					checked: false
				};
			}
		});
		let checkboxEl = vm.$el;
		expect(checkboxEl.className.includes('is-disabled')).to.be.true;
		checkboxEl.click();
		expect(vm.checked).to.be.false;
	});

	it('checkbox group', () => {
		vm = createVue({
			template: `
				<vc-checkbox-group v-model="checkedList">
					<vc-checkbox ref="boxA" label="a"></vc-checkbox>
					<vc-checkbox ref="boxB" label="b"></vc-checkbox>
					<vc-checkbox ref="boxC" label="c"></vc-checkbox>
				</vc-checkbox-group>
			`,
			components: {
				'vc-checkbox': Checkbox,
				'vc-checkbox-group': Checkbox.Group
			},
			data() {
				return {
					checkedList: []
				};
			}
		});
		vm.$refs.boxA.$el.click();
		expect(vm.checkedList.includes('a')).to.be.true;
		vm.$refs.boxB.$el.click();
		expect(vm.checkedList).to.deep.equal(['a', 'b']);
		vm.$refs.boxA.$el.click();
		expect(vm.checkedList).to.deep.equal(['b']);
	});

	it('checkbox group change event', done => {
		vm = createVue({
			template: `
				<vc-checkbox-group :value="checkedList" @change="handleChange">
					<vc-checkbox label="a"></vc-checkbox>
					<vc-checkbox label="b"></vc-checkbox>
					<vc-checkbox label="c"></vc-checkbox>
				</vc-checkbox-group>
			`,
			components: {
				'vc-checkbox': Checkbox,
				'vc-checkbox-group': Checkbox.Group
			},
			data() {
				return {
					checkedList: ['a']
				};
			},
			methods: {
				handleChange(v) {
					this.checkedList = v;
				}
			}
		});

		// 外部改变，看是否会使内部触发change而导致无限循环
		vm.$nextTick(() => {
			vm.checkedList = ['b', 'c'];
			done();
		});
	});

	it('trueValue & falseValue', () => {
		vm = createVue({
			template: `
				<vc-checkbox 
					v-model="checked"
					:true-value="1"
					:false-value="0"
				>
				</vc-checkbox>
			`,
			components: {
				'vc-checkbox': Checkbox
			},
			data() {
				return {
					checked: 0
				};
			}
		});
		let checkboxEl = vm.$el;
		checkboxEl.click();
		expect(vm.checked).to.be.equal(1);
	});
});