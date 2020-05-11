## 时间选择器（TimePicker）
当用户需要选取一个时间，可以点击标准输入框，弹出时间面板进行选择。

### 基础用法
点击 TimePicker，然后可以在浮层中选择某一时间。

:::RUNTIME
```html
<template>
	<div class="">
		<vc-time-picker 
			v-model="time"
			clearable
			placeholder="Select time" 
			style="width: 168px"
		/>
	</div>
</template>
<script>
import { TimePicker } from '@wya/vc';

export default {
	components: {
        "vc-time-picker": TimePicker
    },
    data() {
		return {
			time: '',
		};
	},
};
</script>
<style>
</style>
```
:::

### 带确认栏
添加`confirm`属性后弹出的面板带有操作栏，点击确定按钮后才将选中的时间绑定。

:::RUNTIME
```html
<template>
	<div class="">
		<vc-time-picker 
			v-model="time1"
			confirm
			placeholder="Select time" 
			style="width: 168px"
            @ok="handleOk"
            @clear="handleClear"
		/>
	</div>
</template>
<script>
import { TimePicker } from '@wya/vc';

export default {
	components: {
        "vc-time-picker": TimePicker
    },
    data() {
		return {
			time: '',
		};
    },
    methods: {
        handleOk(date) {
            console.log(date)
        },
        handleClear(val) {
            console.log(val)
        }
    }
};
</script>
<style>
</style>
```
:::

### 不可选时间
通过`disabled-hours`、`disabled-minutes`、`disabled-seconds`分别禁用时分秒。

:::RUNTIME
```html
<template>
	<div class="">
		<vc-time-picker 
			v-model="time"
			:disabled-hours="[1,5,10]"
			:disabled-minutes="[0,10,20]"
			:disabled-seconds="[1,10,20]"
			clearable
			placeholder="Select time" 
			style="width: 168px"
		/>
	</div>
</template>
<script>
import { TimePicker } from '@wya/vc';

export default {
	components: {
        "vc-time-picker": TimePicker
    },
    data() {
		return {
			time: '',
		};
	},
};
</script>
<style>
</style>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
mode | 显示类型 | `String` | `time`、`timerange` | time
value | 时间 | `Date`、`String` | - | -
format | 展示的日期格式 | `String` |  | -
steps | 下拉列表的时间间隔，数组的三项分别对应小时、分钟、秒。例如设置为 [1, 15] 时，分钟会显示：00、15、30、45。 | `Array` | - | []
placement | 时间选择器出现的位置，2.12.0 版本开始支持自动识别 | `String` | `top`、`top-start`、`top-end`、`bottom`、`bottom-start`、`bottom-end`、`left`、`left-start`、`left-end`、`right`、`right-start`、`right-end` | bottom-start
placeholder | 占位文本 | `String` | - | 空
confirm | 是否显示底部控制栏 | `Boolean` | - | `false`
open | 手动控制时间选择器的显示状态，`true` 为显示，`false` 为收起。使用该属性后，选择器不会主动关闭。建议配合 slot 及 confirm 和相关事件一起使用 | `Boolean` | - | null
size | 尺寸 | `String` | `large`、`small`、`default` | -
disabled | 是否禁用选择器 | `Boolean` | - | `false`
clearable | 是否显示清除按钮 | `Boolean` | - | `true`
readonly | 完全只读，开启后不会弹出选择器，只在没有设置 open 属性下生效 | `Boolean` | - | `false`
portal | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | `Boolean` | - | `true`
element-id | 给表单元素设置 `id`，详见 Form 用法。 | `String` | - | -
separator | 两个日期间的分隔符 | `String` | - |  - 

> type -> mode

### 事件
事件名 | 说明 | 参数 | 返回值
---|---|---|---
change | 点击面板时的回调 | `(date: Date | Array) => void 0` | `date`: 当前日期值
open-change | 弹出浮层和关闭浮层时触发 | `(visible: Boolean) => void 0` | `visible`：当前面板显示状态
ok | 点击确定按钮时触发	 | - | -
clear | 在清空日期时触发 | - | -

