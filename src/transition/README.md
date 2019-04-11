## [Demo Basic](https://wya-team.github.io/wya-vc/dist/transition/basic.html)
## 功能
加强Transition组件

- `vc-transition-fade`
- `vc-transition-slide`
- `vc-transition-zoom`
- `vc-transition-scale`
- `vc-transition-collapse`

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
group | 是否使用`transition` | `Boolean` | false
duration | 进入/离开持续时间 | `Number|Object` | `{enter: 0.3, leave: 0.3}`
delay | 进入/离开延迟时间 | `Number|Object` | `{enter: 0.3, leave: 0.3}`
tag | 同`transition-group` tag | `String` | `span`
origin | 变换的初始位置, 可以用style代替, 更短~~ | `String` | -
styles | 转换期间应用的元素样式 | `Object` | `{}`


#### `vc-transition-slide`属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
mode | `left|right|down|up` | `String` | -

#### `vc-transition-scale`属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
mode | `both|part` | `String` | -

#### `vc-transition-zoom`属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
mode | `x|y|center` | `String` | -

#### 事件

- 同`transtion`组件


## 基础用法

> appear: boolean，是否在初始渲染时使用过渡。默认为 false。 所以如果想一出来就有动画, 可以设置appear为true

```jsx
<vc-transition-fade appear>
	<div v-show="visible"></div>
</vc-transition-fade>

```