<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<h1>Basic</h1>
		<div v-for="fit in fits" :key="fit">
			<vc-img :src="url" :fit="fit" style="width: 100px; height: 100px" />
		</div>

		<h1>Lazy</h1>
		<div style="height: 400px; overflow-y: auto;">
			<vc-img 
				v-for="url in urls" 
				:key="url" 
				:src="url" 
				lazy 
				style="min-height: 200px; display: block; margin-bottom: 10px"
			/>
		</div>

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
			fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
			url: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg',
			urls: [
				'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
				'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg',
				'https://oss.ruishan666.com/image/xcx/180313/942990767112/10049533,2880,1800.jpg',
				'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png',
				'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg'
			]
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
