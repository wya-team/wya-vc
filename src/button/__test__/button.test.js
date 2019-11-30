import Vue from 'vue';
import Button from '../index';
import MButton from '../index.m';

describe('Button', () => {
	test('基本测试', () => {
		expect(typeof Button).toBe('object');

		const vm = createComponent(Button, {});
		expect(typeof vm).toBe('object');
	});

	test('create', () => {
		const vm = createComponent(Button, {
			type: 'primary'
		});
		
		expect(vm.$el.classList.contains('vc-btn')).toBe(true);
		expect(vm.$el.classList.contains('is-primary')).toBe(true);
	});
});