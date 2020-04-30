## 打印（Print）
调用浏览器的打印功能

### 何时使用
需要打印的时候

### 基础用法
最基本的用法，通过调用组件的`print`方法进行打印。

:::RUNTIME
```html
<template>
	<div>
		<vc-print ref="pageTarget">
			打印的内容
			打印的内容
			打印的内容
			打印的内容
			打印的内容
		</vc-print>
		<vc-button style="margin-top: 10px;" @click="handleClick">
			点我打印
		</vc-button>
	</div>
</template>
<script>
import { Print, Button } from '@wya/vc';

export default {
	name: "vc-print-basic",
	components: {
		'vc-print': Print,
		'vc-button': Button
	},
	methods: {
		handleClick() {
			console.log(this.$refs.pageTarget.print());
		}
	}
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 复制的文本内容 | `any` | - | -
tag | 外层标签 | `String`; `Object`;  `Function` | `span / div / **` | `div`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
before | 复制前的操作, 要求返回`Promise` | `(e) => Promise` | -
after | 复制后的操作 | `(value) => void 0` | `value`：打印内容
