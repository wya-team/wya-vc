## 选择器（Select）
下拉选择器

### 何时使用
- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 `Radio` 是更好的选择。

### 基本用法
- 适用广泛的基础单选; 单选时，`value` 只接受字符串和数字类型，多选时，只接受数组类型，组件会自动根据 `Option` 的 `value` 来返回选中的数据。
- 可以给 `Select` 添加 `style` 样式，比如宽度。

:::RUNTIME
```html
<template>
	<div class="v-select-basic">
		<vc-select v-model="city" style="width: 200px;" size="small">
			<vc-option
				v-for="(item, index) in cityList"
				:value="item.label"
				:key="index"
			>{{ item.label }}</vc-option>
		</vc-select>
		<span>{{ city }}</span>
	</div>
</template>
<script>
import { Select, Option } from '@wya/vc';

export default {
	components: {
		"vc-select": Select,
		"vc-option": Option
	},
	data() {
		return {
			city: "New York",
			cityList: [
				{
					value: '1',
					label: 'New York'
				},
				{
					value: '2',
					label: 'London'
				},
				{
					value: '3',
					label: 'Sydney'
				},
				{
					value: '4',
					label: 'Ottawa'
				},
				{
					value: '5',
					label: 'Paris'
				}]
		}
	},
};
</script>
```
:::

### 禁选状态和可清空单选
- 选择器不可用状态; 通过给`Select` 或 `Option` 添加 `disabled` 属性来设置全部禁选或单个禁选。
- 清空按钮，可将选择器清空为初始状态 `clearable`

:::RUNTIME
```html
<template>
	<div class="v-select-basic">
		<div>全部禁用</div>	
		<vc-select v-model="model1" disabled clearable style="width: 200px;">
			<vc-option
				v-for="(item, index) in options"
				:value="item.label"
				:key="index"
				:disabled="index == 1"
			>{{ item.label }}</vc-option>
		</vc-select>
		<br/>
		<br/>
		<div>选项禁用</div>	
		<vc-select v-model="model2" clearable style="width: 200px;">
			<vc-option
				v-for="(item, index) in options"
				:value="item.label"
				:key="index"
				:disabled="index == 1"
			>{{ item.label }}</vc-option>
		</vc-select>
		<span>{{ model2 }}</span>
	</div>
</template>
<script>
import { Select, Option } from '@wya/vc';
export default {
	components: {
		"vc-select": Select,
		"vc-option": Option
	},
	data() {
		return {
			model1: '',
			model2: '黄金糕',
			options: [
			{
				value: '选项1',
				label: '黄金糕'
			}, 
			{
				value: '选项2',
				label: '双皮奶'
			}, 
			{
				value: '选项3',
				label: '蚵仔煎'
			},
			{
				value: '选项4',
				label: '龙须面'
			}, 
			{
				value: '选项5',
				label: '北京烤鸭'
			}],
		}
	},
};
</script>
```
:::

### 多选
适用性较广的基础多选, 使用 `max` 属性。

:::RUNTIME
```html
<template>
	<div class="v-select-basic">
		<div>{{ model1 }}</div>
		<vc-select v-model="model1" :max="2" clearable style="width: 200px;">
			<vc-option
				v-for="(item, index) in cityList"
				:value="item.label"
				:key="index"
			>
				{{ item.label }}
			</vc-option>
		</vc-select>
	</div>
</template>
<script>
import { Select, Option } from '@wya/vc';
export default {
	components: {
		"vc-select": Select,
		"vc-option": Option
	},
	data() {
		return {
			model1: [],
			cityList: [
				{
					value: 'New York',
					label: 'New York'
				},
				{
					value: 'London',
					label: 'London'
				},
				{
					value: 'Sydney',
					label: 'Sydney'
				},
				{
					value: 'Ottawa',
					label: 'Ottawa'
				},
				{
					value: 'Paris',
					label: 'Paris'
				},
				{
					value: 'Canberra',
					label: 'Canberra'
				}
			],
		}
	},
};
</script>
```
:::

### 分组
使用`OptionGroup`可将选项进行分组。

:::RUNTIME
```html
<template>
	<div class="v-select-group">
		<vc-select v-model="value1" style="width: 200px" arrow>
			<vc-option-group label="Hot Cities">
				<vc-option v-for="item in cityList1" :value="item.label" :key="item.value">{{ item.label }}</vc-option>
			</vc-option-group>
			<vc-option-group label="Other Cities">
				<vc-option v-for="item in cityList2" :value="item.label" :key="item.value">{{ item.label }}</vc-option>
			</vc-option-group>
		</vc-select>
		<span>{{ value1 }}</span>
	</div>
</template>
<script>
import { Select, Option } from '@wya/vc';
export default {
	components: {
		"vc-select": Select,
		"vc-option": Option,
		"vc-option-group": Option.Group
	},
	data() {
		return {
			value1: '',
			cityList1: [
				{
					value: '1',
					label: 'New York'
				},
				{
					value: '2',
					label: 'London'
				},
				{
					value: '3',
					label: 'Sydney'
				}
			],
			cityList2: [
				{
					value: '4',
					label: 'Ottawa'
				},
				{
					value: '5',
					label: 'Paris'
				},
				{
					value: '6',
					label: 'Canberra'
			}
			]
		}
	},
};
</script>
```
:::

