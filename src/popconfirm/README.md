## 气泡确认框（Popconfirm）
点击元素，弹出气泡式的确认框

### 何时使用
- 目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。
- 和弹出的全屏居中`Modal`对话框相比，交互形式更轻量。

### 基础用法
简单的用法。

:::RUNTIME
```html
<template>
	<vc-popconfirm
		title="你确定要删除?"
		type="warning"
		@ok="handleOk"
		@cancel="handleCancel"
	>
		<a href="javascript:" style="color: #5495f6;">删除</a>
	</vc-popconfirm>
</template>
<script>
import { Popconfirm, Message } from '@wya/vc';

export default {
	name: 'runtime-basic',
	components: {
		'vc-popconfirm': Popconfirm
	},
	methods: {
		handleOk() {
			Message.success('确定删除');
		},
		handleCancel() {
			Message.warning('取消删除');
		}
	}
}
</script>
```
:::

### 自定义按钮文字
使用`okText`和`cancelText`自定义按钮文字。

:::RUNTIME
```html
<template>
	<vc-popconfirm
		title="Are you sure to delete this task?"
		type="warning"
		ok-text="Yes"
		cancel-text="No"
	>
		<a href="javascript:" style="color: #5495f6;">自定义按钮文字</a>
	</vc-popconfirm>
</template>
<script>
import { Popconfirm, Message } from '@wya/vc';

export default {
	name: 'runtime-basic',
	components: {
		'vc-popconfirm': Popconfirm
	}
}
</script>
```
:::

### 气泡框弹出位置
可通过`placement`控制气泡框弹出位置，可选位置有12个，默认值为`top`，即从触发元素的上方弹出。

:::RUNTIME
```html
<template>
	<div class="runtime-placement">
		<div style="margin-left: 108px;">
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="top-left"
			>
				<vc-button>top-left</vc-button>
			</vc-popconfirm>
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="top"
			>
				<vc-button>top</vc-button>
			</vc-popconfirm>
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="top-right"
			>
				<vc-button>top-right</vc-button>
			</vc-popconfirm>
		</div>
		<div>
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="left-top"
			>
				<vc-button>left-top</vc-button>
			</vc-popconfirm>
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="right-top"
				style="margin-left: 326px;"
			>
				<vc-button>right-top</vc-button>
			</vc-popconfirm>
		</div>
		<div>
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="left"
			>
				<vc-button>left</vc-button>
			</vc-popconfirm>
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="right"
				style="margin-left: 326px;"
			>
				<vc-button>right</vc-button>
			</vc-popconfirm>
		</div>
		<div>
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="left-bottom"
			>
				<vc-button>left-bottom</vc-button>
			</vc-popconfirm>
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="right-bottom"
				style="margin-left: 326px;"
			>
				<vc-button>right-bottom</vc-button>
			</vc-popconfirm>
		</div>
		<div style="margin-left: 108px;">
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="bottom-left"
			>
				<vc-button>bottom-left</vc-button>
			</vc-popconfirm>
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="bottom"
			>
				<vc-button>bottom</vc-button>
			</vc-popconfirm>
			<vc-popconfirm
				title="Are you sure to delete this task?"
				type="warning"
				ok-text="Yes"
				cancel-text="No"
				placement="bottom-right"
			>
				<vc-button>bottom-right</vc-button>
			</vc-popconfirm>
		</div>
	</div>
</template>
<script>
import { Popconfirm, Button } from '@wya/vc';

export default {
	name: 'runtime-placement',
	components: {
		'vc-popconfirm': Popconfirm,
		'vc-button': Button
	}
}
</script>
<style>
.runtime-placement {
	font-size: 0px;
}
.runtime-placement .vc-btn {
	margin: 2px;
	width: 106px;
}
</style>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
visible | 是否弹出 | `Boolean` | - | `false`
trigger | 触发的行为 | `String` | `hover`、`click`、`focus` | `click`
title | 气泡框的标题 | `String` | - | -
content | 气泡框的标题 | `String` | - | -
okText | 确定按钮的文字 | `String` | - | `确定`
cancelText | 取消按钮的文字 | `String` | - | `取消`
okType | 确定按钮的样式类型（其他值参考`button`的`type`） | `String` | `default`、`primary`、`text`、`success`、`error`、`warning` | `primary`
cancelType | 确定按钮的样式类型（其他值参考`button`的`type`） | `String` | `default`、`primary`、`text`、`success`、`error`、`warning` | `default`
type | 类型 | `String` | `warn`、`success`、`info`、`error` | `warn`
width | 气泡框的宽度，最小`218px`, 只需传数字，`px`已在内部添加 | `String`、`Number` | - | -
renderTitle | `title` 自定义 | `function` | - | `(h, props, parent) => (<div>{props.title}</div>)`
renderContent | `content` 自定义 | `function` | - | `(h, props, parent) => (<div>{props.content}</div>)`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
ok | 点击确定触发, 配合Promise触发loading效果 | `(e, callback) => Promise` | 
cancel | 点击取消触发 | `(e: Event) => void 0` | `e`：事件对象
visible-change | 显示状态改变 | `(visible: Boolean) => void 0` | `visible`：显示状态
close | 关闭时触发 | - | - 
ready | 气泡框出来时触发 | - | - 

### Slot
属性 | 说明
---|---
default | 触发气泡框弹出的插槽
title | 气泡框标题
icon | 气泡框icon
content | 气泡框内容
