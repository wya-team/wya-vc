<template>
	<div>
		<vcm-touch @pinch="handlePinch">
			<vcm-imgs-crop 
				ref="target"
				:src="src"
				:scale="scale" 
				:rotate="rotate" 
				style="height: 100%; width: 100%" 
				cross-origin="anonymous"
				@drop-file="handleFn"
				@load-failure="handleFn"
				@load-success="handleFn"
				@image-ready="handleFn"
				@image-change="handleFn"
				@mouseup="handleFn"
				@mousemove="handleFn"
				@position-change="handleFn"
			/>
		</vcm-touch>
		<vcm-icon type="rotate-right" @click="rotate += 90"/>
		<vcm-button @click="handleSave">保存</vcm-button>
		<img :src="result">
	</div>
</template>
<script>
import MImgsCrop from '..';
import MTouch from '../../touch/index.m';
import MIcon from '../../icon/index.m';
import MButton from '../../button/index.m';

export default {
	name: "vcm-tpl-basic",
	components: {
		'vcm-imgs-crop': MImgsCrop,
		'vcm-touch': MTouch,
		'vcm-icon': MIcon,
		'vcm-button': MButton,
	},
	data() {
		return {
			src: "https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg",
			// src: 'https://avatars3.githubusercontent.com/u/34465004?s=200&v=4',
			scale: 1,
			rotate: 0,
			result: null
		};
	},
	computed: {
		
	},
	methods: {
		handleFn() {
			console.log(arguments);
		},
		async handleSave() {
			try {
				const { file, base64Image } = await this.$refs.target.getImage({ getFile: true });
				this.result = base64Image;
				console.log(file);
			} catch (e) {
				console.log(e, "跨域问题：需要添加 cors协议头");
			}
		},
		handlePinch({ scale }) {
			this.scale += scale;
			this.scale = this.scale < 0 ? 0.05 : this.scale;
		},
	}
};
</script>
<style>
img {
	width: 100%
}
</style>
