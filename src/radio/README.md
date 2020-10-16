## 单选框（Radio)
在一组备选项中进行单选

### 何时使用
- 用于在多个备选项中选中单个状态。
- 和 `Select` `的区别是，Radio` 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

### 基本使用
最简单的用法。

:::RUNTIME
```html
<template>
	<div class="v-radio-basic">
		<vc-radio v-model="radio">{{radio}}</vc-radio>
		<div>单独使用，使用v-model双向绑定</div>
	</div>
</template>
<script>
import { Radio } from '@wya/vc';
export default {
	components: {
		"vc-radio": Radio
	},
	data() {
		return {
			radio: false
		}
	},
};
</script>
<style>
.v-radio-basic > div {
	margin-top: 10px;
}
</style>
```
:::

### 禁用状态
通过设置`disabled`属性，使单选框变成不可用的状态。

:::RUNTIME
```html
<template>
	<div class="v-radio-basic">
		<vc-radio v-model="radio" disabled>选项不可选</vc-radio>
		<vc-radio v-model="radio1" disabled>选中状态不可选</vc-radio>
	</div>
</template>
<script>
import { Radio } from '@wya/vc';
export default {
	components: {
		"vc-radio": Radio
	},
	data() {
		return {
			radio: false,
			radio1: true
		}
	},
};
</script>
<style>
.v-radio-basic > div {
	margin-top: 10px;
}
</style>
```
:::

### 组合使用
- 使用 `Radio.Group` 实现一组互斥的选项组。在组合使用时，`Radio` 使用 `label` 来自动判断。每个 `Radio` 的内容可以自定义，如不填写则默认使用 `label` 的值。
- 通过设置 `disabled` 属性来禁用单选框, 设置属性 `vertical` 可以垂直显示 。

:::RUNTIME
```html
<template>
<div class="v-radio-group">
	<div class="group">
		<vc-radio-group v-model="phone" vertical>
				<vc-radio label="apple" disabled>
					<span>Apple</span>
				</vc-radio>
				<vc-radio label="android">
					<span>Android</span>
				</vc-radio>
				<vc-radio label="windows">
					<span>Windows</span>
				</vc-radio>
		</vc-radio-group>
		<div>{{phone}}</div>
	</div>
</div>
</template>
<script>
import { Radio } from '@wya/vc';

export default {
	components: {
		"vc-radio": Radio,
		"vc-radio-group": Radio.Group
	},
	data() {
		return {
			phone: 'apple'
		}
	},
};
</script> 
```
:::

### 按钮样式
组合使用时可以设置属性 `type` 属性为 `button`来应用按钮的样式。

:::RUNTIME
```html
<template>
<div class="v-radio-type">
	<div class="group">
		<vc-radio-group v-model="button1" type="button">
				<vc-radio label="北京"></vc-radio>
				<vc-radio label="上海"></vc-radio>
				<vc-radio label="深圳"></vc-radio>
				<vc-radio label="杭州"></vc-radio>
		</vc-radio-group>
		<div>{{button1}}</div>
	</div>
	<div class="group">
		<vc-radio-group v-model="button2" type="button">
				<vc-radio label="北京"></vc-radio>
				<vc-radio label="上海" disabled></vc-radio>
				<vc-radio label="深圳"></vc-radio>
				<vc-radio label="杭州"></vc-radio>
		</vc-radio-group>
		<div>{{button2}}</div>
	</div>
	<div class="group">
		<vc-radio-group v-model="button3" type="button">
				<vc-radio label="北京"></vc-radio>
				<vc-radio label="上海" disabled />
				<vc-radio label="深圳" disabled />
				<vc-radio label="杭州" disabled />
		</vc-radio-group>
		<div>{{button3}}</div>
	</div>
</div>
</template>
<script>
import { Radio } from '@wya/vc';

export default {
	components: {
		"vc-radio": Radio,
		"vc-radio-group": Radio.Group
	},
	data() {
		return {
			button1: '北京',
			button2: '北京',
			button3: '北京'
		}
	},
};
</script> 
<style lang="scss">
.v-radio-type{
	display: flex;
}
.v-radio-type .group{
	margin-left: 20px;
}
.v-radio-type .group div{
	margin-top: 10px;
}
</style>
```
:::

## API

### Radio props
属性 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | ---
value | 只在单独使用时有效。可以使用 `v-model` 双向绑定数据 | `String`、`Number`、`Boolean` | - | false
label | 只在组合使用时有效。指定当前选项的 value 值，组合会自动判断当前选择的项目| `String`、`Number`、`Boolean` | - | -
disabled | 是否禁用当前项 | `Boolean` | - | `false`
true-value | 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 | `String`、`Number`、`Boolean` | - | `true` 
false-value|没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用| `String`、`Number`、`Boolean` | `false`
name | 原生 `name` 属性 | `String` | - | -

### Radio Events
事件名 | 说明 | 回调参数 | 参数说明
--- | --- | --- | ---
change | 在选项状态发生改变时触发，返回当前状态。通过修改外部的数据改变时不会触发 | `(value: String | Number | Boolean, e: Event ) => void 0`| `value`：当前绑定的值；`e`：事件对象

### Group 属性
属性 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | ---
value | 指定当前选中的项目数据。可以使用 `v-model` 双向绑定数据 | `String`,  `Number` | - | -
type | 可选值为 `button` 或不填，为 `button` 时使用按钮样式 | `String` | `button` | -
vertical | 是否垂直排列，按钮样式下无效 | `Boolean` | - | `false`
disabled | 是否禁用 | `Boolean` | - | `false`
name | 原生 `name` 属性 | `String` | - | -

### Group 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
change | 在选项状态发生改变时触发，返回当前状态。通过修改外部的数据改变时不会触发 | `(value: String | Number | Boolean, e: Event ) => void 0`| `value`：当前绑定的值；`e`：事件对象


## TODO 

- label作为了选项的判断，是否改为value