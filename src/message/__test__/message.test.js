import { createVue, createComponent, wait, triggerEvent } from '@tests/helper';
import Message from '../index';
import MMessage from '../index.m';

describe('Message', () => {
	it('basic', () => {
		expect(!!Message).to.equal(true);
	});
	it('message open', (done) => {
		let vm = Message.success({
			content: '测试',
			duration: 2
		});
		const messageEle = vm.$el.querySelector('.vc-message__content'); 
		const messageWrapper = document.querySelector('.vc-message__wrapper');
		expect(messageEle.textContent).to.equal('测试');
		expect(messageWrapper).to.exist;
		setTimeout(() => {
			expect(messageWrapper.style.display).to.equal('none');
			Message.destroy();
			done();
		}, 3000);
	});
	it('not close message', (done) => {
		let vm = Message.info({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			duration: 0,
			maskClosable: false,
			closable: true
		});
		const messageWrapper = vm.$el.querySelector('.vc-message__wrapper');
		expect(messageWrapper).to.exist;
		setTimeout(() => {
			triggerEvent(vm.$el.querySelector('.vc-message__mask'), 'click');
			expect(messageWrapper.style.display).to.not.equal('none');
			Message.destroy();
			done();
		}, 1500);
	});
	it('mask 是否开启', (done) => {
		let vm = Message.error({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			mask: false,
			duration: 0
		});
		const messageMask = vm.$el.querySelector('.vc-message__mask');
		setTimeout(() => {
			expect(messageMask).to.not.exist;
			Message.destroy();
			done();
		}, 1500);
	});
	it('多个message', (done) => {
		let vm1 = Message.error({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			duration: 0
		});
		let vm2 = Message.warning({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			duration: 0
		});
		const messageVm1 = vm1.querySelectorAll('.vc-message').length;
		const messageVm2 = vm2.querySelectorAll('.vc-message').length;
		setTimeout(() => {
			expect(messageVm1 + messageVm2).to.equal(2);
			Message.destroy();
			done();
		}, 1500);
	});
	it('close message', (done) => {
		let vm = Message.loading({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			mask: true,
			duration: 0
		});
		setTimeout(() => {
			const messageWrapper = vm.$el.querySelector('.vc-message__wrapper');
			expect(messageWrapper).to.exist;
			expect(messageWrapper.style.display).to.not.equal('none');
			Message.destroy();
			done();
		}, 1500);
	});
	it('render 验证', (done) => {
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
		setTimeout(() => {
			expect(messageRender.length).to.equal(1);
			expect(vm.$el.querySelector('.vc-icon')).to.exist;
			triggerEvent(vm.$el.querySelectorAll('.vc-icon')[1], 'click');
			setTimeout(() => {
				expect(messageWrapper.style.display).to.equal('none');
				Message.destroy();
				done();
			}, 2000);
		}, 1500);
	});
});