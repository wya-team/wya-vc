import { createVue, createComponent, wait } from '@tests/helper';
import Artboard from '../index';

describe('Artboard', () => {
	it('basic', () => {
		expect(typeof Artboard).to.equal('object');

		const vm = createComponent(Artboard, {});
		expect(typeof vm).to.equal('object');
	});

	it('width', async () => {
		const vm = createComponent(Artboard, {
			width: 100
		});

		await wait(1);
		expect(vm.$el.querySelector('canvas').style.width).to.equal('100px');

	});

	it('height', async () => {
		const vm = createVue({
			template: `
				<vc-artboard :height="100" />
			`,
			components: {
				'vc-artboard': Artboard
			},
			methods: {
				
			}
		});
		await wait(1);
		expect(vm.$el.querySelector('canvas').style.height).to.equal('100px');
	});

	// it('getInstance', () => {
	// 	const vm = createVue({
	// 		template: `
	// 			<vc-artboard :getInstance="getInstance" ref="artboard" />
	// 		`,
	// 		components: {
	// 			'vc-artboard': Artboard
	// 		},
	// 		data() {
	// 			return {
	// 				instance: null
	// 			};
	// 		},
	// 		methods: {
	// 			getInstance(instance) {
	// 				this.instance = instance;
	// 			}
	// 		}
	// 	});
	// });
});
