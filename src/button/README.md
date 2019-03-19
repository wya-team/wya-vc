## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/button/basic.html)
## 功能
按钮

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
type | 按钮的样式选择:`default`、`primary`、`text`、`success`、`error`、`warning` |`String` | `default`
default | 禁止点击 | `Boolean` | `false`
circle | 按钮是否圆角 | `Boolean` | `false`
size | 按钮大小:`large`、`medium`、`small` | `String` | `medium`
icon | 按钮内的图标 | `String` | -
long | 长按钮 | `Boolean` | `false`
wait | 阻止重复点击 | `Number` | 250

#### Group 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
size | 调节按钮组件的大小:`large`、`medium`、`small` | `String` | `medium`
circle | 按钮是否圆角 | `Boolean` | `false`
vertical | 按钮纵向排列 | `Boolean` | `false`

## 基础用法

```html
// 样式选择
<vc-button type="default">default</vc-button>
<vc-button type="primary">primary</vc-button>
<vc-button type="text">text</vc-button>
<vc-button type="success">success</vc-button>
<vc-button type="error">error</vc-button>
<vc-button type="warning">warning</vc-button>

// 禁止点击
<vc-button disabled type="primary">primary</vc-button>

// 圆角
<vc-button type="default" circle>default</vc-button>
<vc-button type="primary" circle>primary</vc-button>
<vc-button type="success" circle>success</vc-button>
<vc-button type="error" circle>error</vc-button>
<vc-button type="warning" circle>warning</vc-button>
<vc-button disabled type="primary" circle>Primary</vc-button>

// 按钮大小
<vc-button size="large">large</vc-button>
<vc-button size="medium">default</vc-button>
<vc-button size="small">large</vc-button>

// 按钮图标
<vc-button size="large" icon="up">large</vc-button>
<vc-button icon="up"/>
```
- `button-group`

```html
<vc-button-group>
    <vc-button>text</vc-button>
    <vc-button>text</vc-button>
</vc-button-group>

// 控制大小
<vc-button-group size="large">
    <vc-button>text</vc-button>
    <vc-button>text</vc-button>
    <vc-button>text</vc-button>
</vc-button-group>

// 圆角
<vc-button-group circle>
    <vc-button>text</vc-button>
    <vc-button>text</vc-button>
    <vc-button>text</vc-button>
</vc-button-group>
// 纵向排列
<vc-button-group vertical>
    <vc-button>text</vc-button>
    <vc-button>text</vc-button>
    <vc-button>text</vc-button>
</vc-button-group>
```