import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
import Marquee from '..';
import MMarquee from '../index.m';

describe('Marquee', () => {
	it('basic', () => {
		expect(typeof Marquee).to.equal('object');
		expect(typeof MMarquee).to.equal('object');

		const vm = createComponent(Marquee, {});
		expect(typeof vm).to.equal('object');

		destroyVM(vm);
	});

	it('paused', () => {
		let vm = createComponent(Marquee, {
			animated: false
		});
		expect(vm.paused).to.be.equal(true);

		destroyVM(vm);
	});

	it('fresh', () => {
		let vm = createVue({
			template: `
				<div style="width: 50px;">
					<vc-marquee
						ref="marqueen"
						:autoplay="true"
						content="测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"
					/>
				</div>
			`,
			components: {
				'vc-marquee': Marquee
			},
		});
		let ma = vm.$refs.marqueen;
		ma.refresh();
		expect(ma.duration > 0).to.be.equal(true);
		vm = createVue({
			template: `
				<div style="width: 50px;">
					<vc-marquee
						ref="marqueen"
						content="测试"
					/>
				</div>
			`,
			components: {
				'vc-marquee': Marquee
			},
		});
		ma = vm.$refs.marqueen;
		ma.refresh();
		expect(ma.duration > 0).to.be.equal(false);

		destroyVM(vm);
	});
});
