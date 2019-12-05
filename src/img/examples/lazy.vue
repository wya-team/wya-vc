<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<h1>Lazy</h1>
		<div style="height: 400px; overflow-y: auto; display: flex; flex-direction: column; width: 100%">
			<!-- hack 边距 -->
			<div v-for="url in urls" :key="url" style="font-size: 0">
				<vc-img 
					:src="url" 
					lazy 
					style="min-height: 200px; width: 200px; height: 200px"
				/>
			</div>
		</div>
	
		<div v-if="show">
			<h1>Lazy(img没有宽高，最好不要使用lazy)</h1>
			<div style="height: 400px; overflow-y: auto; display: flex; flex-direction: column;">
				<!-- hack 边距 -->
				<div v-for="url in urls" :key="url" style="font-size: 0">
					<!-- 需要lazy,需要给一定的宽度和高度，否者会比较别扭 -->
					<vc-img 
						:src="url" 
						lazy 
						style="min-height: 200px;"
					/>
				</div>
			</div>
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
			show: false,
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
	mounted() {
		setTimeout(() => {
			this.show = true;
		}, 5000);
	},
	methods: {
	}
};
</script>
