import Vue from 'vue';
import Editor from '../editor.vue';



describe('Editor', () => {
	test('测试传递属性', () => {
		const component = createComponent(
			Editor
		);
		expect(typeof component).toBe('object');
	});
});