### 可搜索
可以利用搜索功能快速查找选项

:::RUNTIME
```html
<template>
	<div class="v-select-group">
		<vc-select v-model="value1" style="width: 200px" searchable searchPlaceholder="请输入搜索内容">
			<vc-option v-for="item in options" :key="item.value" :value="item.label"> {{ item.label }}</vc-option>
		</vc-select>
		<span>{{ value1 }}</span>
	</div>
</template>
<script>
import { Select, Option } from '@wya/vc';
export default {
	components: {
		"vc-select": Select,
		"vc-option": Option,
	},
	data() {
		return {
			value1: '',
			options: [
				{
					value: '选项1',
					label: '黄金糕'
				},
				{
					value: '选项2',
					label: '双皮奶'
				},
				{
					value: '选项3',
					label: '蚵仔煎'
				},
				{
					value: '选项4',
					label: '龙须面'
				},
				{
					value: '选项5',
					label: '北京烤鸭'
				}
			],
		}
	},
};
</script>
```
:::

## API

### Select props
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 指定选中项目的 value 值，可以使用 v-model 双向绑定数据。单选时只接受 String 或 Number，多选时只接受 Array | `String`、`Number`、`Array` | - | -
max | 是否支持多选，输入可支持多选的最大数量 | `Number` | - | 1
disabled | 是否禁用，设置在Select上全部禁选，在Option上单个禁选 | `Boolean` | - | `false`
clearable | 是否可以清空选项 | `Boolean` | - | `false`
searchable | 是否支持搜索 | `Boolean` | - | `false`
searchPlaceholder | 搜索的占位符 | `String` | - | -
load-data | 远程搜索的方法 | `Function` | - | -
label | 仅在 remote 模式下，初始化时使用。因为仅通过 value 无法得知选项的 label，需手动设置。 | `String`、`Number`、`Array` | - | -
placeholder | 选择框默认文字 | `String` | - | 请选择
not-found | 当下拉列表为空时显示的内容 | `String` | - | 无匹配数据
placement | 弹窗的展开方向 | `String` | `bottom`、`bottom-left`、`bottom-right`、`top`、 `top-left`、`top-right`、`right`、`right-top`、 `right-bottom` 、`left`、 `left-top` `left-bottom` | `bottom-left`
portal | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | `Boolean` | - | `true`
element-id | 给表单元素设置 `id`，详见 Form 用法。 | `String` | - | -
portalClassName | 外层类名 | `Object`、`String`、`Array` | - | -
readonly | 输入框只读 | `Boolean` | - | `false`
disabled | 是否禁用 | `Boolean` | - | `false` 
trigger | 触发的行为 | `String` | `hover`、`click`、`focus` | `click`
tag | 外层标签 | `String`| - | `div`
placement | 弹层的位置 | `String` | `top`、`left`、`right`、`bottom`、`bottom-left`、`bottom-right`、`top-left`、`top-right`、`right-top`、`right-bottom`、`left-top`、`left-bottom` | `bottom-left`
arrow | 弹层有无箭头 | `Boolean` | - | `false`
autoWidth | 弹层宽度自适应 | `Boolean` | - | `true`
extra | - | `String`、`Array` | - | -

### Option props
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|--|---|--- 
value | 选项值，默认根据此属性值进行筛选，必填 | `String` `Number` | - | -
label | 选项显示的内容，默认会读取 slot，无 slot 时，优先读取该 label 值，无 label 时，读取 value。当选中时，选择器会显示 label 为已选文案。大部分情况不需要配置此项，直接写入 slot 即可，在自定义选项时，该属性非常有用。 | `String` | - | -
disabled | 是否禁用当前项 | `Boolean` | - | `false`
filterable | 是否需要被过滤 | `Boolean` | - | `true`

### Select events
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
change | 选中的`Option`变化时触发，默认返回 value | `Function` | `(value: String）`
clear | 点击清空按钮时触发	 | - | -
visible-change | visible改变时回调 | - | `(visible:Boolean)` 
close | 关闭时回调 | - | - 
ready | 弹层出来时回调 | - | -

### Select methods
方法名 | 说明 | 参数
---|---|---
add | 添加单选项 | `value`：添加的选项的value值；`label`：添加的选项的label值
remove | 删除单选项 | `value`：删除的选项的value值

### Option Group props
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
label | 分组的组名 | `String` | - | -
