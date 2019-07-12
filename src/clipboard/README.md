## [Demo Basic](https://wya-team.github.io/wya-vc/dist/clipboard/basic.html)
## 功能
复制内容

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 复制的文本内容 | `any` | -
tag | 外层标签`span / div / **` | `str obj func` | div

#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
@before | 复制前的操作 | `(value: String)` |  Promise
@after | 复制后的操作 | `(value: String)` | -

#### API方法调用

- Clipboard.set(v)

## 基础用法

```vue
<template>
	<div>
		<vc-clipboard :value="msg">点我复制</vc-clipboard>
	</div>
</template>
<script>
import { Clipboard } from '@wya/vc';

export default {
	name: "vc-clipboard-basic",
	components: {
		'vc-name': Clipboard
	},
	data() {
		return {
			msg: 'copy'
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>

```

