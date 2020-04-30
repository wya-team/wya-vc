## 手机端常用列表（List）
手机端展示数据列表

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

## API

### 属性
属性 | 说明 | 类型 | 可选值 |默认值
---|---|---|---|---
labelWidth | `item`内`label`的宽度 | `String`、`Number` | - | -
border | 是否显示边框 | `Boolean` | - | `true`

### Item属性
属性 | 说明 | 类型 | 可选值 |默认值
---|---|---|---|---
width | `item`内`label`的宽度,优先级高于`list`内的labelWidth | `String`、`Number` | - | -
label | label 内容 | `String` | - | -
extra | 右边的内容 | `String` | - | -
arrow | 右边有无箭头 | `Boolean` | - | `false`
multiple | 多行 | `Boolean` | - | `false`
to | 跳转的地址, 如果是带`http(s)`则采用`window.open/href`方式打开 | `String`、`object` | - | -
indent | 设置`paddingLeft`值 | `Number` | - | 12
method | 跳转的方式,只在有`$router`的情况下生效 | `String` | `push`、`replace`、`go`、`back`、`forward` | `push`
href | 跳转的地址, 使用location.href | `Boolean` | - | false

### Item Slot
属性 | 说明
---|---
label | label 内容
extra | 右边内容（替代`extra`）
