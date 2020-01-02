import { createVue, createComponent, destroyVM } from '@tests/helper';
import ColorPicker from '..';

describe('ColorPicker', () => {
	let vm;
	const ANIMATION_TIME = 300; 

	afterEach(() => {
		vm.$destroy(true);
		destroyVM(vm);
		
		// const popover = document.querySelector('.vc-popover-core');
		// if (popover && popover.parentNode) popover.parentNode.removeChild(popover);
	});

	it('should work', () => {
		vm = createComponent(ColorPicker);
		expect(vm.$el).to.exist;
	});

	it('should show color picker when click trigger', (done) => {
		vm = createVue(ColorPicker);

		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();

		setTimeout(() => {
			const popover = document.querySelector('.vc-popover-core');
			expect(popover).to.exist;
			done();
			destroyVM(vm);
		}, ANIMATION_TIME);
	});

	it('should pick a color when confirm button click', (done) => {
		const vm = createVue({
			template: `<vc-color-picker v-model="color" />`,
			components: {
				'vc-color-picker': ColorPicker
			},
			data() {
				return {
					color: '',
				};
			}
		});

		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();
		
		setTimeout(() => {
			const btn = document.querySelector('.vc-btn.is-primary');
			btn.click();
			vm.$nextTick(() => {
				expect(vm.color).to.equal('#FF0000');
				done();
				destroyVM(vm);
			});
		}, ANIMATION_TIME);
	});

	it('should show alpha slider when alpha=true', (done) => {
		const vm = createVue({
			template: `<vc-color-picker v-model="color" alpha />`,
			components: {
				'vc-color-picker': ColorPicker
			},
			data() {
				return {
					color: null
				};
			}
		});

		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();

		setTimeout(() => {
			const alphaSlider = document.querySelector('.vc-color-picker-alpha');
			expect(alphaSlider).to.exist;
			done();
			destroyVM(vm);
		}, ANIMATION_TIME);
	});

	it('should show correct rgb value', (done) => {
		const vm = createVue({
			template: `<vc-color-picker v-model="color" />`,
			components: {
				'vc-color-picker': ColorPicker
			},
			data() {
				return {
					color: '#FFFF00'
				};
			}
		});
		
		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();

		setTimeout(() => {
			const input = document.querySelector('.vc-color-picker__value input');
			expect(input.value.trim().toUpperCase()).to.equal('#FFFF00');
			done();
			destroyVM(vm);
		}, ANIMATION_TIME);
	});

	it('should init the right color when open', (done) => {
		const vm = createVue({
			template: `<vc-color-picker v-model="color" />`,
			components: {
				'vc-color-picker': ColorPicker
			},
			data() {
				return {
					color: '#0f0'
				};
			}
		});

		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();

		setTimeout(() => {
			const hueBar = document.querySelector('.vc-color-picker-hue-slider__thumb');
			const top = parseInt(hueBar.style.left, 10);
			expect(top > 10).to.be.true;
			done();
			destroyVM(vm);
		}, ANIMATION_TIME);
	});

	it('should clear a color when clear button click', (done) => {
		const vm = createVue({
			template: `<vc-color-picker v-model="color" />`,
			components: {
				'vc-color-picker': ColorPicker
			},
			data() {
				return {
					color: '#f00'
				};
			}
		});

		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();

		setTimeout(() => {
			const btn = document.querySelector('.vc-btn.is-default');
			btn.click();
			vm.$nextTick(() => {
				expect(vm.color).to.equal('');
				done();
				destroyVM(vm);
			});
		}, ANIMATION_TIME);
	});

	it('should change hue when clicking the hue bar', (done) => {
		const vm = createVue({
			template: `<vc-color-picker v-model="color" />`,
			components: {
				'vc-color-picker': ColorPicker
			},
			data() {
				return {
					color: '#f00'
				};
			}
		});

		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();

		setTimeout(() => {
			const hueBar = document.querySelector('.vc-color-picker-hue-slider');
			hueBar.__vue__.handleDrag({ clientX: 1000, clientY: 0 });
			vm.$nextTick(() => {
				const picker = vm.$children[0];
				expect(picker.color._hue > 0).to.true;
				done();
				destroyVM(vm);
			});
		}, ANIMATION_TIME);
	});	

	it('should change hue when saturation is zero', (done) => {
		const vm = createVue({
			template: `<vc-color-picker v-model="color" />`,
			components: {
				'vc-color-picker': ColorPicker
			},
			data() {
				return {
					color: '#FF0000'
				};
			}
		});

		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();

		setTimeout(() => {
			const hueBar = document.querySelector('.vc-color-picker-hue-slider');
			hueBar.__vue__.handleDrag({ clientX: 100, clientY: 0 });
			vm.$nextTick(() => {
				const thumb = document.querySelector('.vc-color-picker-hue-slider__thumb');
				expect(parseInt(thumb.style.left, 10) > 0).to.true;
				done();
				destroyVM(vm);
			});
		}, ANIMATION_TIME);
	});

	it('should change alpha when clicking the alpha bar', (done) => {
		const vm = createVue({
			template: `<vc-color-picker v-model="color" alpha />`,
			components: {
				'vc-color-picker': ColorPicker
			},
			data() {
				return {
					color: '#f00'
				};
			}
		});

		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();

		setTimeout(() => {
			const alphaSlider = document.querySelector('.vc-color-picker-alpha');
			alphaSlider.__vue__.handleDrag({ clientX: 100, clientY: 0 });
			vm.$nextTick(() => {
				const picker = vm.$children[0];
				expect(picker.color._alpha < 100).to.true;
				done();
				destroyVM(vm);
			});
		}, ANIMATION_TIME);
	});

	it('should change saturation and value when clicking the panel', (done) => {
		const vm = createVue({
			template: `<vc-color-picker v-model="color" format="hsv" />`,
			components: {
				'vc-color-picker': ColorPicker
			},
			data() {
				return {
					color: 'hsv(0, 50%, 50%)'
				};
			}
		});

		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();

		setTimeout(() => {
			const panel = document.querySelector('.vc-color-picker-panel');
			panel.__vue__.handleDrag({ clientX: 100, clientY: 0 });
			vm.$nextTick(() => {
				const picker = vm.$children[0];
				expect(picker.color._saturation !== 50).to.true;
				expect(picker.color._value !== 50).to.true;
				done();
				destroyVM(vm);
			});
		}, ANIMATION_TIME);
	});

	it('should change color to the selected color', done => {
		const vm = createVue({
			template: `<vc-color-picker v-model="color" alpha :colors="colors" />`,
			components: {
				'vc-color-picker': ColorPicker
			},
			data() {
				return {
					color: 'hsva(180, 65, 20, 0.5)',
					colors: [
						'rgba(19, 206, 102, 0.18)',
						'rgb(25, 159, 147)',
						'hsv(250, 54, 98)',
						'hsva(180, 65, 20, 0.5)',
						'hsl(170, 32%, 87%)',
						'hsla(45, 62%, 47%, 0.13)',
						'#7486de',
						'#45aa9477',
						'#892345'
					]
				};
			}
		});

		const trigger = vm.$el.querySelector('.vc-input');
		trigger.click();

		setTimeout(() => {
			expect(document.querySelectorAll('.vc-color-picker-predefine__block').length === 9).to.be.true;
			const selector = document.querySelector('.vc-color-picker-predefine__block:nth-child(4)');
			selector.click();
			vm.$nextTick(() => {
				const picker = vm.$children[0];
				expect(picker.color._hue === 180).to.be.true;
				expect(picker.color._saturation === 65).to.be.true;
				expect(picker.color._value === 20).to.be.true;
				expect(picker.color._alpha === 50).to.be.true;

				const selector2 = document.querySelector('.vc-color-picker-predefine__block:nth-child(3)');
				selector2.click();
				
				vm.$nextTick(() => {
					expect(picker.color._hue === 250).to.be.true;
					expect(picker.color._saturation === 54).to.be.true;
					expect(picker.color._value === 98).to.be.true;
					expect(picker.color._alpha === 100).to.be.true;
					done();
					destroyVM(vm);
				});
			});
		}, ANIMATION_TIME);
	});
});