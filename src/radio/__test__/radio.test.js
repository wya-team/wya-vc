import { createVue, createComponent, destroyVM } from '@tests/helper';
import Radio from '..';
import MRadio from '../index.m';

describe('Radio', () => {
	it('basic', () => {
		expect(typeof Radio).to.equal('object');
		expect(typeof MRadio).to.equal('object');
		expect(typeof Radio.Group).to.equal('object');

	});

	it('disabled', () => {
		const vm = createComponent(Radio, {
			disabled: true
		});
		expect(vm.$el.classList.contains('is-disabled')).to.equal(true);

		destroyVM(vm);
	});

	it('vertical', () => {
		let vm = createVue({
			template: `
				<vc-radio-group v-model="animal" vertical>
					<vc-radio label="金斑蝶"/>
					<vc-radio label="爪哇犀牛"/>
					<vc-radio label="印度黑羚"/>
				</vc-radio-group>
			`,
			components: {
				'vc-radio': Radio,
				'vc-radio-group': Radio.Group
			},
			data() {
				return {
					animal: '金斑蝶'
				};
			}
		});
		expect(vm.$el.classList.contains('is-vertical')).to.equal(true);

		destroyVM(vm);
	});

	it('group', () => {
		let vm = createVue({
			template: `
				<vc-radio-group
					v-model="phone"
					ref="radioGroup"
					@change="handleChange"
					name="radio-group"
				>
					<vc-radio label="apple" ref="radio1"/>
					<vc-radio label="android" ref="radio2"/>
					<vc-radio label="unix" ref="radio3" disabled/>
				</vc-radio-group>
			`,
			components: {
				'vc-radio': Radio,
				'vc-radio-group': Radio.Group
			},
			data() {
				return {
					phone: 'apple'
				};
			},
			methods: {
				handleChange(e) {

				}
			}
		});
		let group = vm.$refs.radioGroup;
		let { radio1, radio2, radio3 } = vm.$refs;
		expect(group.currentValue === 'apple').to.equal(true);
		expect(group.name === 'radio-group').to.equal(true);
		radio2.$el.click();
		radio1.$el.click();
		radio2.$el.click();
		expect(vm.phone === 'android').to.equal(true);

		destroyVM(vm);
	});

	it('single', () => {
		let vm = createVue({
			template: `
				<div>
					<vc-radio
						v-model="single1"
						@change="handleChange"
						ref="radio1"
						:label="single1"
					/>
					<vc-radio
						v-model="single2"
						@change="handleChange"
						disabled
						ref="radio2"
						:label="single2"
					/>
				</div>
			`,
			components: {
				'vc-radio': Radio,
			},
			data() {
				return {
					single1: false,
					single2: false
				};
			},
			methods: {
				handleChange(e) {

				}
			}
		});
		let { radio1, radio2 } = vm.$refs;
		expect(vm.single1).to.equal(false);
		expect(vm.single2).to.equal(false);
		radio1.$el.click();
		radio2.$el.click();
		expect(vm.single1).to.equal(true);
		expect(vm.single2).to.equal(false);
		radio1.reset(false);
		expect(vm.single1 === '').to.equal(false);
		
		destroyVM(vm);
	});

});
