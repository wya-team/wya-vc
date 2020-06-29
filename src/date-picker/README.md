## 日期选择器（DatePicker）
选择日期的控件

### 选择日
以「日」为基本单位，基础的日期选择控件

:::RUNTIME
```html
<template>
	<div class="v-data-picker-basic">
		<vc-date-picker
			v-model="value"
			:options="options"
			:start-date="new Date('2019', '10', '11')"
			:type="date"
			clearable
			format="YYYY-MM-DD"
			placeholder="Select date"
		/>
	</div>
</template>
<script>
import { DatePicker } from '@wya/vc';

export default {
	components: {
		'vc-date-picker': DatePicker,
	},
	data() {
		return  {
			value: new Date()
		}
	},
};
</script>
```
:::

### 其他日期单位
可以选择年、月、季度

:::RUNTIME
```html
<template>
	<div class="v-data-picker-basic">
		<h2>年</h2>
		<vc-date-picker
			v-model="year"
			type="year"
			clearable
			confirm
			placeholder="Select date"
			style="width: 200px"
		/>
		<h2>月</h2>
		<vc-date-picker
			v-model="month"
			type="month"
			clearable
			placeholder="Select date"
			style="width: 200px"
		/>
		<h2>季度</h2>
		<vc-date-picker
			v-model="quarter"
			type="quarter"
			clearable
			confirm
			placeholder="Select date"
			style="width: 200px"
		/>
		<h2>多个日期</h2>
		<vc-date-picker
			v-model="values"
			type="data"
			multiple
			clearable
			confirm
			placeholder="Select date"
			style="width: 200px"
		/>
	</div>
</template>
<script>
import { DatePicker } from '@wya/vc';

export default {
	components: {
		'vc-date-picker': DatePicker,
	},
	data() {
		return  {
			value: new Date(),
			year: '',
			month: '',
			quarter: '',
			values: []
		}
	},
};
</script>
```
:::

### 选择日期范围
可以选择时间范围

:::RUNTIME
```html
<template>
	<div class="v-data-picker-basic">
		<h2>日期范围</h2>
		<vc-date-picker
			v-model="daterange"
			type="daterange"
			clearable
			placeholder="Select date"
			style="width: 250px"
		/>
		<h2>日期时间范围</h2>
		<vc-date-picker
			v-model="datetimerange"
			type="datetimerange"
			multiple
			clearable
			confirm
			placeholder="Select date"
			style="width: 200px"
		/>
		<h2>月份范围</h2>
		<vc-date-picker
			v-model="monthrange"
			type="monthrange"
			separator="到"
			clearable
			placeholder="Select date"
			style="width: 250px"
		/>
		<h2>季度范围</h2>
		<vc-date-picker
			v-model="quarterrange"
			type="quarterrange"
			clearable
			placeholder="Select date"
			style="width: 250px"
		/>
	</div>
</template>
<script>
import { DatePicker } from '@wya/vc';

export default {
	components: {
		'vc-date-picker': DatePicker,
	},
	data() {
		return  {
			daterange: "",
			datetimerange: "",
			quarterrange: "",
			monthrange: ""
		}
	},
};
</script>
```
:::

### 设置可选的时间范围

:::RUNTIME
```html
<template>
	<div class="v-data-picker-basic">
		<vc-date-picker
			v-model="value"
			:start-date="new Date()"
			:options="disableDate"
			:time-picker-options="timeOpts"
			type="datetime"
			format="YYYY-MM-DD HH:mm:ss"
			placeholder="请选择"
		/>
	</div>
</template>
<script>
import { DatePicker } from '@wya/vc';

export default {
	components: {
		'vc-date-picker': DatePicker,
	},
	data() {
		return  {
			value: "",
			disableDate: {
				disabledDate(date) {
					return date && (date.valueOf() < Date.now() - 86400000 || date.valueOf() > Date.now() + 864000000);
				},
			},
			timeOpts: {
				disabledHours: [],
				disabledMinutes: [],
				disabledTime(date) {
					return date && (date.valueOf() < Date.now() || date.valueOf() > Date.now() + 864000000);
				}
			},
		}
	},
};
</script>
```
:::

### 移动端日期时间选择

:::RUNTIME
```html
<template>
	<div class="v-data-picker-basic">
		<h2>日期时间</h2>
		<vcm-date-picker
			v-model="value"
			:arrow="false"
			mode="datetime"
		>
			<template #default="it">
				<h2>
					{{ it.label }}
				</h2>
			</template>
		</vcm-date-picker>
		<h2>年月</h2>
		<vcm-date-picker
			v-model="yearmonth"
			:arrow="false"
			mode="yearmonth"
		>
			<template #default="it">
				<h2>
					{{ it.label }}
				</h2>
			</template>
		</vcm-date-picker>
		<h2>时分</h2>
		<vcm-date-picker
			v-model="time"
			:arrow="false"
			mode="time"
		>
			<template #default="it">
				<h2>
					{{ it.label }}
				</h2>
			</template>
		</vcm-date-picker>
	</div>
</template>
<script>
import { MDatePicker } from '@wya/vc';
export default {
	components: {
		'vcm-date-picker': MDatePicker,
	},
	data() {
		return  {
			value: new Date(),
			yearmonth: new Date(),
			time: undefined
		}
	},
};
</script>
```
:::

