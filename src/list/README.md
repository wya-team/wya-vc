## [Demo Basic](https://wya-team.github.io/wya-vc/dist/__tpl__/basic.html)
## 功能
List

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
labelWidth | `item`内`label`的宽度 | `string`  `number` | 无


#### Item属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
width | `item`内`label`的宽度,优先级高于`list`内的labelWidth | `string`  `number` | 无
label | label 内容 | `string` | 无
extra | 右边的内容 | `string` | 无
arrow | 右边有无箭头 | `boolean` | `false`
multipleLine | 多行 | `boolean` | `false`
to | 跳转的地址, 如果是带`http(s)`则采用`window.open`方式打开 | `string` `object` | 无
routeMethod | 跳转的方式（`push`, `replace`）,只在有`$router`的情况下生效 | `string` | `push`


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
- | - | `any`|---

#### Item Slot

属性 | 说明
---|---
label | label 内容
default | 右边内容（替代`extra`）


## 基础用法

```html
<div>
  <vc-list :label-width="100" style="margin: 20px 0;">
    <vc-list-item :arrow="false" label="姓名">
      <template #label="">
        <div/>
      </template>
      啦啦啦
    </vc-list-item>
    <vc-list-item :arrow="false" label="姓名">
      啦啦啦
    </vc-list-item>
    <vc-list-item :arrow="false" label="姓名">
      啦啦啦
    </vc-list-item>
  </vc-list>
  <vc-list-item :arrow="true" label="姓名">
    啦啦啦
  </vc-list-item>
</div>
```