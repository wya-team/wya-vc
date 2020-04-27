## 图片裁剪（ImgsCrop）
裁剪修改图片

### 何时使用
需要调整图片大小或旋转图片。

### 基础用法
通过控制`scale`、`rotate`调整图片的缩放和旋转角度。

:::RUNTIME
```html
<template>
	<div>
		<vc-imgs-crop 
			ref="target"
			:src="src" 
			:scale="scale" 
			:rotate="rotate" 
			:width="375"
			:height="230"
			cross-origin="anonymous"
			@drop-file="handleDropFile"
			@load-failure="handleLoadFailure"
			@load-success="handleLoadSuccess"
			@image-ready="handleImageReady"
			@image-change="handleImageChange"
			@position-change="handlePositionChange"
		/>
		<vc-slider v-model="scale" :min="0.3" :max="3" :step="0.01" />
		<vc-slider v-model="rotate" :min="0" :max="360" />
		
		<div @click="handleSave">
			保存
		</div>

		<img :src="result" width="200">
	</div>
</template>
<script>
import { ImgsCrop, Slider } from '@wya/vc';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-imgs-crop': ImgsCrop,
		'vc-slider': Slider,
	},
	data() {
		return {
			src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
			scale: 1,
			rotate: 0,
			result: null
		};
	},
	methods: {
		handleDropFile(e) {
			console.log('DropFile: ', e);
		},
		handleLoadFailure(e) {
			console.log('LoadFailure: ', e);
		},
		handleLoadSuccess(imageState) {
			console.log('LoadSuccess: ', imageState);
		},
		handleImageReady() {
			console.log('ImageReady');
		},
		handleImageChange(src) {
			console.log('ImageChange: ', src);
		},
		handlePositionChange(position) {
			console.log('PositionChange: ', position);
		},
		async handleSave() {
			try {
				const { file, base64Image } = await this.$refs.target.getImage();
				this.result = base64Image;

			} catch (e) {
				console.log(e, "跨域问题：需要添加 cors协议头");
			}
		}
	}
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型  | 可选值 | 默认值
---|---|---|---|---
src | 图片地址 | `String`、`Object`、`File` | - | -
scale | 缩放值 | `Number` | - | `1`
rotate | 旋转角度 | `Number` | - | `0`
border | 裁剪的边框 [x, y] | `Number`、`Array` | - | `20`
borderRadius | 裁剪的边框圆角 | `Number` | - | `0`
width | 裁剪区域宽 | `Number` | - | `200`
height | 裁剪区域高 | `Number` | - | `200`
position | 裁剪区域定位 | `Object` | - | -
color | 边框的背景色RGBA | `Array` | - | `[0, 0, 0, 0.5]`
cross-origin | 跨域来源 | `String` | `anonymous`、`use-credentials` | `anonymous`
disableDrop | 是否支持拖拽图片进来编辑 | `Boolean` | - | `false`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
drop-file | 拖入图片回掉 | `(e: Event) => void 0` | `e`: 事件对象
load-fail | 图片加载失败 | - | -
load-success | 图片加载成功 | `(imageState: Object) => void 0` | `imageState`: 图片对象
image-ready | 图片加载成功，展示后执行 | - | -
image-change | 图片信息变化 | - | -
position-change | 位置变化 | `(position: Object) => void 0` | `position`: 定位信息
