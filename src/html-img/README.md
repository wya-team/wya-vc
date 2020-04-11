## 图片生成（HtmlImg）

html转图片

### 何时使用
要把html转成图片

### 基础用法

:::RUNTIME
```html
<template>
	<div>
		<vc-html-img ref="target" :parser="parser" :crossorigin="`anonymous`" >
			<!-- 需要crossorigin加在第一个， 才能处理跨域 -->
			<img 
				src="https://wyatest.oss-cn-hangzhou.aliyuncs.com/image/1/20190518/102315/227984.jpg" 
				class="image"
			>
		</vc-html-img>
		<p>生成的图片</p>
		<img :src="src">
		<vc-button @click="handleClick">
			点击生成图片
		</vc-button>
		<vc-button @click="handleDown">
			点击生成图片并下载
		</vc-button>
	</div>
</template>

<script>
import { HtmlImg, Button } from '@wya/vc';

export default {
	components: {
		'vc-html-img': HtmlImg,
		'vc-button': Button
	},
	data() {
		return {
			src: ''
		};
	},
	computed: {
		
	},
	methods: {
		async handleClick() {
			let res = await this.$refs.target.getImage();
			this.src = res.base64Image;
		},
		async handleDown() {
			let res = await this.$refs.target.download();
			this.src = res.base64Image;
		},
		parser(url) {
			return new Promise((resolve) => {
				setTimeout(() => {
					console.log(url);
					resolve(url);
				}, 3000);
			});
		}
	}
};
</script>
<style>
.image {
	width: 200px;
}
</style>
```
:::

## API

### 基础属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
crossorigin | 处理跨域 |`String` | `anonymous`、`use-credentials`| `anonymous`
parser | - | `Function` | - | -

### 事件/方法

事件名 | 说明 | 类型 | 参数
---|---|---|---
getImage | 生成图片 | ({ filename = 'image', getFile = true }) | -
download | 生成图片并下载 | ({ filename = 'image', getFile = true }) | -
