import Vue from 'vue';
import Tpl from '../paging.vue';



describe('Tpl', () => {
	test('测试传递属性', () => {
		const component = createComponent(Wrapper, {});
		expect(typeof component).toBe('object');
	});
});