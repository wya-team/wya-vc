<template>
	<canvas :width="width" :height="height" />
</template>
<script>
import Processing from './core';

export default {
	name: "vc-imgs-processing",
	props: {
		// 要处理的图片可以是图片网络地址，imageData, canvas
		dataSource: [String],
		// 画布的宽度
		width: {
			type: Number,
			default: 100
		}, 
		// 画布的高度
		height: {
			type: Number,
			default: 100
		},
		// 图像的处理方法
		processing: {
			type: [String, Function],
			required: true,
			validator: (v) => {
				if (typeof v === 'string') {
					return ['cutout', 'gray'].includes(v);
				}
				return true;
			}
		},
		// 要扣掉的颜色rgba格式
		cutoutColor: {
			type: Array,
			default: () => ([0, 0, 0, 1])
		},
		// 颜色的容差
		tolerance: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	watch: {
		dataSource(newVal) {
			this.processImage(newVal);
		}
	},
	mounted() {
		this.processImage(this.dataSource);
	},
	methods: {
		async processImage(dataSource) {
			let context = this.$el.getContext('2d');
			let afterData;
			this.imageData = await Processing.getImageData({
				context, 
				dataSource,
				width: this.width,
				height: this.height
			});

			if (typeof this.processing === 'string') {
				afterData = Processing[this.processing](
					this.imageData, 
					{
						cutoutColor: this.cutoutColor, 
						tolerance: this.tolerance
					}
				);
			} else {
				afterData = this.processing(this.imageData);
			}
			context.putImageData(afterData, 0, 0);
		}
		// TODO baseb4
	}
};
</script>
<style></style>