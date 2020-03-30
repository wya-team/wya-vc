## 手机端常用列表


### 基础用法

:::RUNTIME
```html
<template>
	<div class="v-list-basic">
		<div style="text-align: center">我是手机</div>
		<vcm-list :label-width="100" style="margin: 20px 0;">
			<vcm-list-item :arrow="false" label="姓名">
				<template #label="">
					<div />
				</template>
				<template #extra="">
					<div>2</div>
				</template>
			</vcm-list-item>
			<vcm-list-item label="姓名" extra="啦啦啦" />
			<vcm-list-item :arrow="false" label="姓名" extra="啦啦啦" />
		</vcm-list>
	</div>
</template>

<script>
import { List } from '@wya/vc';
export default {
	components: {
		'vcm-list': List,
		'vcm-list-item': List.Item
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
.v-list-basic {
	width: 300px;
	margin: 10px;
	padding: 10px 0;
	box-shadow: 0 0 10px 0 rgba(213, 213, 213, 0.5);
}
</style>
```
:::
### API

### 属性

属性 | 说明 | 类型 | 可选值 |默认值
---|---|---|---|---
labelWidth | `item`内`label`的宽度 | `string`  `number` | - | -


### Item属性

属性 | 说明 | 类型 | 可选值 |默认值
---|---|---|---|---
width | `item`内`label`的宽度,优先级高于`list`内的labelWidth | `string`  `number` | - | -
label | label 内容 | `string` | - | -
extra | 右边的内容 | `string` | - | -
arrow | 右边有无箭头 | `boolean` | - | `false`
multipleLine | 多行 | `boolean` | - | `false`
to | 跳转的地址, 如果是带`http(s)`则采用`window.open/href`方式打开 | `string` `object` | - | -
href | 跳转的地址, 使用location.href | `boolean` | - | false
method | 跳转的方式（`push`, `replace`）,只在有`$router`的情况下生效 | `string` | `push`, `replace` | `push`

### Item Slot

属性 | 说明
---|---
label | label 内容
extra | 右边内容（替代`extra`）
