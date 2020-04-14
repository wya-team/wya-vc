## 图片（Img）
图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等

### 基础用法
fit的5种模式

:::RUNTIME
```html
<template>
	<div class="v-img-basic" style="padding: 10px;">
		<div v-for="fit in fits" :key="fit" class="_img-wrap">
			<span style="margin-bottom: 10px;">{{ fit }}</span>
			<vc-img :src="url" :fit="fit" style="width: 100px; height: 100px" />
		</div>
	</div>
</template>

<script>
import { Img } from '@wya/vc';
export default {
	components: {
		"vc-img": Img
	},
	data() {
		return {
			fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
			url: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg'
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style lang="scss">
.v-img-basic {
	display: flex;
}
.v-img-basic ._img-wrap {
	display: flex;
	flex: 1;
	align-items: center;
	flex-direction: column;
}
</style>
```
:::

### 懒加载

:::RUNTIME
```html
<template>
	<div class="v-img-lazy" style="padding: 10px;">
		<div style="height: 400px; overflow-y: auto; display: flex; flex-direction: column; width: 100%">
			<!-- hack 边距 -->
			<div v-for="url in urls" :key="url" style="font-size: 0">
				<vc-img
					:src="url"
					lazy
					style="min-height: 400px; width: 400px; height: 400px"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { Img } from '@wya/vc';
export default {
	components: {
		"vc-img": Img
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
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
</style>
```
:::

### 加载失败

:::RUNTIME
```html
<template>
	<div class="v-img-lazy" style="text-align: center;">
		<vc-img
			src="https://oss.ruishan666.com/image/xcx/180228/123/裤子.png"
			lazy
			style="width: 200px; height: 200px; background: #f6f8fa;"
		/>
	</div>
</template>

<script>
import { Img } from '@wya/vc';
export default {
	components: {
		"vc-img": Img
	},
	data() {
		return {
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
</style>
```
:::

## API
#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
src | 图片资源 | `string` | -
fit | 确定图片如何适应容器框，同原生 object-fit | `string` | -
lazy | 是否开启懒加载 | `boolean` | `false`
wrapper | 父容器 | `object`; `string` | -



#### 事件

事件名 | 说明 | 类型 | 参数
---|---|---|---
load | 图片加载成功触发 | - | `(e: Event)`; `img`; `this`
error | 图片加载失败触发 | - | `(e: Error)`; `img`; `this`

#### Slot

属性 | 说明
---|---
placeholder | 图片未加载的占位内容
error | 加载失败的内容

## TODO

1. 自动计算高度（width.isRequired）
2. 管理资源宽高
3. cover/fit等效果
4. 自动压缩展示的图片
