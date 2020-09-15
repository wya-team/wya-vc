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
			}, 80);
		}, 0);
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
	
	it('reset timer', done => {
		vm = createVue({
			template: `
				<div>
					<vc-carousel :t="0.02">
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
			const carousel = vm.$children[0];
			const items = vm.$el.querySelectorAll('.vc-carousel-item');
			carousel.handleMouseEnter();
			setTimeout(() => {
				expect(items[0].classList.contains('is-active')).to.true;
				carousel.handleMouseLeave();
				setTimeout(() => {
					expect(items[1].classList.contains('is-active')).to.true;
					done();
				}, 30);
			}, 20);
		}, 10);
	});

	it('change', done => {
		vm = createVue({
			template: `
				<div>
					<vc-carousel :t="0.05" @change="handleChange">
						<vc-carousel-item v-for="item in 3" :key="item">
							{{ item }}
						</vc-carousel-item>
					</vc-carousel>
				</div>
			`,
			components: {
				'vc-carousel': Carousel,
				'vc-carousel-item': Carousel.Item,
			},
			data() {
				return {
					val: -1,
					oldVal: -1
				};
			},
			methods: {
				handleChange(val, oldVal) {
					this.val = val;
					this.oldVal = oldVal;
				}
			}
		});
		setTimeout(() => {
			expect(vm.val).to.equal(1);
			expect(vm.oldVal).to.equal(0);
			done();
		}, 60);
	});

	it('label', done => {
		vm = createVue({
			template: `
			<div>
				<vc-carousel>
					<vc-carousel-item v-for="item in 3" :key="item" :label="item">
						{{ item }}
					</vc-carousel-item>
				</vc-carousel>	
			</div>`,
			components: {
				'vc-carousel': Carousel,
				'vc-carousel-item': Carousel.Item,
			},
		});
		setTimeout(() => {
			expect(vm.$el.querySelector('.vc-carousel__button').innerText).to.equal('1');
			done();
		}, 10);
	});

	describe('manual control', () => {
		it('hover', done => {
			vm = createVue({
				template: `
				<div>
					<vc-carousel :autoplay="false">
						<vc-carousel-item v-for="item in 3" :key="item" :label="item">
							{{ item }}
						</vc-carousel-item>
					</vc-carousel>	
				</div>`,
				components: {
					'vc-carousel': Carousel,
					'vc-carousel-item': Carousel.Item,
				},
			});
			setTimeout(() => {
				vm.$children[0].throttledDotHover(1);
				setTimeout(() => {
					expect(vm.$el.querySelectorAll('.vc-carousel-item')[1].classList.contains('is-active')).to.true;
					done();
				}, 10);
			}, 10);
		});

		it('click', done => {
			vm = createVue({
				template: `
				<div>
					<vc-carousel :autoplay="false" trigger="click" ref="carousel">
						<vc-carousel-item v-for="item in 3" :key="item" :label="item">
							{{ item }}
						</vc-carousel-item>
					</vc-carousel>	
				</div>`,
				components: {
					'vc-carousel': Carousel,
					'vc-carousel-item': Carousel.Item,
				},
			});
			setTimeout(() => {
				const items = vm.$el.querySelectorAll('.vc-carousel-item');
				const carousel = vm.$refs.carousel;
				vm.$el.querySelectorAll('.vc-carousel__dot')[2].click();
				setTimeout(() => {
					expect(items[2].classList.contains('is-active')).to.true;
					carousel.handleButtonEnter('right');
					vm.$el.querySelector('.is-right-arrow').click();
					setTimeout(() => {
						expect(items[0].classList.contains('is-active')).to.true;
						done();
					});
				}, 10);
			}, 10);
		});
	});

	describe('methods', () => {
		it('setActiveItem', done => {
			vm = createVue({
				template: `
				<div>
					<vc-carousel :autoplay="false">
						<vc-carousel-item v-for="item in 3" :key="item" :label="item">
							{{ item }}
						</vc-carousel-item>
					</vc-carousel>	
				</div>`,
				components: {
					'vc-carousel': Carousel,
					'vc-carousel-item': Carousel.Item,
				},
			});
			setTimeout(() => {
				vm.$children[0].setActiveItem(1);
				setTimeout(() => {
					expect(vm.$el.querySelectorAll('.vc-carousel-item')[1].classList.contains('is-active')).to.true;
					done();
				}, 10);
			}, 10);
		});

		it('slide', done => {
			vm = createVue({
				template: `
				<div>
					<vc-carousel :autoplay="false">
						<vc-carousel-item v-for="item in 3" :key="item" :label="item">
							{{ item }}
						</vc-carousel-item>
					</vc-carousel>	
				</div>`,
				components: {
					'vc-carousel': Carousel,
					'vc-carousel-item': Carousel.Item,
				},
			});
			setTimeout(() => {
				vm.$children[0].prev(1);
				const items = vm.$el.querySelectorAll('.vc-carousel-item');
				setTimeout(() => {
					expect(items[2].classList.contains('is-active')).to.true;
					vm.$children[0].next(1);
					setTimeout(() => {
						expect(items[0].classList.contains('is-active')).to.true;
						done();
					}, 10);
				}, 10);
			}, 10);
		});

		it('vertical direction', done => {
			vm = createVue({
				template: `
				<div>
					<vc-carousel ref="carousel" :autoplay="false" vertical height="100px">
						<vc-carousel-item v-for="item in 3" :key="item" :label="item">
							{{ item }}
						</vc-carousel-item>
					</vc-carousel>	
				</div>`,
				components: {
					'vc-carousel': Carousel,
					'vc-carousel-item': Carousel.Item,
				},
			});
			const items = vm.$el.querySelectorAll('.vc-carousel-item');
			expect(vm.$refs.carousel.direction).to.be.equal('vertical');
			expect(items[0].style.transform.indexOf('translateY') !== -1).to.be.true;
		});
	});
});