import { createVue, destroyVM } from '@tests/helper';
import Trigger from '@tests/trigger';
import Popup from '..';

describe('Popup', () => {
	let vm;

	afterEach(() => {
		destroyVM(vm);
	});

	it('basic', () => {
		expect(!!Popup).to.equal(true);
	});
	
	it('create', (done) => {
		vm = createVue({
			template: `
				<vc-popup 
					v-model="visible" 
					maskClosable
					@visible-change="handleVisibleChange"
				>
				</vc-popup>
			`,
			components: {
				'vc-popup': Popup
			},
			data() {
				return {
					visible: true
				};
			},
			methods: {
				handleVisibleChange(v) {
					this.visible = v;
				}
			}
		});

		const maskEl = document.querySelector('.vcm-popup__mask');
		maskEl.click();
		setTimeout(() => {
			expect(vm.visible).to.be.false;
			done();
		}, 1000);
	});

	it('placement', () => {
		vm = createVue({
			template: `
				<vc-popup 
					v-model="visible" 
					placement="bottom"
				>
				</vc-popup>
			`,
			components: {
				'vc-popup': Popup
			},
			data() {
				return {
					visible: true
				};
			}
		});

		expect(vm.$el.className.includes('is-bottom'));
	});

	it('touch scroll', (done) => {
		vm = createVue({
			template: `
				<vc-popup 
					v-model="visible" 
				>
					<div ref="scrollEl" class="vc-hack-scroll" style="height: 200px; overflow: auto;">
						<div ref="inner" style="height: 300px"></div>
					</div>
				</vc-popup>
			`,
			components: {
				'vc-popup': Popup
			},
			data() {
				return {
					visible: true
				};
			}
		});
		const maskEl = document.querySelector('.vcm-popup__mask');
		Trigger(maskEl).touchmove([10, 60], [10, 10]);

		setTimeout(() => {
			const rect = vm.$refs.scrollEl.getBoundingClientRect();
			Trigger(vm.$refs.inner).touchmove([10, rect.top + 300], [10, rect.top + 0]);
			done();
		}, 1000);
	});
});