## [Demo Basic](https://wya-team.github.io/wya-vc/dist/input-number/basic.html)
## 功能
数字输入框

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
max | 最大值 | Number | Infinity
min | 最小值 | Number | -Infinity
value | 当前值，可以使用 v-model 双向绑定数据 | Number | 1
step | 每次改变的步伐，可以是小数 | Number | 1
size | 输入框尺寸，可选值为`large`、`small`、`default`或者不填 | String | -
disabled | 设置禁用状态 | Boolean | false
placeholder | 占位文本 | String | -
formatter | 指定输入框展示值的格式 | Function | -
parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | Function | -
readonly | 是否设置为只读 | Boolean | false
editable | 是否可编辑 | Boolean | true
precision | 数值精度 | Number | -
element-id | 给表单元素设置 `id`，详见 Form 用法。 | String | -
active-change | 是否实时响应数据，设置为 false 时，只会在失焦时更改数据 | Boolean | true


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
change | 数据改变时触发 | `any` | -
focus | 输入框聚焦是触发 | - | -
blur | 输入框失焦时 | - | -
enter | 按下回车键是触发 | - | -


## 基础用法

```vue
<template>
	<vc-input-number :max="10" :min="1" v-model="value1" />
</template>
<script>
import InputNumber from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-input-number': InputNumber
	},
	data() {
		return {
			value1: 1
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>

```