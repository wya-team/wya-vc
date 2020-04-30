## 图像处理（ImgsProcessing）
图像处理(抠图、置灰、取色等等)

### 何时使用
需要去除图片的色彩，或者将图片置灰。

### 基础用法
通过设置`cutout-color`扣掉指定颜色，需要配合`processing`使用。

:::RUNTIME
```html
<template>
	<div class="v-imgs-processing-basic">
		<h3>原图</h3>
		<img :src="img" width="100" height="100">
		<h3>扣掉指定颜色</h3>
		<vc-imgs-processing
			:data-source="img"
			:tolerance="90"
			:cutout-color="[255, 237, 113, 1]" 
			processing="cutout"
		/>
	</div>
</template>
<script>
import { ImgsProcessing } from '@wya/vc';

export default {
	components: {
		"vc-imgs-processing": ImgsProcessing
	},
	data() {
		return {
			img: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20190812/112918/微信图片_20190624213255.jpg'
		};
	}
};
</script>
```
:::

### 置灰
设置`processing`为gray

:::RUNTIME
```html
<template>
	<div class="v-imgs-processing-basic">
		<h3>原图</h3>
		<img :src="img" width="100" height="100">
		<h3>置灰</h3>
		<vc-imgs-processing
			:data-source="img"
			processing="gray"
		/>
	</div>
</template>
<script>
import { ImgsProcessing } from '@wya/vc';

export default {
	components: {
		"vc-imgs-processing": ImgsProcessing
	},
	data() {
		return {
			img: 'https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/172/20190812/112918/微信图片_20190624213255.jpg'
		};
	}
};
</script>
```
:::

## API

### 基础属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
dataSource | 图片的地址 | `String` | - | -
width | 画布宽度 | `Number` | - | 100
height | 画布高度 | `Number` | - | 100
processing | 图片处理方式 | `String`、`Function` | `cutout`（扣掉颜色）、`gray`（置灰） | -
cutoutColor | 要扣掉的颜色`rgba`格式 | `Array` | - | [0, 0, 0, 1]
tolerance | 颜色的容差 | `Number` | - | 0
crossOrigin | 解决图片跨域的问题 | `String` | - | anonymous

