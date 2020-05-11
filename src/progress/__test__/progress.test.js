import { createVue, createComponent, destroyVM, wait } from '@tests/helper';
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
	it('type 为line的进度条', async () => {
		let vm = createVue({
			template: `
				<div>
					<vc-progress
						ref="errorLine"
						:percent="50"
						status="error"
						:stroke-width="7"
					/>
					<vc-progress
						ref="successLine"
						:percent="100"
						:stroke-width="7"
					/>
				</div>
			`,
			components: {
				'vc-progress': Progress
			}
		});
		expect(vm.$refs.errorLine.$el.querySelector('.vc-progress__line')).to.exist;
		expect(vm.$refs.errorLine.$el.querySelector('.vc-progress__percent')).to.exist;
		await wait(1);
		expect(vm.$refs.errorLine.$el.querySelector('.vc-progress__inner').style.height).to.equal('7px');
		expect(vm.$refs.errorLine.$el.querySelector('.vc-progress__inner').style.width).to.equal('50%');
		expect(vm.$refs.errorLine.$el.querySelector('.vc-progress__icon').style.color).to.equal('rgb(245, 34, 45)');
		expect(vm.$refs.successLine.$el.querySelector('.vc-progress__inner').style.width).to.equal('100%');
		expect(vm.$refs.successLine.$el.querySelector('.vc-progress__icon').style.color).to.equal('rgb(82, 196, 26)');
		destroyVM(vm);
	});
	it('type为circle的进度条', async () => {
		let vm = createVue({
			template: `
					<vc-progress
						type="circle"
						ref="errorCircle"
						percent="50"
						:size="100"
						status="error"
						:stroke-width="7"
						
					/>
			`,
			components: {
				'vc-progress': Progress
			}
		});
		expect(vm.$el.querySelector('.vc-progress__circle')).to.exist;

		await wait(1);
		expect(vm.$el.querySelector('.vc-progress__box').style.width).to.equal('100px');
		destroyVM(vm);
	});
});