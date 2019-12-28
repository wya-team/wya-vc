import { createVue, createComponent, destroyVM } from '@tests/helper';
import Progress from '../index';
import MProgress from '../index.m';

describe('Progress', () => {
	let vm;
	afterEach(() => {
		vm && destroyVM(vm);
	});
	it('basic', () => {
		expect(!!Progress).to.equal(true);
		expect(!!MProgress).to.equal(true);
	});
	it('type 为line的进度条', (done) => {
		vm = createVue({
			template: `
				<div>
					<vc-progress
						ref="error"
						:percent="50"
						status="error"
						:strokeWidth="7"
					/>
					<vc-progress
						ref="success"
						:percent="100"
						:strokeWidth="7"
					/>
				</div>
			`,
			components: {
				'vc-progress': Progress
			}
		});
		expect(vm.$refs.error.$el.querySelector('.vc-progress__line')).to.exist;
		expect(vm.$refs.error.$el.querySelector('.vc-progress__percent')).to.exist;
		setTimeout(() => {
			expect(vm.$refs.error.$el.querySelector('.vc-progress__inner').style.height).to.equal('7px');
			expect(vm.$refs.error.$el.querySelector('.vc-progress__inner').style.width).to.equal('50%');
			expect(vm.$refs.error.$el.querySelector('.vc-progress__icon').style.color).to.equal('rgb(245, 34, 45)');
			expect(vm.$refs.success.$el.querySelector('.vc-progress__inner').style.width).to.equal('100%');
			expect(vm.$refs.success.$el.querySelector('.vc-progress__icon').style.color).to.equal('rgb(82, 196, 26)');
			done();
		}, 1000);
	});
	it('type为circle的进度条', (done) => {
		vm = createVue({
			template: `
				<div>
					<vc-progress
						type="circle"
						ref="error"
						percent="50"
						:size="100"
						status="error"
						:strokeWidth="7"
						
					/>
				</div>
			`,
			components: {
				'vc-progress': Progress
			}
		});
		expect(vm.$refs.error.$el.querySelector('.vc-progress__circle')).to.exist;
		setTimeout(() => {
			expect(vm.$refs.error.$el.querySelector('.vc-progress__box').style.width).to.equal('100px');
			done();
		}, 1000);
	});
});