import { createVue, createComponent, wait, destroyVM } from '@tests/helper';
import Clipboard from '..';
import MClipboard from '../index.m';

describe('Clipboard', () => {
	it('basic', () => {
		expect(!!Clipboard).to.equal(true);
	});

	it('mobile basic', () => {
		expect(!!MClipboard).to.equal(true);
	});

	it('tag is div', () => {
		const vm = createComponent(Clipboard, {
			tag: 'span',
		});
		expect(vm.$el.tagName).to.equal('SPAN');

		destroyVM(vm);
	});

	it('should call before after when click', async () => {
		const vm = createVue({
			template: `
				<vc-clipboard 
					:value="msg" 
					tag="span"
					@before="handleBefore"
					@after="handleAfter"
				>
					复制
				</vc-clipboard>
			`,
			components: {
				'vc-clipboard': Clipboard
			},
			data() {
				return {
					beforeValue: false,
					afterValue: false,
					msg: '复制'
				};
			},
			methods: {
				handleAfter() {
					this.afterValue = true;
				},
				handleBefore() {
					this.beforeValue = true;
				}
			}
		});
		
		const trigger = vm.$el;
		trigger.click();
		await wait(0);
		expect(vm.beforeValue).to.be.true;
		expect(vm.afterValue).to.be.true;

		destroyVM(vm);
	});

	it('should emit error when throw error', async () => {
		const vm = createVue({
			template: `
				<vc-clipboard 
					:value="msg" 
					tag="span"
					@before="handleBefore"
					@error="handleError"
				>
					复制
				</vc-clipboard>
			`,
			components: {
				'vc-clipboard': Clipboard
			},
			data() {
				return {
					beforeValue: false,
					errorValue: false,
					msg: '复制'
				};
			},
			methods: {
				handleBefore() {
					return Promise.reject();
				},
				handleError() {
					this.errorValue = true;
				}
			}
		});
		
		const trigger = vm.$el;
		trigger.click();
		await wait(0);
		expect(vm.errorValue).to.be.true;

		destroyVM(vm);
	});

	it('should show message when click trigger', () => {
		const vm = createComponent(Clipboard, {
			value: 'copy'
		});
		const trigger = vm.$el;
		trigger.click();
		expect(document.querySelector('.vc-message')).to.exist;

		destroyVM(vm);
	});   

	it('should show toast when click trigger', () => {
		const vm = createComponent(MClipboard, {
			value: 'copy'
		});
		const trigger = vm.$el;
		trigger.click();
		expect(document.querySelector('.vcm-toast')).to.exist;

		destroyVM(vm);
	});

	
});