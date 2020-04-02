## 空标签（Fragment）

只返回内部元素

### 何时使用

当有多个同级标签，但不需要最外层标签包裹时使用。

### 基础用法

在最外层`template`里如果直接使用`fragment`包裹多个同级标签依旧会报不能有多个子节点的警告。

:::RUNTIME
```vue
<template>
	<div class="vc-fragment-basic">
		<vc-fragment>
			<div class="_box">1</div>
			<div class="_box">2</div>
			<div class="_box">3</div>
			<div class="_box">4</div>
			<div class="_box">5</div>
		</vc-fragment>
	</div>
</template>
<script>
import { Fragment } from '@wya/vc';

export default {
	name: 'vc-fragment-basic',
	components: {
		'vc-fragment': Fragment
	}
};
</script>
<style>
.vc-fragment-basic{
	display: flex
}
.vc-fragment-basic ._box {
	width: 120px;
	height: 120px;
	background: #f2f2f2;
	margin-left: 24px;
	display: flex;
	justify-content:center;
	align-items: center;
}
</style>

```
:::
