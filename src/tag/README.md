## [Demo Basic](https://wya-team.github.io/wya-vc/dist/tag/basic.html)
## 功能
标签

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
closable | 标签是否可以关闭 | Boolean | false
checkable | 标签是否可以选择 | Boolean | false
checked | 标签的选中状态 | Boolean | true
type | 标签的样式类型，可选值为 `border`、`dot` | String | default
color | 标签颜色，预设颜色值为`default`、`primary`、`success`、`warning`、`error`，你也可以自定义颜色值。 | String | default
name | 当前标签的名称，使用 v-for，并支持关闭时，会比较有用 | String  |  Number | -
fade | 是否在出现和消失时使用渐变的动画，动画时长可能会引起占位的闪烁 | Boolean | true


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
close | 关闭时触发 |  `event, name` | ---
change | 切换选中状态时触发	 |  `checked, name` | ---

## 基础用法

```jsx

```