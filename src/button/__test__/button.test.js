import Vue from 'vue';
import Button from '../index';
import MButton from '../index.m';

describe('Button', () => {
	// 基础设置
	it('basic', () => {
		expect(typeof Button).to.equal('object');

		const vm = createComponent(Button, {});
		expect(typeof vm).to.equal('object');
	});

	it('create', () => {
		const vm = createComponent(Button, {
			type: 'primary'
		});
		expect(vm.$el.classList.contains('vc-btn')).to.equal(true);
		expect(vm.$el.classList.contains('is-primary')).to.equal(true);
	});

	it('icon', () => {
		const vm = createComponent(Button, {
			icon: 'm-search'
		});
		
		expect(!!vm.$el.querySelector('.vc-icon')).to.equal(true);
		expect(vm.icon).to.equal('m-search');
	});

	it('loading', done => {
		const vm = createVue({
			template: `
				<vc-button @click="handleClick">测试</vc-button>
			`,
			components: {
				'vc-button': Button
			},
			methods: {
				handleClick() {
					return new Promise((resolve) => {
						setTimeout(resolve, 2000);
					});
				}
			}
		});

		vm.$el.click();

		setTimeout(done, 2000);
	});
});