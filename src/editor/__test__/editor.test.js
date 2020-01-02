import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
import Editor from '..';

describe('Editor', () => {
	it('basic', () => {
		expect(!!Editor).to.equal(true);
		const vm = createComponent(Editor, {});
		expect(typeof vm).to.equal('object');
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
		let editor = vm.$refs.editor;
		await wait(3);
		editor.disabled = true;
		editor.value = '<p>123</p>';
		await wait(0.1);
	});
});
