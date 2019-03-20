## [Demo Basic](https://wya-team.github.io/wya-vc/dist/select/basic.html)
## 功能
Select 选择器

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 指定选中项目的 value 值，可以使用 v-model 双向绑定数据。单选时只接受 String 或 Number，多选时只接受 Array | String, Number, Array | 空
multiple | 是否支持多选 | Boolean | false
disabled | 是否禁用 | Boolean | false
clearable | 是否可以清空选项，只在单选时有效 | Boolean | false
filterable | 是否支持搜索 | Boolean | false
remote | 是否使用远程搜索 | Boolean | false
remote-method | 远程搜索的方法 | Function | -
loading | 当前是否正在远程搜索 | Boolean | false
loading-text | 远程搜索中的文字提示 | String | 加载中
label | 仅在 remote 模式下，初始化时使用。因为仅通过 value 无法得知选项的 label，需手动设置。 | String, Number, Array | 空
size | 选择框大小，可选值为`large`、`small`、`default`或者不填 | String | -
placeholder | 选择框默认文字 | String | 请选择
not-found-text | 当下拉列表为空时显示的内容 | String | 无匹配数据
label-in-value | 在返回选项时，是否将 label 和 value 一并返回，默认只返回 value | Boolean | false
placement | 弹窗的展开方向，可选值为 `top`、`bottom`、`top-start`、`bottom-start`、`top-end`、`bottom-end` | String | bottom-start
transfer | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | Boolean | false
element-id | 给表单元素设置 `id`，详见 Form 用法。 | String | -
transfer-class-name | 开启 transfer 时，给浮层添加额外的 class 名称 | String | -

#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
change | 选中的`Option`变化时触发，默认返回 value，如需返回 label，详见 label-in-value 属性	 | (value: String) | ---
query-change | 搜索词改变时触发 | (query: String) | ---
clear | 点击清空按钮时触发	 | - | -
open-change | 点击清空按钮时触发 | - | -

#### 方法

属性 | 说明 | 参数 | 返回值
---|---|---|---
setQuery | 设置搜索词，为空时清空，仅在 `filterable="true"` 时有效 | query: String | - 
clearSingleSelect | 清空单选项，仅在 `clearable="true"` 时有效 | - | - 

#### Option 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 选项值，默认根据此属性值进行筛选，必填 | String, Number | 无
label | 选项显示的内容，默认会读取 slot，无 slot 时，优先读取该 label 值，无 label 时，读取 value。当选中时，选择器会显示 label 为已选文案。大部分情况不需要配置此项，直接写入 slot 即可，在自定义选项时，该属性非常有用。 | String | -
disabled | 是否禁用当前项 | Boolean | false

#### Option Group属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
label | 分组的组名 | String | 无

## 基础用法

```vue
<template>
	<div>
		<vc-select 
			v-model="value" 
			clearable 
			style="width: 200px"
		>
			<!-- vc-loader处理该bug -->
			<i-option 
				v-for="item in cityList" 
				:value="item.value" 
				:key="item.value"
			>{{ item.label }}</i-option>
		</vc-select>

		<vc-select v-model="model7" style="width:200px">
			<vc-option-group label="Hot Cities">
				<i-option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</i-option>
			</vc-option-group>
			<vc-option-group label="Other Cities">
				<i-option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</i-option>
			</vc-option-group>
		</vc-select>
	</div>
</template>
<script>
import Select from '..';
import Option from '../option';
import OptionGroup from '../option-group';

export default {
	name: "vc-select-basic",
	components: {
		'vc-select': Select,
		'vc-option-group': OptionGroup,
		'i-option': Option,
	},
	data() {
		return {
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
			value: 'Sydney',
			cityList1: [
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
				}
			],
			cityList2: [
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
			model7: ''
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>

```