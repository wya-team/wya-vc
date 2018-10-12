<template>
	<div :style="{width: width, height: height}">
		<vc-echarts 
			:options="polar"
			:auto-resize="true"
		/>
	</div>
</template>
<script>
import Echarts from '../echarts';

export default {
	name: "vc-echarts-basic",
	components: {
		'vc-echarts': Echarts
	},
	data() {
		let data = [];

		for (let i = 0; i <= 360; i++) {
			let t = i / 180 * Math.PI;
			let r = Math.sin(2 * t) * Math.cos(2 * t);
			data.push([r, i]);
		}

		return {
			polar: {
				title: {
					text: '极坐标双数值轴'
				},
				legend: {
					data: ['line']
				},
				polar: {
					center: ['50%', '54%']
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				angleAxis: {
					type: 'value',
					startAngle: 0
				},
				radiusAxis: {
					min: 0
				},
				series: [
					{
						coordinateSystem: 'polar',
						name: 'line',
						type: 'line',
						showSymbol: false,
						data
					}
				],
				animationDuration: 2000
			},
			width: '400px',
			height: '400px'
		};
	},
	computed: {
		
	},
	mounted() {
		setTimeout(() => {
			this.width = '800px';
			this.height = '800px';
		}, 3000);
	},
	methods: {
	}
};
</script>