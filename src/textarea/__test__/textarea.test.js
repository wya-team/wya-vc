import { createVue, destroyVM, triggerEvent, wait } from '@tests/helper';
import Textarea from '../index';
import MTextarea from '../index.m';

describe('Textarea', () => {
	let vm;
	afterEach(() => {
		vm && destroyVM(vm);
	});
	it('basic', () => {
		expect(!!Textarea).to.equal(true);
	});
	it('create textarea', () => {
		vm = createVue({
			template: `
				<vc-textarea
					ref="textarea"
					value="我这里几个字"
					placeholder="测试"
					:maxlength="10"
					indicator
				/>
			`,
			components: {
				'vc-textarea': Textarea
			}
		});
		expect(document.querySelector('.vc-textarea')).to.exist;
		expect(document.querySelector('.vc-textarea__indicator')).to.exist;
		expect(vm.$refs.textarea.indicatorNum).to.equal('6/10');
	});
	it('bytes 两个字母算一个字节,indicator为true，还能输入多少字节的内容', () => {
		vm = createVue({
			template: `
				<vc-textarea
					ref="textarea"
					value="Tony老师，我这里应该有字"
					placeholder="测试"
					:maxlength="100"
					:indicator="{inverted: true}"
					bytes
				/>
			`,
			components: {
				'vc-textarea': Textarea
			}
		});
		expect(document.querySelector('.vc-textarea')).to.exist;
		expect(document.querySelector('.vc-textarea__indicator')).to.exist;
		expect(vm.$refs.textarea.indicatorNum).to.equal('88/100');
	});
	it('textarea focus 和 blur', async () => {
		vm = createVue({
			template: `
				<vc-textarea
					ref="textarea"
					value="Tony老师，我这里应该有字"
				/>
			`,
			components: {
				'vc-textarea': Textarea
			}
		});
		const spyFocus = sinon.spy();
		const spyBlur = sinon.spy();
		vm.$refs.textarea.$on('focus', spyFocus);
		vm.$refs.textarea.focus();
		await wait(0);
		expect(spyFocus.calledOnce).to.be.true;
		vm.$refs.textarea.$on('blur', spyBlur);
		vm.$refs.textarea.blur();
		await wait(0);
		expect(spyBlur.calledOnce).to.be.true;
	});
	// it('textarea change', async () => {
	// 	vm = createVue({
	// 		template: `
	// 			<vc-textarea
	// 				ref="textarea"
	// 				:value="value"
	// 			/>
	// 		`,
	// 		components: {
	// 			'vc-textarea': Textarea
	// 		},
	// 		data() {
	// 			return {
	// 				value: 'Tony'
	// 			};
	// 		}
	// 	});
	// 	const spy = sinon.spy();
	// 	const nativeInput = vm.$refs.textarea.$el.querySelector('textarea');
	// 	const simulateEvent = (text, event) => {
	// 		nativeInput.value = text;
	// 		nativeInput.dispatchEvent(new Event(event));
	// 	};
	
	// 	vm.$refs.textarea.$on('change', spy);
	// 	simulateEvent('1', 'input');
	// 	simulateEvent('2', 'change');
	// 	await wait(0);
	// 	expect(spy.calledWith('2')).to.be.true;
	// 	expect(spy.calledOnce).to.be.true;
	// });
	it('textarea input', async () => {
		vm = createVue({
			template: `
				<vc-textarea
					ref="textareaInput"
					:value="value"
				/>
			`,
			components: {
				'vc-textarea': Textarea
			},
			data() {
				return {
					value: 'a'
				};
			}
		});
		const spy = sinon.spy();
		vm.$refs.textareaInput.$on('input', spy);
		const nativeInput = vm.$refs.textareaInput.$el.querySelector('textarea');
		nativeInput.value = '1';
		triggerEvent(nativeInput, 'compositionstart');
		triggerEvent(nativeInput, 'input');
		await wait(0);
		nativeInput.value = '2';
		triggerEvent(nativeInput, 'compositionupdate');
		triggerEvent(nativeInput, 'input');
		await wait(0);
		triggerEvent(nativeInput, 'compositionend');
		await wait(0);
		expect(spy.calledOnce).to.be.true;
		expect(vm.value).to.equal('a');
		expect(nativeInput.value).to.equal('2');
	});
});