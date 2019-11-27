<template>
	<div class="c-canvas-box"> 
		<canvas ref="canvas" />
		<button @click="handleClear">清除</button>
		<button @click="handleGetImg">获取图片</button>
		<button @click="handleRevocation">回退一步</button>
		<button @click="handleCancel">取消回退</button>
		<img :src="src" alt="">
	</div>
</template>
<script>
import Sign from './artboard';

export default {
	name: "c-sign",
	props: {
		degree: {
			type: Number,
			default: 0
		},
		options: Object,
		type: String, // 生成的图片的类型, 可取 image/png image/jpeg
		encoderOptions: Number, // 0 - 1
	},
	data() {
		return {
			canvasBox: null,
			src: ''
		};
	},
	mounted() {
		this.initCanvas();
	},
	methods: {
		handleRevocation() {
			this.sign.revocation();
		},
		handleCancel() {
			this.sign.cancel();
		},
		initCanvas() {
			const canvas = this.$refs.canvas;
			this.sign = new Sign(canvas, this.degree, this.options);
		},
		handleClear() {
			this.sign.clear();
		},
		handleGetImg() {
			this.src = this.sign.getImage({ type: this.type, encoderOptions: this.encoderOptions });
		},
	}
};
</script>
<style lang="scss">
.c-canvas-box {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 375px;
	canvas {
		width: 100%;
		height: 100%;
		cursor: crosshair;
		border: 1px solid #d3d3d3;
	}
	img {
		width: 100px;
		height: 100px;
	}
}
</style>