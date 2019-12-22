import { createVue, createComponent, wait, triggerEvent } from '@tests/helper';
import Message from '../index';
import MMessage from '../index.m';

describe('Message', () => {
	afterEach(() => {
		const el = document.querySelector('.vc-message');
		if (!el) return;
		if (el.parentNode) {
		  el.parentNode.removeChild(el);
		}
		if (el.__vue__) {
		  el.__vue__.$destroy();
		}
	});
	
	it('basic', () => {
		expect(!!Message).to.equal(true);
	});
	it('message open', (done) => {
		Message.success({
			content: '测试',
			duration: 2
		});
		const messageEle = document.querySelector('.vc-message__content'); 
		const messageWrapper = document.querySelector('.vc-message__wrapper');
		expect(messageEle.textContent).to.equal('测试');
		expect(messageWrapper).to.exist;
		setTimeout(() => {
			expect(messageWrapper.style.display).to.equal('none');
			done();
		}, 3000);
	});
	it('close message', (done) => {
		Message.loading({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			mask: true,
			closable: true,
			maskClosable: true
		});
		const messageWrapper = document.querySelector('.vc-message__wrapper');
		expect(messageWrapper).to.exist;
		setTimeout(() => {
			expect(messageWrapper.style.display).to.not.equal('none');
			expect(document.querySelector('.vc-icon')).to.exist;
			triggerEvent(document.querySelector('.vc-icon'), 'click');
			setTimeout(() => {
				expect(messageWrapper.style.display).to.equal('none');
				done();
			}, 2000);
			done();
		}, 2000);
	});
	it('not close message', (done) => {
		Message.info({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			duration: 0,
			maskClosable: false,
			closable: true
		});
		const messageWrapper = document.querySelector('.vc-message__wrapper');
		expect(messageWrapper).to.exist;
		setTimeout(() => {
			triggerEvent(document.querySelector('.vc-message__mask'), 'click');
			expect(messageWrapper.style.display).to.not.equal('none');
			done();
		}, 1500);
	});
	it('mask 是否开启', (done) => {
		Message.error({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			mask: false,
			duration: 0
		});
		const messageMask = document.querySelector('.vc-message__mask');
		setTimeout(() => {
			expect(messageMask).to.not.exist;
			done();
		}, 1500);
	});
	it('多个message', (done) => {
		Message.error({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			duration: 0
		});
		Message.warning({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			duration: 0
		});
		const message = document.querySelectorAll('.vc-message');
		setTimeout(() => {
			expect(message.length).to.equal(2);
			done();
		}, 1500);
	});
	it('render 验证', (done) => {
		Message.info({
			content: h => {
				return h('span', [
					'This is created by ',
					h('a', 'render'),
					' function'
				]);
			}
		});
		const messageRender = document.querySelectorAll('a');
		setTimeout(() => {
			expect(messageRender.length).to.equal(1);
			done();
		}, 1500);
	});
});