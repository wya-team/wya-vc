## [Demo Basic](https://wya-team.github.io/wya-vc/dist/__tpl__/basic.html)
## 功能
验证类型的气泡弹框

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
title | 验证弹层的标题 | `string` | -
okText | 确定按钮的文字 | `string` | `确定`
cancelText | 取消按钮的文字 | `string` | `取消`
okType | 确定按钮的样式类型（其他值参考`button`的`type`） | `string` | `primary`
cancelType | 确定按钮的样式类型（其他值参考`button`的`type`） | `string` | `default`
type | 类型`warn` `success` `info` `error` | `string` | `warn`
其他属性请参考Popover

#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
ok | 点击确定按钮的回调 | - | - 
cancel | 点击取消按钮的回调 | - | - 

#### Slot

属性 | 说明
---|---
title | 弹层标题的插槽
icon | 弹层icon的插槽


## 基础用法

```jsx
<div style="padding: 200px">
	<vc-popconfirm
		title="Are you sure to delete this task?"
	>
		触发
	</vc-popconfirm>
</div>
```