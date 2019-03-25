import Vue from 'vue';
import Popconfirm from '../popconfirm';

describe('Popconfirm', () => {
	test('测试传递属性', () => {
		const component = createComponent(
			Popconfirm
		);
		expect(typeof component).toBe('object');
	});
});