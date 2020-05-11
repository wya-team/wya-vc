import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
import Editor from '..';

describe('Editor', () => {
	it('basic', async () => {
		expect(!!Editor).to.equal(true);
		const vm = createComponent(Editor, {});
		expect(typeof vm).to.equal('object');

		// Quill 按需加载需要花费一定时间
		await wait(0.2);
		destroyVM(vm);
	});

	it('disabled', async () => {
		const vm = createVue({
			template: `
				<vc-editor
					ref="editor"
					v-model="value"
					:disabled="disabled"
				/>
			`,
			components: {
				'vc-editor': Editor
			},
			data() {
				return {
					disabled: false,
					value: '123'
				};
			}
		});
		// Quill 按需加载需要花费一定时间
		await wait(0.2);
		vm.disabled = true;
		vm.value = '<p>123</p>';
		
		await wait(0.1);
		destroyVM(vm);
	});
});
