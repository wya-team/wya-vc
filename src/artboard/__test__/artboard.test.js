import { createVue, createComponent } from '@tests/helper';
import Artboard from '..';

describe('Artboard', () => {
	it('basic', () => {
		expect(typeof Artboard).to.equal('object');

		const vm = createComponent(Artboard, {});
		expect(typeof vm).to.equal('object');
	});

	it('width', async () => {
		const vm = createVue({
			template: `
				<vc-artboard ref="target" :width="100" />
			`,
			components: {
				'vc-artboard': Artboard
			},
			methods: {
			}
		});
		expect(vm.$el.getElementsByTagName('canvas')[0].offsetWidth).to.equal(100);
		await wait(30000);
	});

	it('height', () => {
		const vm = createComponent(Artboard, {
			height: 100
		});
		expect(vm.$el.getElementsByTagName('canvas')[0].offsetHeight).to.equal(100);
	});

	it('getInstance', () => {
		const vm = createVue({
			template: `
				<vc-artboard :getInstance="getInstance" ref="artboard" />
			`,
			components: {
				'vc-artboard': Artboard
			},
			data() {
				return {
					instance: null
				};
			},
			methods: {
				getInstance(instance) {
					this.instance = instance;
				}
			}
		});
		expect(vm.instance).to.equal(vm.$refs.artboard);
	});
});
