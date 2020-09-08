import { createVue, destroyVM } from '@tests/helper';
import { expect } from 'chai';
import Carousel from '../index';

describe('Carousel', () => {
	let vm;
	afterEach(() => {
		destroyVM(vm);
	});

	it('basic', () => {
		expect(!!Carousel).to.equal(true);
	});

	it('create', () => {
		vm = createVue({
			template: `
				<div>
					<vc-carousel ref="carousel">
						<vc-carousel-item v-for="item in 3" :key="item">
							{{ item }}
						</vc-carousel-item>
					</vc-carousel>
				</div>
			`,
			components: {
				'vc-carousel': Carousel,
				'vc-carousel-item': Carousel.Item,
			}
		});
		expect(vm.$refs.carousel.vertical).to.false;
		expect(vm.$el.querySelectorAll('.vc-carousel-item').length).to.equal(3);
	});

	it('auto play', done => {
		vm = createVue({
			template: `
				<div>
					<vc-carousel :t="0.05">
						<vc-carousel-item v-for="item in 3" :key="item">
							{{ item }}
						</vc-carousel-item>
					</vc-carousel>
				</div>
			`,
			components: {
				'vc-carousel': Carousel,
				'vc-carousel-item': Carousel.Item,
			}
		});
		setTimeout(() => {
			const items = vm.$el.querySelectorAll('.vc-carousel-item');
			expect(items[0].classList.contains('is-active')).to.true;
			setTimeout(() => {
				expect(items[1].classList.contains('is-active')).to.true;
				done();
			}, 60);
		}, 10);
	});

	it('initial index', done => {
		vm = createVue({
			template: `
				<div>
					<vc-carousel :autoplay="false" :initial-index="1">
						<vc-carousel-item v-for="item in 3" :key="item">
							{{ item }}
						</vc-carousel-item>
					</vc-carousel>
				</div>
			`,
			components: {
				'vc-carousel': Carousel,
				'vc-carousel-item': Carousel.Item,
			}
		});
		setTimeout(() => {
			const items = vm.$el.querySelectorAll('.vc-carousel-item');
			expect(items[1].classList.contains('is-active')).to.true;
			done();
		}, 10);
	});
	
});