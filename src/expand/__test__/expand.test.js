import { createVue, destroyVM } from '@tests/helper';
import Expand from '../index';

describe('Expand', () => {
	let vm;

	afterEach(() => {
		vm && destroyVM(vm);
	});

	it('basic', () => {
		expect(!!Expand).to.equal(true);
	});

	it('toggle', done => {
		vm = createVue({
			template: `
				<vc-expand 
					ref="expand"
					v-model="isExpand"
				>
					<div>这是个有内容的</div>
				</vc-expand>
			`,
			components: {
				'vc-expand': Expand
			},
			data() {
				return {
					isExpand: false
				};
			}
		});
		const expandRef = vm.$refs.expand;
		expect(expandRef.isActive).to.be.false;
		expect(expandRef.$el.style.display).to.equal('none');

		vm.isExpand = true;
		vm.$nextTick(() => {
			expect(expandRef.isActive).to.be.true;
			expect(expandRef.$el.style.display).to.not.equal('none');
			done();
		});
	});
});