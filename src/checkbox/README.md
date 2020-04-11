## 多选框（Checkbox）

多选框

### 何时使用

- 在一组可选项中进行多项选择时
- 单独使用可以表示两种状态之间的切换，和 switch 类似。区别在于切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合

### 基础用法

简单的checkbox

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

使用`disabled`禁用checkbox

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

使用checkbox组可方便地从数组生成checkbox

:::RUNTIME
```html
<template>
	<div>
		<vc-checkbox-group v-model="checkedFruits">
			<vc-checkbox 
				v-for="friut in fruits"
				:key="friut"
				:label="friut" 
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

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

:::RUNTIME
```html
<template>
	<div>
		<div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
			<vc-checkbox
				:indeterminate="indeterminate"
				:value="checkAll"
				@click.native="handleCheckAll"
			>
				全选
			</vc-checkbox>
		</div>
		<vc-checkbox-group v-model="checkedFruits" @change="handleChange">
			<vc-checkbox 
				v-for="friut in fruits"
				:key="friut"
				:label="friut" 
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
			indeterminate: true,
			checkAll: false,
			fruits: ['Apple', 'Bananer', 'mongo'],
			checkedFruits: ['Apple']
		}
	},
	methods: {
		handleCheckAll() {
			if (this.indeterminate) {
				this.checkAll = false;
			} else {
				this.checkAll = !this.checkAll;
			}
			this.indeterminate = false;

			if (this.checkAll) {
				this.checkedFruits = this.fruits;
			} else {
				this.checkAllGroup = [];
			}
		},
		handleChange(data) {
			if (data.length === 3) {
				this.indeterminate = false;
				this.checkAll = true;
			} else if (data.length > 0) {
				this.indeterminate = true;
				this.checkAll = false;
			} else {
				this.indeterminate = false;
				this.checkAll = false;
			}
		}
	}
}
</script>
```
:::

## API

#### Checkbox 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 只在单独使用时有效。可以使用 v-model 双向绑定数据 | Boolean | - | false
label | 只在组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中 | String, Number, Boolean | - | -
disabled | 是否禁用当前项 | Boolean | - | false
indeterminate | 设置 indeterminate 状态，只负责样式控制 | Boolean | - | false
true-value | 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 | String, Number, Boolean | - | true
false-value | 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 | String, Number, Boolean | - | false

#### Checkbox 事件

事件名 | 说明 | 参数 | 返回值
---|---|---|---
change | 只在单独使用时有效。在选项状态发生改变时触发，通过修改外部的数据改变时不会触发 | `value: Boolean` | -

#### Group 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 指定选中项目的集合，可以使用 v-model 双向绑定数据 | Array | []

#### Group 事件

事件名 | 说明 | 参数 | 返回值
---|---|---|---
change | 在选项状态发生改变时触发，返回已选中的数组。通过修改外部的数据改变时不会触发	 | `value: Array` | -
