import { createVue, createComponent, wait, destroyVM } from '@tests/helper';
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

		destroyVM(vm);
	});

	it('should show toast when click trigger', () => {
		const vm = createComponent(Clipboard, {
			value: 'copy'
		});
		const trigger = vm.$el;
		trigger.click();
		expect(document.querySelector('.vc-message')).to.exist;

		destroyVM(vm);
	});
});