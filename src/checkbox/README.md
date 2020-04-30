## 多选框（Checkbox）
多选框,主要用于一组可选项多项选择，或者单独用于标记切换某种状态。

### 何时使用
- 在一组可选项中进行多项选择时
- 单独使用可以表示两种状态之间的切换，和`switch`类似。区别在于切换`switch`会直接触发状态改变，而`checkbox`一般用于状态标记，需要和提交操作配合

### 基础用法
简单的`checkbox`，单独使用可以表示两种状态之间的切换，写在标签中的内容为`checkbox`按钮后的介绍。

:::RUNTIME
```html
<template>
	<vc-checkbox v-model="isChecked">
		Checkbox
	</vc-checkbox>
</template>
<script>
import { Checkbox } from '@wya/vc';

export default {
	name: 'runtime-basic',
	components: {
		'vc-checkbox': Checkbox
	},
	data() {
		return {
			isChecked: false
		}
	}
}
</script>
```
:::

### 禁用
使用`disabled`禁用checkbox。

:::RUNTIME
```html
<template>
	<div>
		<vc-checkbox v-model="isChecked1" disabled>
			Checkbox1
		</vc-checkbox>
		<br/>
		<br/>
		<vc-checkbox v-model="isChecked2" disabled>
			Checkbox2
		</vc-checkbox>
	</div>
</template>
<script>
import { Checkbox } from '@wya/vc';

export default {
	name: 'runtime-disabled',
	components: {
		'vc-checkbox': Checkbox
	},
	data() {
		return {
			isChecked1: false,
			isChecked2: true
		}
	}
}
</script>
```
:::

### Checkbox组
适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。。

:::RUNTIME
```html
<template>
	<div>
		<vc-checkbox-group v-model="checkedFruits">
			<vc-checkbox 
				v-for="fruit in fruits"
				:key="fruit"
				:label="fruit" 
			/>
		</vc-checkbox-group>
	</div>
</template>

<script>
import { Checkbox } from '@wya/vc';

export default {
	name: 'runtime-group',
	components: {
		'vc-checkbox': Checkbox,
		'vc-checkbox-group': Checkbox.Group,
	},
	data() {
		return {
			fruits: ['Apple', 'Bananer', 'mongo'],
			checkedFruits: ['Apple']
		}
	}
}
</script>
```
:::

### indeterminate 状态
`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。

:::RUNTIME
```html
<template>
	<div>
		<div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
			<vc-checkbox
				v-model="checkAll"
				:indeterminate="indeterminate"
				@change="handleCheckAll"
			>
				全选
			</vc-checkbox>
		</div>
		<vc-checkbox-group v-model="checkedFruits" @change="handleChange">
			<vc-checkbox 
				v-for="fruit in fruits"
				:key="fruit"
				:label="fruit" 
			/>
		</vc-checkbox-group>
	</div>
</template>

<script>
import { Checkbox } from '@wya/vc';

const fruitsOptions = ['Apple', 'Bananer', 'mongo'];
export default {
	name: 'runtime-group',
	components: {
		'vc-checkbox': Checkbox,
		'vc-checkbox-group': Checkbox.Group,
	},
	data() {
		return {
			indeterminate: true,
			checkAll: false,
			fruits: fruitsOptions,
			checkedFruits: ['Apple']
		}
	},
	methods: {
		handleCheckAll(val) {
			this.checkedFruits = val ? fruitsOptions : [];
			this.indeterminate = false;
		},
		handleChange(data) {
			const checkedCount = data.length;
			this.checkAll = checkedCount === this.fruits.length;
        	this.indeterminate = checkedCount > 0 && checkedCount < this.fruits.length;
		}
	}
}
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 只在单独使用时有效。可以使用 v-model 双向绑定数据 | `Boolean` | - | `false`
label | 只在组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中 | `String`、`Number`、`Boolean` | - | -
disabled | 是否禁用当前项 | `Boolean` | - | `false`
indeterminate | 设置 `indeterminate` 状态，只负责样式控制 | `Boolean` | - | `false`
true-value | 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用，group模式下无效 | `String`、`Number`、`Boolean` | - | `true`
false-value | 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用，group模式下无效 | `String`、`Number`、`Boolean` | - | `false`
name | 原生 `name` 属性 | `String` | -

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
change | 只在单独使用时有效。在选项状态发生改变时触发，通过修改外部的数据改变时不会触发 | `(value: Boolean) => void 0` | `value`：当前checkbox是否被选中


### Group 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 指定选中项目的集合，可以使用 v-model 双向绑定数据 | `Array` | - | - | []

### Group 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
change | 在选项状态发生改变时触发。通过修改外部的数据改变时不会触发 | `(value: Array) => void 0` | `value`：已选中的数组

### Group 属性 TODO
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
min | 可被勾选的 checkbox 的最小数量 | `Number` | - | -
max | 可被勾选的 checkbox 的最大数量 | `Number` | - | -
disabled | 是否禁用 | `Boolean` | - | `false`
