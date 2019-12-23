## [Demo Basic](https://wya-team.github.io/wya-vc/dist/date-picker/basic.html)
## 功能
日期选择器

## Feature
+ 农历
+ 快捷操作
+ show-week-numbers

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
属性	说明	类型	默认值
type | 显示类型，可选值为 `date`、`daterange`、`datetime`、`datetimerange`、`year`、`month`、`quarter` | String | date
value | 日期，可以是 JavaScript 的 Date，例如 new Date()，也可以是标准的日期格式，点击右边查看
注意：value 使用 v-model 时，值是 Date 类型，可以配合 @change 使用 |  Date | -
format | 展示的日期格式 |  Date | date, daterange(yyyy-MM-dd), datetime, datetimerange(yyyy-MM-dd, HH:mm:ss), year(yyyy), month(yyyy-MM)
placement | 日期选择器出现的位置，可选值为 `top` `top-start` `top-end` `bottom` `bottom-start` `bottom-end` `left` `left-start` `left-end` `right` `right-start` `right-end`，2.12.0 版本开始支持自动识别 | String | bottom-start
placeholder | 占位文本 | String | 空
options | 选择器额外配置，比如不可选日期与快捷选项，具体项详见下表 | Object | -
split-panels | 开启后，左右面板不联动，仅在 daterange 和 datetimerange 下可用。 | Boolean | false
multiple | 开启后，可以选择多个日期，仅在 `date` 下可用。 | Boolean | false
<!-- show-week-numbers | 开启后，可以显示星期数。 | Boolean | false -->
start-date | 设置默认显示的起始日期。 | Date | -
confirm | 是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭 | Boolean | false
open | 手动控制日期选择器的显示状态，true 为显示，false 为收起。使用该属性后，选择器不会主动关闭。建议配合 `slot` 及 `confirm` 和相关事件一起使用 | Boolean | null
disabled | 是否禁用选择器 | Boolean | false
clearable | 是否显示清除按钮 | Boolean | true
portal | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | Boolean | true
time-picker-options | 可以在 mode 为 `datetime` 和 `datetimerange` 下，配置 `TimePicker` 的属性，比如时间间隔 `:time-picker-options="{steps: [1, 10, 10]}"` | Object | {}
separator | 两个日期间的分隔符 | String | -	


> typpe -> mode 

#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
- | - | `any`|---

#### Slot

属性 | 说明
---|---
- | -



## 基础用法

```jsx

```