### API

### 基础属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
type | 显示类型 | `String` | `date`、`daterange`、`datetime`、`datetimerange`、`year`、`month`、`quarter`、`quarterrange`、`monthrange` | `date`
value | 日期，可以是 JavaScript 的 `Date`，例如 new Date()，也可以是标准的日期格式，注意：`value` 使用 v-model 时，值是 `Date` 类型，可以配合 @change 使用 | `Date` | - | -
format | 展示的日期格式 | `Date` | date, daterange(YYYY-MM-DD), datetime, datetimerange(YYYY-MM-DD, HH:mm:ss), year(YYYY), month(YYYY-MM) | -
placement | 日期选择器出现的位置 | `String` |  `top` `top-start` `top-end` `bottom` `bottom-start` `bottom-end` `left` `left-start` `left-end` `right` `right-start` `right-end`，2.12.0 版本开始支持自动识别 | bottom-start
placeholder | 占位文本 | `String` | - | - 
options | 选择器额外配置，比如不可选日期与快捷选项，具体项详见下表 | `Object` | - | -
split-panels | 开启后，左右面板不联动，仅在 daterange 和 datetimerange 下可用。 | `Boolean` | - | `true`
multiple | 开启后，可以选择多个日期，仅在 `date` 下可用。 | `Boolean` | - | `false`
show-week-numbers（TODO） | 开启后，可以显示星期数。 | `Boolean` | - |`false`
start-date | 设置默认显示的起始日期。 | `Date` | - | -
confirm | 是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭 | `Boolean` | - | `false`
open | 手动控制日期选择器的显示状态，`true` 为显示，`false` 为收起。使用该属性后，选择器不会主动关闭。建议配合 `slot` 及 `confirm` 和相关事件一起使用 | `Boolean` | - | -
disabled | 是否禁用选择器 | `Boolean` | - | `false`
clearable | 是否显示清除按钮 | `Boolean` | - | `true`
portal | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | `Boolean` | - | `true`
time-picker-options | 可以在 mode 为 `datetime` 和 `datetimerange` 下，配置 `TimePicker` 的属性，比如时间间隔 `:time-picker-options="{steps: [1, 10, 10]}"` | `Object` | - |{}
separator | 两个日期间的分隔符 | `String` | - |`-`	
change-on-select | 选中即触发`change`时间 | `Boolean` | - |`false`

### Options
参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
disabledDate | 设置日期禁用状态，参数为当前日期，要求返回`Boolean` | `Function`| ---
shortcuts | 设置快捷选项，每项内容`{text: String, value: Function, onClick: Function}`，`text`显示的文案，`value`返回指定的日期，如需自己控制逻辑，可不设置，并使用 `onClick` 回调 | `Array` | ---

### timePickerOptions
参数 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
disabledTime | 设置时分秒禁用状态，参数为当前日期，要求返回`Boolean` | `Function`| - | -

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
ok | `confirm`模式下点击确定按钮的回调 | `(date: Date | Array) => void 0` | `date`: 选中的日期值
clear | 点击清除按钮的回调 | `(date: Date | Array) => void 0` | `date`: 当前日期值
change | 点击面板时的回调 | `(date: Date | Array) => void 0` | `date`: 当前日期值
visible-change | 面板显示隐藏时的回调 | `(visible: Boolean) => void 0` | `visible`：当前面板显示状态
before-ok | 点击确定前回调函数，函数返回一个`Promise`, `reject`会中断函数执行 | `(date: Date | Array) => Promise` | - | -
before-clear | 点击取消前回调函数，函数返回一个`Promise`, `reject`会中断函数执行 | `(date: Date | Array) => Promise` | - | -

### Slot
属性 | 说明
---|---
default | 自定义选择器的显示内容，建议与 open 等参数一起使用

### Feature
+ 农历
+ 快捷操作
+ show-week-numbers

### 移动端（vcm-date-picker）属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
loadData | 异步加载数据函数 | `Function` | - |-
extra | 占位符 | `String` | - | -
formatter | 格式化 | `Function` | - | -

### 移动端（vcm-date-picke-view）属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 返回值(v-model) | `Date` | - | -
mode | 日期选择器类型 | `String` | `datetime` `date` `time` |-
minDate | 最小日期 | `Date` | - | new Date('1990')
maxDate | 最大日期 | `Date` | - | new Date('2020')

### 移动端（vcm-date-picker）事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
change | 组件关闭时候触发出来的一个事件，返回值为当前选中的值以及每一列的数据 | - | -
ok | 点击确定触发 | - | -
cancel | 点击取消触发 | - | -

### 移动端（vcm-date-picker-view）事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
change | 当前值改变触发 | - | -
picker-change | 绑定的值改变触发 | - | -
