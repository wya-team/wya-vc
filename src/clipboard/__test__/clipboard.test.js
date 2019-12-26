import { createVue, createComponent, wait } from '@tests/helper';
import Clipboard from '..';

describe('Clipboard', () => {
	it('basic', () => {
		expect(!!Clipboard).to.equal(true);
	});

	it('tag is div', () => {
		const vm = createComponent(Clipboard, {
			tag: 'span',
		});
		expect(vm.$el.tagName).to.equal('SPAN');
	});

	it('should show toast when click trigger', async () => {
		const vm = createComponent(Clipboard, {
			value: 'copy'
		});
		const trigger = vm.$el;
		trigger.click();
		await wait(1);
		expect(document.querySelector('.vc-message')).to.exist;
		await wait(1);
	});
});