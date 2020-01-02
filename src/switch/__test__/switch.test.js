import { createVue, createComponent, wait, triggerKeyDown } from '@tests/helper';
import Switch from '../index';
import MSwitch from '../index.m';

describe('Switch', () => {
	it('basic', () => {
		expect(typeof Switch).to.equal('object');
		expect(typeof MSwitch).to.equal('object');

		const vm = createComponent(Switch, {});
		expect(typeof vm).to.equal('object');
	});

	it('value', () => {
		const vm = createComponent(Switch, {
			value: true
		});
		expect(vm.currentValue).to.equal(true);
		expect(vm.$el.classList.contains('is-checked')).to.equal(true);
	});

	it('trueValue', () => {
		const vm = createComponent(Switch, {
			trueValue: true,
			value: true
		});

		expect(vm.$el.classList.contains('is-checked')).to.equal(true);
	});
	it('falseValue', () => {
		const vm = createComponent(Switch, {
			falseValue: true,
		});

		expect(vm.falseValue).to.equal(true);
	});

	it('openText', () => {
		const vm = createComponent(Switch, {
			openText: 'ok',
			value: true
		});

		expect(vm.$el.outerText).to.equal('ok');
	});

	it('closeText', () => {
		const vm = createComponent(Switch, {
			closeText: 'close',
			value: false
		});

		expect(vm.$el.outerText).to.equal('close');
	});

	it('toggle true', () => {
		let count = 0;
		let vm = createVue({
			template: `
				<vc-switch @click="handleToggle"  ></vc-switch>
			`,
			components: {
				'vc-switch': Switch
			},
			data() {
				return {
					currentValue: false
				};
			},
			methods: {
				handleToggle() {
					this.currentValue = true;
					count++;
				}
			}
		});
		vm.$el.click();

		expect(vm.currentValue).to.equal(true);
		expect(count).to.equal(1);
	});

	it('toggle false', () => {
		let vm = createVue({
			template: `
				<vc-switch @click="handleToggle"  ></vc-switch>
			`,
			components: {
				'vc-switch': Switch
			},
			data() {
				return {
					currentValue: false,
					trueValue: true,
					falseValue: false,
				};
			},
			methods: {
				handleToggle() {
					this.currentValue = false;
				}
			}
		});
		vm.$el.click();
		expect(vm.currentValue).to.equal(false);
	});

	it('disabled', () => {
		let vm = createVue({
			template: `
				<vc-switch @click="handleToggle" disabled ></vc-switch>
			`,
			components: {
				'vc-switch': Switch
			},

			data() {
				return {
					currentValue: false,
				};
			},
			methods: {
				handleToggle() {
					this.currentValue = true;
				}
			}
		});
		vm.$el.click();

		expect(vm.currentValue).to.equal(false);
	});

	it('reset', () => {
		let vm = createVue({
			template: `
				<vc-switch @click="handleToggle" ></vc-switch>
			`,
			components: {
				'vc-switch': Switch
			},

			data() {
				return {
					currentValue: 1,
					trueValue: 1,
					falseValue: 0
				};
			},
			methods: {
				handleToggle() {
					this.currentValue = 1;
				}
			}
		});
		vm.$el.click();

		expect(vm.currentValue).to.equal(1);

	});

	it("reset false", () => {
		let vm = createVue({
			template: `
				<vc-switch
				ref="target"
				v-model="value"
				:true-value="1"
				:false-value="0"
				></vc-switch>
			`,
			components: {
				"vc-switch": Switch
			},

			data() {
				return {
					value: true
				};
			}
		});
		vm.$el.click();
		expect(vm.value).to.equal(1);
	});

	it("space to toggle", () => {
		let vm = createVue({
			template: `
				<vc-switch v-model="value"></vc-switch>
			`,
			components: {
				"vc-switch": Switch
			},

			data() {
				return {
					value: true
				};
			}
		});
		triggerKeyDown(vm.$el, 32);
		expect(vm.value).to.equal(false);
	});

	it("trueValue equal false", () => {
		let vm = createVue({
			template: `
				<vc-switch
				ref="target"
				:true-value="false"
				@click="handleToggle"
				></vc-switch>
			`,
			components: {
				"vc-switch": Switch
			},

			data() {
				return {
					value: true
				};
			},
			methods: {
				handleToggle() {
					this.value = false;
				}
			}
		});
		vm.$el.click();
		expect(vm.value).to.equal(false);
	});
	it("切换，但是不是异步执行的", async () => {
		let count = 0;
		let vmReso = createVue({
			template: `
				<vc-switch ref="target" @click="handleToggle" ></vc-switch>
			`,
			components: {
				"vc-switch": Switch
			},
			data() {
				return {
					value: false
				};
			},
			methods: {
				handleToggle() {
					count++;
					return true;
				}
			}
		});
		vmReso = vmReso.$refs.target;
		vmReso.$el.click();
		expect(count).to.be.equal(1);
	});

	it('promise resolve', async () => {
		let vmReso = createVue({
			template: `
				<vc-switch ref="target" @click="handleToggle" :wait="0.25" ></vc-switch>
			`,
			components: {
				'vc-switch': Switch
			},
			data() {
				return {
					value: false,
				};
			},
			methods: {
				handleToggle() {
					return new Promise((resolve, reject) => {
						setTimeout(resolve, 2000);
					});
				}
			}
		});
		vmReso = vmReso.$refs.target;
		vmReso.$el.click();
		expect(vmReso.loading).to.be.equal(true);
		await wait(2);
		expect(vmReso.loading).to.be.equal(false);
	});


	it('promise reject', async () => {
		let vm = createVue({
			template: `
				<vc-switch ref="target" @click="handleToggle" :wait="0.25" ></vc-switch>
			`,
			components: {
				'vc-switch': Switch
			},
			data() {
				return {

				};
			},
			methods: {
				handleToggle() {
					return new Promise((resolve, reject) => {
						setTimeout(reject, 2000);
					});
				}
			}
		});
		vm = vm.$refs.target;
		vm.$el.click();
		expect(vm.loading).to.be.equal(true);
		await wait(2);
		expect(vm.loading).to.be.equal(false);
	});




});
