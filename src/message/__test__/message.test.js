import { createVue, createComponent, wait, triggerEvent, createEl, destroyEl, destroyVM } from '@tests/helper';
import Message from '../index';
import MMessage from '../index.m';

describe('Message', () => {
	it('basic', () => {
		expect(!!Message).to.equal(true);
	});
	it('message open', async () => {
		let vm = Message.success({
			content: '测试',
			duration: 2
		});
		const messageEle = vm.$el.querySelector('.vc-message__content'); 
		const messageWrapper = vm.$el.querySelector('.vc-message__wrapper');
		expect(messageEle.textContent).to.equal('测试');
		expect(messageWrapper).to.exist;

		await wait(2.1);
		expect(messageWrapper.style.display).to.equal('none');

		destroyVM(vm);
	});
	it('not close message', async () => {
		let vm = Message.info({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			duration: 0,
			maskClosable: false,
			closable: true
		});
		const messageWrapper = vm.$el.querySelector('.vc-message__wrapper');
		expect(messageWrapper).to.exist;

		await wait(1.5);
		triggerEvent(vm.$el.querySelector('.vc-message__mask'), 'click');
		expect(messageWrapper.style.display).to.not.equal('none');

		destroyVM(vm);
	});
	it('mask 是否开启', async () => {
		let vm = Message.error({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			mask: false,
			duration: 0
		});

		await wait(1.5);
		const messageMask = vm.$el.querySelector('.vc-message__mask');
		expect(messageMask).to.not.exist;

		destroyVM(vm);
	});
	it('多个message', async () => {
		let el = createEl();
		let vm1 = Message.error({
			el,
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			duration: 0
		});
		let vm2 = Message.warning({
			el,
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			duration: 0
		});

		await wait(1.5);
		expect(el.querySelectorAll('.vc-message').length).to.equal(2);
		destroyVM(vm1);
		destroyVM(vm2);
		destroyEl(el);
	});
	it('close message', async () => {
		let vm = Message.loading({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			mask: true,
			duration: 0
		});

		const messageWrapper = vm.$el.querySelector('.vc-message__wrapper');

		await wait(1.5);
		expect(messageWrapper).to.exist;
		expect(messageWrapper.style.display).to.not.equal('none');
		destroyVM(vm);
	});
	it('render 验证', async () => {
		let vm = Message.info({
			content: h => {
				return h('span', [
					'This is created by ',
					h('a', 'render'),
					' function'
				]);
			},
			duration: 0,
			closable: true,
			maskClosable: true
		});
		const messageWrapper = vm.$el.querySelector('.vc-message__wrapper');
		const messageRender = vm.$el.querySelectorAll('a');

		await wait(1.5);
		expect(messageRender.length).to.equal(1);
		expect(vm.$el.querySelector('.vc-icon')).to.exist;
		triggerEvent(vm.$el.querySelectorAll('.vc-icon')[1], 'click');

		await wait(2.1);
		expect(messageWrapper.style.display).to.equal('none');
		destroyVM(vm);
	});
});