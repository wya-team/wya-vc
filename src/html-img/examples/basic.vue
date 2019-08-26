<template>
	<div>
		<img :src="src">
		<vc-html-img ref="target" :parser="parser">
			<div>tpl</div>
			<div>tpl</div>
			<div>tpl</div>
			<div>tpl</div>
			<div>tpl</div>
			<div>tpl</div>
			<img src="https://avatars3.githubusercontent.com/u/34465004?s=200&v=4" class="image">
			
			<!-- 需要crossorigin加在第一个， 才能处理跨域 -->
			<img 
				:crossorigin="`anonymous`" 
				src="https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/1/20190518/102315/227984.jpg" 
				class="image"
			>
		</vc-html-img>
		<vc-button @click="handleClick">生成</vc-button>
	</div>
</template>
<script>
import HTMLImg from '..';
import Button from '../../button/index';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-html-img': HTMLImg,
		'vc-button': Button
	},
	data() {
		return {
			src: ''
		};
	},
	computed: {
		
	},
	methods: {
		async handleClick() {
			let res = await this.$refs.target.download();
			this.src = res.base64Image;
		},
		parser(url) {
			return new Promise((resolve) => {
				setTimeout(() => {
					console.log(url);
					resolve(url);
				}, 3000);
			});
		}
	}
};
</script>
<style>
.image {
	width: 200px;
}
</style>
