import { createVue, destroyVM } from '@tests/helper';
import ImgsPreview from '..';
import MImgsPreview from '../index.m';

describe('ImgsPreview', () => {
	let vm;
	const ANIMATION_TIME = 300;

	afterEach(() => {
		destroyVM(vm);
	});

	it('basic', () => {
		expect(!!ImgsPreview).to.equal(true);
		expect(!!MImgsPreview).to.equal(true);
	});

	it('should work', () => {
		vm = createVue({
			template: `<vc-imgs-preview :data-source="dataSource" />`,
			components: {
				'vc-imgs-preview': ImgsPreview
			},
			data() {
				return {
					dataSource: [
						{
							src: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
							title: 'Image 1',
							w: 1200,
							h: 900
						},
						{
							src: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg',
							title: 'Image 2',
							w: 1200,
							h: 900
						}
					],
				};
			},
		});
		expect(vm.$el).to.exist;
	});


	it('should show big img when click', (done) => {
		const vm = createVue({
			template: `<vc-imgs-preview :data-source="dataSource" :getInstance="getInstance" />`,
			components: {
				'vc-imgs-preview': ImgsPreview
			},
			data() {
				return {
					dataSource: [
						'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
						'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg'
					],
					photoSwipe: null
				};
			},
			methods: {
				getInstance(instance) {
					this.photoSwipe = instance;
				}
			}
		});

		const trigger = vm.$el.querySelector('.vc-icon');
		trigger.click();

		setTimeout(() => {
			const pswp = document.querySelector('.pswp');
			expect(pswp).to.exist;

			const preItem = document.querySelector('.pswp__item');
			const preStyle = preItem.style;
			const preBtn = document.querySelector('.pswp__button--arrow--left');
			preBtn.click();
			const Item = document.querySelector('.pswp__item');
			const style = Item.style;
			expect(preStyle).not.equal('style');
			expect(vm.photoSwipe).to.exist;

			done();
			destroyVM(vm);
		}, ANIMATION_TIME);
	});

	it('should show pre img when click', (done) => {
		const vm = createVue({
			template: `<vc-imgs-preview :data-source="dataSource" />`,
			components: {
				'vc-imgs-preview': ImgsPreview
			},
			data() {
				return {
					dataSource: [
						'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
						'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg'
					],
				};
			},
		});

		const trigger = vm.$el.querySelector('.vc-icon');
		trigger.click();

		setTimeout(() => {
			const currentItem = document.querySelector('.pswp__item');
			const currentStyle = currentItem.style.display;
			setTimeout(() => {
				const prevBtn = document.querySelector('.pswp__button--arrow--left');
				prevBtn.click();
				setTimeout(() => {
					const prevItem = document.querySelector('.pswp__item');
					const prevStyle = prevItem.style.display;
					expect(currentStyle).not.equal(prevStyle);
	
					done();
					destroyVM(vm);
				}, ANIMATION_TIME);
			}, ANIMATION_TIME);
			
		}, ANIMATION_TIME);
	});

	it('should show next img when click', (done) => {
		const vm = createVue({
			template: `<vc-imgs-preview :data-source="dataSource" />`,
			components: {
				'vc-imgs-preview': ImgsPreview
			},
			data() {
				return {
					dataSource: [
						'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
						'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg'
					],
				};
			},
		});

		const trigger = vm.$el.querySelector('.vc-icon');
		trigger.click();

		setTimeout(() => {
			const currentItem = document.querySelector('.pswp__item');
			const currentStyle = currentItem.style.display;
			setTimeout(() => {
				const nextBtn = document.querySelector('.pswp__button--arrow--right');
				nextBtn.click();
				setTimeout(() => {
	
					const nextItem = document.querySelector('.pswp__item');
					const nextStyle = nextItem.style.display;
					expect(currentStyle).not.equal(nextStyle);
	
					done();
					destroyVM(vm);
				}, ANIMATION_TIME);
			}, ANIMATION_TIME);
			
		}, ANIMATION_TIME);
	});

	it('should show rotate img when click', (done) => {
		const vm = createVue({
			template: `<vc-imgs-preview ref="preview" :data-source="dataSource" />`,
			components: {
				'vc-imgs-preview': ImgsPreview
			},
			data() {
				return {
					dataSource: [{
						src: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
					}, {
						src: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg'
					}],
				};
			},
		});

		const trigger = vm.$el.querySelector('.vc-icon');
		trigger.click();

		setTimeout(() => {
			const currentItem = document.querySelector('.pswp__item .pswp__img');
			const currentStyle = currentItem.style.transform;
			setTimeout(() => {
				const rotateBtn = document.querySelector('.vc-imgs-preview-core__button');
				rotateBtn.click();
				setTimeout(() => {
					const nextItem = document.querySelector('.pswp__item .pswp__img');
					const nextStyle = nextItem.style.transform;
					expect(currentStyle).not.equal(nextStyle);
					done();
					destroyVM(vm);
				}, ANIMATION_TIME);
			}, ANIMATION_TIME);
			
		}, ANIMATION_TIME);
	});

	it('should destroy photoSwipe when component destroy', (done) => {
		const vm = createVue({
			template: `<vc-imgs-preview ref="preview" :data-source="dataSource" />`,
			components: {
				'vc-imgs-preview': ImgsPreview
			},
			data() {
				return {
					dataSource: [
						'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
						'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg'
					],
				};
			},
		});

		const trigger = vm.$el.querySelector('.vc-icon');
		trigger.click();

		setTimeout(() => {
			const closeTrigger = document.querySelector('.pswp__bg');
			closeTrigger.click();
			setTimeout(() => {
				expect(vm.$refs.preview.photoSwipe).to.not.exist;
				destroyVM(vm);
				done();
			}, ANIMATION_TIME);
		}, ANIMATION_TIME);
	});
});