## [Demo Basic](https://wya-team.github.io/wya-vc/dist/print/basic.html)
## 功能
打印内容

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
		<vc-print ref="pageTarget">
			打印的内容
			打印的内容
			打印的内容
			打印的内容
			打印的内容
		</vc-print>
		<div @click="handleClick">点我打印</div>
	</div>
</template>
<script>
import Print from 'wya-vc';

export default {
	name: "vc-print-basic",
	components: {
		'vc-print': Print
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick() {
			console.log(this.$refs.pageTarget.print());
		}
	}
};
</script>
```

