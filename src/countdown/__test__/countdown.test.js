import { createVue, createComponent, wait, destroyVM } from '@tests/helper';
import Countdown from '../index';

describe('Countdown', () => {
	it('basic', () => {
		expect(!!Countdown).to.equal(true);
	});

	it('tag', () => {
		const vm = createComponent(Countdown, {
			tag: 'div',
			targetTime: '2019-12-24'
		});
		expect(vm.$el.tagName).to.equal('DIV');

		destroyVM(vm);
	});

	it('showZero', async () => {
		const vm = createComponent(Countdown, {
			showZero: true,
			targetTime: '2019-10-14',
			tag: 'div',
		});
		await wait(2);
		expect(vm.$el.innerHTML).to.equal('00天00小时00分00秒00');

		destroyVM(vm);
	}); 

	it('format', async () => {
		const vm = createComponent(Countdown, {
			targetTime: new Date(),
			format: 'DD天HH小时mm分',
			tag: 'div',
		});
		await wait(2);
		expect(vm.$el.innerHTML).to.equal('00天00小时00分');

		destroyVM(vm);
	});

	it('t', async () => {
		let now = new Date();
		now.setDate(now.getDate() + 1);
		const vm = createComponent(Countdown, {
			targetTime: now,
			tag: 'div',
			t: 3
		});
		await wait(2);
		// 每3s跳一次
		expect(vm.$el.innerHTML).to.equal('天小时分秒');

		destroyVM(vm);
	});
	
	it('targetTime', async () => {
		let now = new Date();
		now.setDate(now.getDate() + 1);

		const vm = createComponent(Countdown, {
			targetTime: now,
			tag: 'div'
		});
		await wait(1);
		// 这个等待时间，由于延迟导致后面的数值会有毫秒级的偏差
		let str = vm.$el.innerHTML;
		str = str.split('分')[0];
		expect(str).to.equal('00天23小时59');

		destroyVM(vm);
	});
	
	it('serverTime', async () => {
		let now = new Date();
		now.setDate(now.getDate() + 2);

		const vm = createComponent(Countdown, {
			targetTime: now,
			serverTime: new Date(),
			tag: 'div'
		});
		await wait(2);
		// 这个等待时间，由于延迟导致后面的数值会有毫秒级的偏差
		let str = vm.$el.innerHTML;
		str = str.split('分')[0];
		expect(str).to.equal('01天23小时59');
		
		destroyVM(vm);
	});
});
