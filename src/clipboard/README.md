## 复制（clipboard）

复制内容

### 何时使用

用于复制内容

### 基础用法
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
	computed: {
		
	},
	methods: {
		handleAfter(value) {
			Message.success({
				content: `复制成功：${value}`
			});
			return value;
		},
		handleBefore(e, value) {
			return value;
		}
	}
};
</script>
```
:::

#### 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 复制的文本内容 | - | `any` | -
tag | 外层标签 | `String`、`Object`、`Function`| `span`、`div`、`***` | `div`

#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
@before | 复制前的操作 | `(value: String)` |  `Promise`
@after | 复制后的操作 | `(value: String)` | -



