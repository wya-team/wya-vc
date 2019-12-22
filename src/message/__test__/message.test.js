import { createVue, createComponent, wait, triggerEvent } from '@tests/helper';
import Message from '../index';
import MMessage from '../index.m';

describe('Message', () => {
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
	it('close message', () => {
		Message.loading({
			content: '啦啦啦，啦啦啦，我是买包的小行家',
			closable: true
		});
		triggerEvent(document.querySelector(''));
	});
});