import Vue from 'vue';
import Icon from '../icon.vue';



describe('Icon', () => {
	test('测试传递属性', () => {
		const component = createComponent(
			Icon
		);
		expect(typeof component).toBe('object');
	});
});