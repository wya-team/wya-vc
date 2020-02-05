## 功能
Echarts图表

### 基础用法
参照Echarts官方配置文档(https://www.echartsjs.com/zh/option.html#title)，通过options完成图表配置

:::RUNTIME
```html
<template>
	<div style="height: 320px;">
		<vc-echart :options="options"/>
	</div>
</template>
<script>
import { Echarts, Button } from '@wya/vc';

export default {
	name: "vc-popup-basic",
	components: {
		'vc-echart': Echarts,
		'vc-button': Button,
	},
	data() {
		return {
			show: false
		};
	},
	computed: {
		options(){
			let data = [];
			for (let i = 0; i <= 360; i++) {
				let t = i / 180 * Math.PI;
				let r = Math.sin(2 * t) * Math.cos(2 * t);
				data.push([r, i]);
			}
			return {
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
			};
		}
	},
	methods: {
		handleClick() {
			this.show = true;
		},
	}
};

</script>
```
:::


### 自适应容器大小
通过autoResize属性设置图表是否在组件根元素尺寸变化时自动进行重绘，默认：`false`


:::RUNTIME
```html
<template>
	<div>
		<p>当前设置autoResize为true<p>
		<vc-button @click="handleClick">改变容器大小</vc-button>
		<div :style="{height: wrapperHeight}">
			<vc-echart :options="options" :auto-resize="true"/>
		</div>
	</div>
</template>
<script>
import { Echarts, Button } from '@wya/vc';

export default {
	name: "vc-popup-basic",
	components: {
		'vc-echart': Echarts,
		'vc-button': Button,
	},
	data() {
		return {
			wrapperHeight: '320px'
		};
	},
	computed: {
		options(){
			let data = [];
			for (let i = 0; i <= 360; i++) {
				let t = i / 180 * Math.PI;
				let r = Math.sin(2 * t) * Math.cos(2 * t);
				data.push([r, i]);
			}
			return {
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
			};
		}
	},
	methods: {
		handleClick() {
			this.wrapperHeight = this.wrapperHeight == '400px' ? '320px' : '400px';
		},
	}
};

</script>
```
:::




### API

### 基础属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
options | 图表配置，参照Echarts官方配置文档(https://www.echartsjs.com/zh/option.html#title) | `object` | - | -
auto-resize | 指定 ECharts 实例在组件根元素尺寸变化时是否需要自动进行重绘 | `Boolean` | - | `false`
