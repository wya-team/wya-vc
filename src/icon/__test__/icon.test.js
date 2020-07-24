import { createVue, createComponent, destroyVM } from '@tests/helper';
import { expect } from 'chai';
import Icon from '..';

describe('Icon', () => {
	let vm;
	const ANIMATION_TIME = 300; 

	it('basic', () => {
		expect(!!Icon).to.equal(true);
	});

	it('show icon', (done) => {
		vm = createComponent(Icon, {
			type: 'success'
		});
		setTimeout(() => {
			expect(vm.path.length > 0).to.be.true;
			destroyVM(vm);
			done();
		}, ANIMATION_TIME);
	});

	it('click icon', (done) => {
		let result;
		vm = createVue({
			template: `<vc-icon type="success" @click="handleClick" />`,
			components: {
				'vc-icon': Icon
			},
			methods: {
				handleClick(e) {
					result = e;
				}
			}
		});
		const trigger = document.querySelector('.vc-icon');
		trigger.click();
		setTimeout(_ => {
			expect(result).to.exist;
			done();
		}, ANIMATION_TIME);
	});

	it('not exist icon', (done) => {
		vm = createVue({
			template: `<vc-icon type="not-find-icon"/>`,
			components: {
				'vc-icon': Icon
			}
		});
		setTimeout(_ => {
			expect(vm.path === undefined).to.be.true;
			done();
		}, ANIMATION_TIME);
	});
});