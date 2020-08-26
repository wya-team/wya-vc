## [Demo Basic](https://wya-team.github.io/wya-vc/dist/date-picker/mobile-basic.html)
## 功能
移动端日期选择器

## API

#### 属性


- `vcm-date-picker`

属性 | 说明 | 类型 | 默认值
---|---|---|---
loadData | 异步加载数据函数 | `Function` | -
extra | 占位符 | `String` | -
formatter | 格式化 | `Function` | -

- `vcm-date-picke-view`

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 返回值(v-model) | `Date` | -
mode | 日期选择器类型['datetime', 'date', 'time', 'quarter'] | `String` | -
minDate | 最小日期 | `Date` | new Date('1990')
maxDate | 最大日期 | `Date` | new Date('2020')

- `vcm-date-picker`

属性 | 说明 | 类型 | 默认值
---|---|---|---
change | 组件关闭时候触发出来的一个事件，返回值为当前选中的值以及每一列的数据 | `function` | -
ok | - | `function` | -
cancel | - | `function` | -


- `vcm-date-picke-view`

属性 | 说明 | 类型 | 默认值
---|---|---|---
change | - | `function` | -
picker-change | - | `function` | -

```
// 方法
MDatePicker.open({
	...,
	onOk: () => {},
	onCancel: () => {},
});

// 组件
`vcm-date-picker`
`vcm-date-picker-view` // api同picker
```

## 基础用法

```
<template>
	<div class="vcm-date-picker-basic">
		<vcm-date-picker
			v-model="value"
			mode="datetime"
		/>
		<vcm-date-picker
			v-model="value"
			mode="time"
		>
			<h2 slot-scope="it">
				{{ it.label }}
			</h2>
		</vcm-date-picker>
		<vcm-date-picker
			v-model="value"
			mode="date"
		/>
		<div @click="handleClick">点击直接调用</div>
	</div>
</template>
<script>
import { MDatePicker, MToast } from '@wya/vc';
import { cloneDeep } from 'lodash';

export default {
	name: "vcm-date-picker-basic",
	components: {
		'vcm-date-picker': MDatePicker
	},
	data() {
		return {
			show: false,
			value: new Date()
		};
	},
	computed: {
	},
	mounted() {

	},
	methods: {
		handleClick() {
			MDatePicker.popup({
				mode: 'datetime'
			}).then((res) => {
				MToast.info(res.label.join('-'));
			}).catch(() => {
			});
		}
	},
};

</script>

<style>
.vcm-date-picker-basic div {
	display: flex;
	height: 44px;
	background: white;
	border-bottom: 1px solid #e7e7e7;
	justify-content: center;
	align-items: center;
}
</style>

```