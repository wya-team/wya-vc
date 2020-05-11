## 复制（Clipboard）
复制内容

### 何时使用
用于复制页面内的一段文字。

### 基础用法
通过`value`绑定需要复制的内容。

:::RUNTIME
```html
<template>
	<div>
		<input v-model="msg" type="text">
		<br>
		<vc-clipboard :value="msg">
			点我复制
		</vc-clipboard>
	</div>
</template>
<script>
import { Message, Clipboard } from '@wya/vc';

export default {
	name: "vc-clipboard-basic",
	components: {
		"vc-clipboard": Clipboard,
	},
	data() {
		return {
			msg: '我是被复制的内容'
		};
	},
};
</script>
```
:::

### 修改复制的内容
通过`before`在复制前修改复制的内容。

:::RUNTIME
```html
<template>
	<div>
		<input v-model="msg" type="text">
		<br>
		<vc-clipboard 
			:value="msg" 
			tag="span"
			@before="handleBefore"
			@after="handleAfter"
		>
			点我复制
		</vc-clipboard>
	</div>
</template>
<script>
import { Message, Clipboard } from '@wya/vc';

export default {
	name: "vc-clipboard-basic",
	components: {
		"vc-clipboard": Clipboard,
	},
	data() {
		return {
			msg: '我是被复制的内容'
		};
	},
	methods: {
		handleAfter(value) {
			Message.success({
				content: `复制成功：${value}`
			});
			return value;
		},
		handleBefore(e, value) {
			return value + '被before修改';
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
value | 复制的文本内容 | `String` | - | -
tag | 外层标签 | `String`、`Object`、`Function`| - | `div`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
before | 复制前的操作 | `(e: event, value: String) => Promise` | `event`: 触发事件; `value`: 复制的内容
after | 复制后的操作 | `(value: String) => void 0` | `value`: 复制的内容



