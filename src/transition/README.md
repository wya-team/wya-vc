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


#### 事件

- 同`transtion`组件


## 基础用法

```jsx
<vc-transition-fade>
	<div v-show="visible"></div>
</vc-transition-fade>

```