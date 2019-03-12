## [Demo Basic](https://wya-team.github.io/wya-vc/dist/copy/basic.html)
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
@before | 复制前的操作, 要求返回`Promise` | `(e) => Promise` | -
@after | 复制后的操作 | `(value) => void` | -

## 基础用法

```vue
<template>
	<div>
		<vc-copy :value="msg">点我复制</vc-copy>
	</div>
</template>
<script>
import { Copy } from '@wya/vc';

export default {
	name: "vc-copy-basic",
	components: {
		'vc-name': Copy
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

