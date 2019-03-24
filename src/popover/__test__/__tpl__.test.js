import Vue from 'vue';
import Popover from '../popover.vue';



describe('Popover', () => {
	test('测试传递属性', () => {
		const component = createComponent(
			Popover
		);
		expect(typeof component).toBe('object');
	});
});