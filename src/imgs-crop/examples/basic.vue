<template>
	<div>
		<vc-imgs-crop 
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
		/>
		<vc-slider :min="0.3" :max="3" :step="0.01" v-model="scale" />
		<vc-slider :min="0" :max="360" v-model="rotate" />
		
		<div @click="handleSave">保存</div>

		<img :src="result" width="200">
	</div>
	
</template>
<script>
import Slider from '../../slider';
import ImgsCrop from '../imgs-crop';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-imgs-crop': ImgsCrop,
		'vc-slider': Slider,
	},
	data() {
		return {
			// src: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/1/20190522/212240/CEB)AY7L){07$XT$DU8B}Y7.jpg',
			src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
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
				const { file, base64Image } = await this.$refs.target.getImage();
				this.result = base64Image;

			} catch (e) {
				console.log(e, "跨域问题：需要添加 cors协议头");
			}
		}
	}
};
</script>
