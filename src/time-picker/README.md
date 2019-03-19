## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/time-picker/basic.html)
## 功能
 时间选择器

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
type | 显示类型，可选值为 `time`、`timerange` | String | time
value |                             时间，可以是 JavaScript 的 Date，例如 **new Date()**，也可以是标准的时间格式，点击右边查看                            注意：value 使用 v-model 时，值是 Date 类型，可以配合 @on-change 使用                         | [ Date](javascript:void(0)) | -
format | 展示的时间格式 | [ Date](javascript:void(0)) | HH:mm:ss
steps | 下拉列表的时间间隔，数组的三项分别对应小时、分钟、秒。例如设置为 [1, 15] 时，分钟会显示：00、15、30、45。 | Array | []
placement | 时间选择器出现的位置，可选值为`top``top-start``top-end``bottom``bottom-start``bottom-end``left``left-start``left-end``right``right-start``right-end`，2.12.0 版本开始支持自动识别 | String | bottom-start
placeholder | 占位文本 | String | 空
confirm | 是否显示底部控制栏 | Boolean | false
open | 手动控制时间选择器的显示状态，true 为显示，false 为收起。使用该属性后，选择器不会主动关闭。建议配合 slot 及 confirm 和相关事件一起使用 | Boolean | null
size | 尺寸，可选值为`large`、`small`、`default`或者不设置 | String | -
disabled | 是否禁用选择器 | Boolean | false
clearable | 是否显示清除按钮 | Boolean | true
readonly | 完全只读，开启后不会弹出选择器，只在没有设置 open 属性下生效 | Boolean | false
editable | 文本框是否可以输入，只在没有使用 slot 时有效 | Boolean | true
transfer | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | Boolean | false
element-id | 给表单元素设置 `id`，详见 Form 用法。 | String | -
separator | 两个日期间的分隔符 | String |  - 


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
change | 时间发生变化时触发	 | `date`|---
open-change | 弹出浮层和关闭浮层时触发 | `value: Boolean`|---
ok | 点击确定按钮时触发	 | `-` |---
clear | 在清空日期时触发		 | `-` |---

#### Slot

属性 | 说明
---|---
- | 自定义选择器的显示内容，建议与 open 等参数一起使用，详见示例




## 基础用法

```jsx

```