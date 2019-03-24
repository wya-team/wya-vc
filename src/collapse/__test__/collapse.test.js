import Vue from 'vue';
import Collapse from '../collapse.vue';



describe('Collapse', () => {
	test('测试传递属性', () => {
		const component = createComponent(
			Collapse
		);
		expect(typeof component).toBe('object');
	});
});