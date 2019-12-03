import Vue from 'vue';
import Button from '../index';
import MButton from '../index.m';

describe('Button', () => {

	// 基础设置
	test('basic', () => {
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

	test('icon', () => {
		const vm = createComponent(Button, {
			icon: 'm-search'
		});
		
		expect(!!vm.$el.querySelector('.vc-icon')).toBe(true);
		expect(vm.icon).toBe('m-search');
	});

	test('loading', () => {
		const vm = createVue({
			template: `
				<div @click="handleClick"></div>
			`,
			components: {
				'vc-button': Button
			},
			methods: {
				handleClick() {
					console.log(2);
				}
			}
		});
	});
});