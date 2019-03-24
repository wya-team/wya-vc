import Vue from 'vue';
import Copy from '..';



describe('Copy', () => {
	test('测试传递属性', () => {
		const component = createComponent(
			Copy, 
			{
				value: 'Hello'
			}
		);
		expect(component.value).toBe('Hello');
	});
});