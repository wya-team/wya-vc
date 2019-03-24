import Vue from 'vue';
import FilesPicker from '../files-picker.vue';



describe('FilesPicker', () => {
	test('测试传递属性', () => {
		const component = createComponent(
			FilesPicker
		);
		expect(typeof component).toBe('object');
	});
});