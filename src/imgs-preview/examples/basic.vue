<template>
	<div>
		<vc-imgs-preview :data-source="dataSource" :render-row="renderRow"/>
		<span @click="handleClick">自定义预览</span>
	</div>
</template>
<script>
import ImgsPreview from '../imgs-preview';

export default {
	name: "vc-imgs-preview-basic",
	components: {
		'vc-imgs-preview': ImgsPreview
	},
	data() {
		return {
			dataSource: [
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180228/803943951788/裤子.png!4-4',
					title: 'Image 1',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180313/942990884682/10053600,2880,1800.jpg!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942990767112/10049533,2880,1800.jpg',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180313/942990767112/10049533,2880,1800.jpg!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180228/803943510611/衣服-01.png!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				},
				{
					src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
					thumbnail: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg!4-4',
					title: 'Image 2',
					w: 1200,
					h: 900
				}

			],
			opts: {
				closeOnScroll: false
			}
		};
	},
	computed: {
		
	},
	methods: {
		renderRow(h, params) {
			const { src, index } = params; 
			return h('img', {
				attrs: {
					src,
					width: 100,
					height: 100,
				},
				on: {
					click: (e) => console.log(e)
				}
			});
		},
		handleClick(e) {
			let pos = {};
			try {
				const target = e.target; // 先得到pos, 否则getThumbBoundsFn再计划，target已变化
				const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				const rect = target.getBoundingClientRect();

				pos = { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

			} catch (e) {
				console.log(e);
			}
			ImgsPreview.popup({
				visible: true,
				dataSource: this.dataSource,
				opts: {
					index: 2,
					history: false,
					getThumbBoundsFn: (index) => pos
				}
			}).then(() => {

			}).catch(() => {

			});
		}
	}
};
</script>
