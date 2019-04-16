## [Demo Basic](https://wya-team.github.io/wya-vc/dist/__tpl__/basic.html)
## 功能
步进器

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 当前值 | `Number` 或 `String` | `0`
min | 最小值 | `Number` | `0`
max | 最大值 | `Number` | `99999`
step | 每次改变步数，可以为小数 | `Number` 或 `String` | `1`
disabled | 禁用 | `Boolean` | `false`
readOnly | 输入框只读 | `Boolean` | `false`
inputStyle | 输入框样式 | `Object` | `{}`


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
input | 变化时回调函数 | `value` | 
add | 自定义 加 的方法 |  | 
minus | 自定义 减 的方法 |  | 

#### Slot

属性 | 说明
---|---
- | -


## 基础用法

```jsx
<stepper 
	v-model="value"
/>
```