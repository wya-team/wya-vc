import Vue from 'vue';
import Cascader from '../cascader.vue';



describe('Cascader', () => {
	test('测试传递属性', () => {
		const component = createComponent(Wrapper, {});
		expect(typeof component).toBe('object');
	});
});