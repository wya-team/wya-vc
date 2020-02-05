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

	it('should run current', () => {
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
				@mouse-up="handleFn"
				@mouse-move="handleFn"
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
					result: null
				};
			},
			methods: {
				handleFn() {
					console.log(arguments);
				},
				async handleSave() {
					try {
						const { file, base64Image } = await this.$refs.target.getImage();
						this.result = base64Image;
					} catch (e) {
						console.log(e, "跨域问题：需要添加 cors协议头");
					}
				}
			}
		});
		vm.scale = 0.3;
		expect(vm.$el).to.exist;

		destroyVM(vm);
	});
});