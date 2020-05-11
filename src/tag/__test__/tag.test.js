import { createVue, createComponent, destroyVM } from '@tests/helper';
import Tag from '../index';

describe('Tag', () => {
	it('basic', () => {
		expect(typeof Tag).to.equal('object');

		const vm = createComponent(Tag, {});
		expect(typeof vm).to.equal('object');

		destroyVM(vm);
	});

	it('closable', () => {
		let count = 0;
		let vm = createVue({
			template: `
				<vc-tag closable @close="handleClose"></vc-tag>
			`,
			components: {
				'vc-tag': Tag
			},
			data() {
				return {

				};
			},
			methods: {
				handleClose() {
					count++;
				}
			}
		});

		vm.$el.querySelector('.vc-tag__close').click();
		expect(count).to.equal(1);

		destroyVM(vm);
	});
	it('checkable true', () => {
		let count = 0;
		let vm = createVue({
			template: `
				<vc-tag checkable ref="target">checkable true</vc-tag>
			`,
			components: {
				'vc-tag': Tag
			},
			data() {
				return {

				};
			},
			methods: {
				handleClose() {
					count++;
				}
			}
		});
		vm = vm.$refs.target;
		expect(vm.isChecked).to.equal(true);
		vm.$el.click();
		expect(vm.isChecked).to.equal(false);
		destroyVM(vm);
	});
	it('checkable false', () => {
		let count = 0;
		let vm = createVue({
			template: `
				<vc-tag :checkable="false" ref="target"></vc-tag>
			`,
			components: {
				"vc-tag": Tag
			},
			data() {
				return {};
			}
		});
		vm = vm.$refs.target;
		expect(vm.isChecked).to.equal(true);
		vm.$el.click();
		expect(vm.isChecked).to.equal(true);

		destroyVM(vm);
	});
});
