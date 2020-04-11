## 图标（Icon）
图标

### 基础用法
通过`type`控制图标

:::RUNTIME
```html
<template>
	<div class="v-icon-basic">
		<vc-icon type="success"/>
		<vc-icon type="error"/>
	</div>
</template>

<script>
import { Icon, Clipboard } from '@wya/vc';

export default {
	components: {
		'vc-icon': Icon,
		'vc-clipboard': Clipboard
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
.v-icon-basic > .vc-icon{
	font-size: 30px;
}
.v-icon-basic > svg {
	width: 1em;
	height: 1em;
	fill: currentColor;
	overflow: hidden;
}
</style>
```
:::

### 图标集合(TODO)

:::RUNTIME
```html
<template>
	<div class="v-icon-basic">
		<vc-clipboard v-for="(item, index) in items" :key="index" :value="`<vc${m}-icon type=&quot;${item}&quot; />`">
				<vc-icon :type="item" inherit />
				<p>{{ item }}</p>
			</vc-clipboard>
	</div>
</template>

<script>
import { Icon, Clipboard} from '@wya/vc';
export default {
	components: {
		'vc-icon': Icon,
		'vc-clipboard': Clipboard
	},
	data() {
		return {
			items: []
		};
	},
	mounted() {

	},
	methods: {
	}
};
</script>
<style>
.v-icon-basic {
	display: flex;
	flex-wrap: wrap;
}
.v-icon-basic > div {
	width: 200px;
	padding: 20px;
	text-align: center;
	cursor: pointer;
}
</style>
```
:::

### API

### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
type | icon类型 | `String` | -
inherit | 是否使用svg预设的颜色 | `Boolean` | false

> 如果要改变颜色的话: `:inherit="false"`


### 事件

事件名 | 说明 | 类型 | 默认值
---|---|---|---
click | 点击事件 | `Function` | -


### TODO

- 图标内容
- 按需加载包过大问题