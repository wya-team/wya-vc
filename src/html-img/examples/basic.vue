<template>
	<div>
		<img :src="src">
		<vc-html-img ref="target">
			<div>tpl</div>
			<div>tpl</div>
			<div>tpl</div>
			<div>tpl</div>
			<div>tpl</div>
			<div>tpl</div>
			<img src="https://avatars3.githubusercontent.com/u/34465004?s=200&v=4" class="image">
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
		}
	}
};
</script>
<style>
.image {
	width: 200px;
}
</style>
