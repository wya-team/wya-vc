import { createVue, createComponent, destroyVM } from '@tests/helper';
import ImgsCrop from '..';
import MImgsCrop from '../index.m';

describe('ImgsCrop', () => {
	let vm;


	it('basic', () => {
		expect(!!ImgsCrop).to.equal(true);
		expect(!!MImgsCrop).to.equal(true);
	});

	it('should work', () => {
		vm = createComponent(ImgsCrop, {
			src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
		});
		expect(vm.$el).to.exist;
		destroyVM(vm);
	});

	it('style', () => {
		const vm = createVue({
			template: `<vc-imgs-crop 
				ref="target"
				:src="src" 
				:scale="scale" 
				:rotate="rotate" 
				:width="375"
				:height="230"
				:border="0"
				class="canvas"
			/>`,
			components: {
				'vc-imgs-crop': ImgsCrop
			},
			data() {
				return {
					src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
					scale: 1,
					rotate: 0,
				};
			},
		});
		
		expect(document.querySelector('.canvas').style.width).to.equal('375px');
		expect(document.querySelector('.canvas').style.height).to.equal('230px');

		destroyVM(vm);
	});

	it('crop img', done => {
		const vm = createVue({
			template: `<vc-imgs-crop 
				ref="target"
				:src="src" 
				:scale="scale" 
				:rotate="rotate" 
				:width="375"
				:height="230"
				cross-origin="anonymous"
				@drop-file="handleFn"
				@load-failure="handleFn"
				@load-success="handleFn"
				@image-ready="handleFn"
				@image-change="handleFn"
				@position-change="handleFn"
			/>`,
			components: {
				'vc-imgs-crop': ImgsCrop
			},
			data() {
				return {
					src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
					scale: 1,
					rotate: 0,
					result: null,
					canvas: null,
					rect: null,
				};
			},
			methods: {
				async getImage() {
					const { base64Image } = await this.$refs.target.getImage();
					this.result = base64Image;
					this.canvas = this.$refs.target.getImageScaledToCanvas();
					this.rect = this.$refs.target.getCroppingRect();
				},
				handleFn() {
					console.log(arguments);
				},
			}
		});
		// 得先等待canvas渲染出图片才能获取图片
		setTimeout(() => {
			vm.getImage();
				
			setTimeout(() => {
				expect(vm.result).to.be.not.null;
				expect(vm.canvas).to.be.not.null;
				expect(vm.rect).to.be.not.null;

				destroyVM(vm);
				done();
			}, 5000);
		}, 5000);
	});
});