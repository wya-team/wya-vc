import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
import Slider from '..';

const triggerEvent = (el, name, opts) => {
	if (/^mouse/.test(name)) {
		el.dispatchEvent(new MouseEvent(name, opts));
	} else if (/^touch/.test(name)) {
		el.dispatchEvent(new TouchEvent(name, opts));
	}
	return event;
};

describe('Slider', () => {
	it('basic', () => {
		expect(!!Slider).to.equal(true);
	});

	it('simple-slider', async () => {
		let vm = createVue({
			template: `
				<vc-slider
					v-model="value"
					ref="slider"
					style="width: 100px;"
					show-stops
					:showTip="showTip"
				/>
			`,
			components: {
				'vc-slider': Slider,
			},
			data() {
				return {
					value: 25,
					showTip: 'always'
				};
			},
		});

		await wait(0.1);
		let el = vm.$refs.slider;
		let bt = document.querySelector('.vc-slider__btn-wrapper');
		let { x, y } = bt.getBoundingClientRect();

		triggerEvent(bt, 'mousedown', { clientX: x });
		triggerEvent(window, 'mousemove', { clientX: x + 50 });
		await wait(0.1);
		triggerEvent(window, 'mouseup');
		expect(vm.value).to.equal(75);

		let warp = document.querySelector('.vc-slider__wrapper');
		warp.dispatchEvent(new MouseEvent('click', {
			clientX: x + 25,
		}));

		let offsetLeft = warp.getBoundingClientRect().left;
		expect(vm.value === x + 25 - offsetLeft).to.equal(true);

		let popBt = document.querySelector('.vc-slider__button');
		triggerEvent(popBt, 'mouseenter');
		expect(el.minVisible).to.true;
		triggerEvent(popBt, 'mouseleave');
		expect(el.minVisible).to.true;
		triggerEvent(popBt, 'mousedown');

		destroyVM(vm);
	});

	it('range-slider', async () => {
		let vm = createVue({
			template: `
				<vc-slider
					v-model="value"
					ref="slider"
					style="width: 100px;"
					range
					show-stops
				/>
			`,
			components: {
				'vc-slider': Slider,
			},
			data() {
				return {
					value: [25, 50],
				};
			},
		});

		await wait(0.1);
		let el = vm.$refs.slider;
		let minBt = document.querySelectorAll('.vc-slider__btn-wrapper')[0];
		let maxBt = document.querySelectorAll('.vc-slider__btn-wrapper')[1];
		let { x, y } = minBt.getBoundingClientRect();

		triggerEvent(minBt, 'mousedown', { clientX: x });
		triggerEvent(window, 'mousemove', { clientX: x + 10 });
		await wait(0.1);
		triggerEvent(window, 'mouseup');
		expect(vm.value[0]).to.equal(35);
		expect(vm.value[1]).to.equal(50);

		triggerEvent(minBt, 'mousedown', { clientX: x + 10 });
		triggerEvent(window, 'mousemove', { clientX: x + 50 });
		triggerEvent(window, 'mouseup');
		expect(vm.value[0]).to.equal(75);
		expect(vm.value[1]).to.equal(75);

		triggerEvent(maxBt, 'mousedown', { clientX: x + 50 });
		triggerEvent(window, 'mousemove', { clientX: x + 20 });
		triggerEvent(window, 'mouseup');

		expect(vm.value[0]).to.equal(45);
		expect(vm.value[1]).to.equal(45);

		triggerEvent(maxBt, 'mousedown', { clientX: x + 20 });
		triggerEvent(window, 'mousemove', { clientX: x + 70 });
		triggerEvent(window, 'mouseup');
		expect(vm.value[0]).to.equal(45);
		expect(vm.value[1]).to.equal(95);

		let warp = document.querySelector('.vc-slider__wrapper');
		warp.dispatchEvent(new MouseEvent('click', {
			clientX: x + 30,
		}));
		let offsetLeft = warp.getBoundingClientRect().left;
		expect(vm.value[0] === x + 30 - offsetLeft).to.equal(true);

		warp.dispatchEvent(new MouseEvent('click', {
			clientX: x + 60,
		}));
		expect(vm.value[1] === x + 60 - offsetLeft).to.equal(true);

		destroyVM(vm);
	});

	it('input-slider', async () => {
		let vm = createVue({
			template: `
				<vc-slider
					v-model="value"
					ref="slider"
					style="width: 100px;"
					:min="20"
					:max="60"
					show-input
				/>
			`,
			components: {
				'vc-slider': Slider,
			},
			data() {
				return {
					value: 25,
				};
			},
		});

		let slider = vm.$refs.slider;
		slider.handleInputChange(40);
		await wait(0.1);
		expect(slider.currentValue[0]).to.equal(40);

		destroyVM(vm);
	});

	it('float-slider', async () => {
		let vm = createVue({
			template: `
				<vc-slider
					v-model="value"
					ref="slider"
					style="width: 100px;"
					:step="0.1"
				/>
			`,
			components: {
				'vc-slider': Slider,
			},
			data() {
				return {
					value: 25.2,
				};
			},
		});

		await wait(0.1);
		let el = vm.$refs.slider;
		let bt = document.querySelector('.vc-slider__btn-wrapper');
		let { x, y } = bt.getBoundingClientRect();

		triggerEvent(bt, 'mousedown', { clientX: x });
		triggerEvent(window, 'mousemove', { clientX: x + 50 });
		triggerEvent(window, 'mouseup');
		expect(vm.value).to.equal(75.2);

		destroyVM(vm);
	});

	it('disabled', async () => {
		let vm = createVue({
			template: `
				<vc-slider
					v-model="value"
					ref="slider"
					style="width: 100px;"
					:disabled="disabled"
				/>
			`,
			components: {
				'vc-slider': Slider,
			},
			data() {
				return {
					value: 25,
					disabled: true
				};
			},
		});

		await wait(0.1);
		let el = vm.$refs.slider;
		let bt = document.querySelector('.vc-slider__btn-wrapper');
		let { x, y } = bt.getBoundingClientRect();

		triggerEvent(bt, 'mousedown', { clientX: x });
		triggerEvent(window, 'mousemove', { clientX: x + 50 });
		triggerEvent(window, 'mouseup');
		expect(vm.value).to.equal(25);

		let warp = document.querySelector('.vc-slider__wrapper');
		warp.dispatchEvent(new MouseEvent('click', {
			clientX: x + 25,
		}));
		expect(vm.value).to.equal(25);
		destroyVM(vm);
	});

	it('touch', async () => {
		let vm = createVue({
			template: `
				<vc-slider
					v-model="value"
					ref="slider"
					style="width: 100px;"
				/>
			`,
			components: {
				'vc-slider': Slider,
			},
			data() {
				return {
					value: 25,
				};
			},
		});

		await wait(0.1);
		let el = vm.$refs.slider;
		let bt = document.querySelector('.vc-slider__btn-wrapper');
		let { x, y } = bt.getBoundingClientRect();

		let touchStart = new TouchEvent('touchstart');
		Object.defineProperty(touchStart, 'touches', {
			value: []
		});
		touchStart.touches[0] = { clientX: x };
		bt.dispatchEvent(touchStart);

		let touchMove = new TouchEvent('touchmove');
		Object.defineProperty(touchMove, 'touches', {
			value: []
		});
		touchMove.touches[0] = { clientX: x + 50 };
		bt.dispatchEvent(touchMove);

		window.dispatchEvent(touchMove);
		await wait(0.1);
		window.dispatchEvent(new TouchEvent('touchend', {}));
		expect(vm.value).to.equal(75);

		destroyVM(vm);
	});
});
