## 图像处理（imgs-processing）
图像处理(抠图、置灰、取色等等)

### 基础用法

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
<style>
.v-imgs-processing-basic {}
</style>
```
:::

### API

### 基础属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
dataSource | 图片的地址 | `String` | - | -
width | 画布宽度 | `Number` | - | 100
height | 画布高度 | `Number` | - | 100
processing | 图片处理方式 | `Sring` `Function` | `cutout`（扣掉颜色） `gray`（置灰） | -
cutoutColor | 要扣掉的颜色rgba格式 | `Array` | - | [0, 0, 0, 1]
tolerance | 颜色的容差 | `Number` | - | 0
crossOrigin | 解决图片跨域的问题 | `String` | - | anonymous




#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
- | - | `any`|---

#### Slot

属性 | 说明
---|---
- | -


## 基础用法

```jsx

```