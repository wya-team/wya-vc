<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<h1>原生标签比较(有一定差距，原图会全部显示)</h1>
		<vc-img :src="url" />
		<img :src="url">
	</div>
</template>
<script>
import Img from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-img': Img,
	},
	data() {
		return {
			url: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg'
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
