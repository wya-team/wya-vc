## 功能（Tags）
各种样式的标签

### 基础用法
使用 `type`、`color` 控制标签的样式

:::RUNTIME
```html
<template>
	<div class="v-tag-basic">
		<vc-tag type="border" color="default">标签一</vc-tag>
		<vc-tag type="border" color="primary">标签一</vc-tag>
		<vc-tag type="border" color="success">标签一</vc-tag>
		<vc-tag type="border" color="warning">标签一</vc-tag>
		<vc-tag type="border" color="error">标签一</vc-tag>
		<br>
		<vc-tag type="dot" color="default">标签一</vc-tag>
		<vc-tag type="dot" color="primary">标签一</vc-tag>
		<vc-tag type="dot" color="success">标签一</vc-tag>
		<vc-tag type="dot" color="warning">标签一</vc-tag>
		<vc-tag type="dot" color="error">标签一</vc-tag>
	</div>
</template>

<script>
import { Tag } from '@wya/vc';
export default {
	components: {
		"vc-tag": Tag
	},
};
</script>
<style>

</style>
```
:::


### 是否可以关闭
使用 `closable`控制标签是否可以关闭

:::RUNTIME
```html
<template>
	<div class="v-tag-basic">
		<vc-tag type="border" closable>
			标签
		</vc-tag>
		<vc-tag type="border" closable color="primary">
			标签一
		</vc-tag>
		<vc-tag type="border" closable color="success">
			标签二
		</vc-tag>
		<vc-tag type="border" closable color="error">
			标签三
		</vc-tag>
		<vc-tag type="border" closable color="warning">
			标签四
		</vc-tag>
		<br><br>
		<vc-tag type="dot" closable>
			标签
		</vc-tag>
		<vc-tag type="dot" closable color="primary">
			标签一
		</vc-tag>
		<vc-tag type="dot" closable color="success">
			标签二
		</vc-tag>
		<vc-tag type="dot" closable color="error">
			标签三
		</vc-tag>
		<vc-tag type="dot" closable color="warning">
			标签四
		</vc-tag>

	</div>
</template>

<script>
import { Tag } from '@wya/vc';
export default {
	components: {
		"vc-tag": Tag
	},
	methods:{
		hanleClose(){

		}
	}
};
</script>
<style>

</style>
```
:::

### 选中功能及状态
使用 `checkable`、`checked` 控制标签是否可以切换选择状态及有没有被选中

:::RUNTIME
```html
<template>
	<div class="v-tag-basic">
		<vc-tag checkable>
			标签
		</vc-tag>
		<vc-tag checkable color="primary">
			标签一
		</vc-tag>
		<vc-tag checkable :checked="false" color="success">
			标签二
		</vc-tag>
		<vc-tag checkable checked color="error">
			标签三
		</vc-tag>
		<vc-tag checkable :checked="false" color="warning">
			标签四
		</vc-tag>
	</div>
</template>

<script>
import { Tag } from '@wya/vc';
export default {
	components: {
		"vc-tag": Tag
	},
};
</script>
<style>

</style>
```
:::

### 当前标签名称
使用`name`设置当前标签的名称，当使用 v-for，并支持关闭时，会比较有用

:::RUNTIME
```html
<template>
	<div class="v-tag-basic">
		<vc-tag
			v-for="item in count"
			:key="item"
			:name="item"
			closable
			color="primary"
			@close="handleClose"
		>
			标签{{ item + 1 }}
		</vc-tag>
		<span @click="handleAdd">添加标签</span>
	</div>
</template>

<script>
import { Tag } from '@wya/vc';
export default {
	components: {
		"vc-tag": Tag
	},
	data(){
		return {
			count: [0, 1, 2]
		}
	},
	methods: {
		handleAdd() {
			if (this.count.length) {
				this.count.push(this.count[this.count.length - 1] + 1);
			} else {
				this.count.push(0);
			}
		},
		handleClose(event, name) {
			const index = this.count.indexOf(name);
			this.count.splice(index, 1);
		}
	}
};
</script>
<style>

</style>
```
:::



### API

### 基础属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
closable | 标签是否可以关闭 | `Boolean` | - | `false`
checkable | 标签是否可以选择 | `Boolean` | - | `false`
checked | 标签的选中状态 | `Boolean` | - | `true`
type | 标签的样式类型 | `String` | `default`、`border`、`dot` | `default`
color | 标签颜色，你也可以自定义颜色值。 | `String` | `default`、`primary`、`success`、`warning`、`error` | `default`
name | 当前标签的名称，使用 v-for，并支持关闭时，会比较有用 | `String`、`Number` | - | -

### 事件/方法

属性 | 说明 | 类型 | 参数
---|---|---|---|---
close | 关闭时触发 | `event, name` | ---
change | 切换选中状态时触发 | `checked, name` | ---
