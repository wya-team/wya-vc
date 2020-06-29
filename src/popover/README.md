## 弹出框（Popover）
点击/鼠标移入元素，弹出气泡式的卡片浮层

### 何时使用
当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

### 基础用法
最简单的用法。

:::RUNTIME
```html
<template>
	<div>
		<vc-popover 
			:trigger="trigger" 
			content="这是一段内容,这是一段内容,这是一段内容,这是一段内容"
			trigger="hover"
		>
			<vc-button>
				hover 激活
			</vc-button>
		</vc-popover>
		<vc-popover 
			:trigger="trigger" 
			content="这是一段内容,这是一段内容,这是一段内容,这是一段内容"
			trigger="click"
		>
			<vc-button>
				click 激活
			</vc-button>
		</vc-popover>
		<vc-popover 
			:trigger="trigger" 
			content="这是一段内容,这是一段内容,这是一段内容,这是一段内容"
			trigger="focus"
		>
			<vc-button>
				focus 激活
			</vc-button>
		</vc-popover>
	</div>
</template>
<script>
import { Popover, Button } from '@wya/vc';

export default {
	name: "vc-popover-basic",
	components: {
		'vc-popover': Popover,
		'vc-button': Button,
	},
};
</script>
```
:::

### 定位
在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

:::RUNTIME
```html
<template>
	<div class="vc-popover-basic">
		<div class="top">
			<vc-popover 
				:get-popup-container="getPopupContainer"
				:trigger="trigger" 
				placement="top-left" 
				content="TopLeft"
				class=" g-m-lr-10"
			>
				<vc-button class="g-btn">
					TL
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						getPopupContainer
					</div>
				</template>
			</vc-popover>
			<vc-popover 
				:portal="false"
				:trigger="trigger" 
				placement="top" 
				content="Top"
				class=" g-m-lr-10"
			>
				<vc-button class="g-btn">
					Top
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						portal="false"
					</div>
				</template>
			</vc-popover>
			<vc-popover 
				:trigger="trigger" 
				placement="top-right" 
				content="TopRight"
				class=" g-m-lr-10"
			>
				<vc-button class="g-btn">
					TR
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						Body
					</div>
				</template>
			</vc-popover>
		</div>
		<div class="left">
			<vc-popover 
				:get-popup-container="getPopupContainer"
				:trigger="trigger" 
				placement="left-top" 
				content="LeftTop"
			>
				<vc-button class="g-btn g-m-tb-10">
					LT
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						getPopupContainer
					</div>
				</template>
			</vc-popover>
			<vc-popover 
				:portal="false"
				:trigger="trigger" 
				placement="left" 
				content="Left"
			>
				<vc-button class="g-btn g-m-tb-10">
					Left
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						portal="false"
					</div>
				</template>
			</vc-popover>
			<vc-popover 
				:trigger="trigger" 
				placement="left-bottom" 
				content="leftBottom"
			>
				<vc-button class="g-btn g-m-tb-10">
					LB
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						Body
					</div>
				</template>
			</vc-popover>
		</div>
		<div class="right">
			<vc-popover 
				:get-popup-container="getPopupContainer"
				:trigger="trigger" 
				placement="right-top" 
				content="RightTop"
			>
				<vc-button class="g-btn g-m-tb-10">
					RT
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						getPopupContainer
					</div>
				</template>
			</vc-popover>
			<vc-popover 
				:portal="false"
				:trigger="trigger" 
				placement="right" 
				content="Right"
			>
				<vc-button class="g-btn g-m-tb-10">
					Right
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						portal="false"
					</div>
				</template>
			</vc-popover>
			<vc-popover 
				:trigger="trigger" 
				placement="right-bottom" 
				content="RightBottom"
			>
				<vc-button class="g-btn g-m-tb-10">
					RB
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						Body
					</div>
				</template>
			</vc-popover>
		</div>
		<div class="bottom">
			<vc-popover 
				:get-popup-container="getPopupContainer"
				:trigger="trigger" 
				placement="bottom-left"
				content="BottomLeft"
				class=" g-m-lr-10"
			>
				<vc-button class="g-btn">
					BL
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						getPopupContainer
					</div>
				</template>
			</vc-popover>
			<vc-popover 
				:portal="false"
				:trigger="trigger" 
				placement="bottom" 
				content="Bottom"
				class=" g-m-lr-10"
			>
				<vc-button class="g-btn">
					Bottom
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						portal="false"
					</div>
				</template>
			</vc-popover>
			<vc-popover 
				:trigger="trigger" 
				placement="bottom-right"
				content="BottomRight"
				class=" g-m-lr-10"
			>
				<vc-button class="g-btn">
					BR
				</vc-button>
				<template #content>
					<div style="height: 100px; width: 200px">
						Body
					</div>
				</template>
			</vc-popover>
		</div>
	</div>
</template>
<script>
import { Popover, Button } from '@wya/vc';

export default {
	name: "vc-popover-basic",
	components: {
		'vcm-popover': Popover,
		'vcm-button': Button,
	},
};
</script>
<style>
.vc-popover-basic {
    width: 400px;
}

.vc-popover-basic .top {
	text-align: center;
}

.vc-popover-basic .left {
	float: left;
	width: 60px;
}

.vc-popover-basic .right {
	float: right;
	width: 60px;
}
.vc-popover-basic .bottom {
	clear: both;
	text-align: center;
}
.vc-popover-basic .item {
	margin: 4px;
}

</style>
```
:::

### 嵌套内容
通过slot content嵌套内容。

:::RUNTIME
```html
<template>
	<div>
		<vc-popover 
			:trigger="trigger" 
			content="这是一段内容,这是一段内容,这是一段内容,这是一段内容"
			trigger="click"
		>
			<vc-button>
				click 激活
			</vc-button>
			<template #content>
				<div style="height: 100px; width: 200px">
					我是嵌套的内容
				</div>
			</template>
		</vc-popover>
	</div>
</template>
<script>
import { Popover, Button } from '@wya/vc';

export default {
	name: "vc-popover-basic",
	components: {
		'vc-popover': Popover,
		'vc-button': Button,
	},
};
</script>
```
:::

### 主题
提供了两个不同的主题：`dark`和`light`。

:::RUNTIME
```html
<template>
	<div>
		<vc-popover 
			:trigger="trigger" 
			content="这是一段内容,这是一段内容,这是一段内容,这是一段内容"
			trigger="click"
			theme="dark"
		>
			<vc-button>
				dark
			</vc-button>
		</vc-popover>
		<vc-popover 
			:trigger="trigger" 
			content="这是一段内容,这是一段内容,这是一段内容,这是一段内容"
			trigger="click"
			theme="light"
		>
			<vc-button>
				light
			</vc-button>
		</vc-popover>
	</div>
</template>
<script>
import { Popover, Button } from '@wya/vc';

export default {
	name: "vc-popover-basic",
	components: {
		'vc-popover': Popover,
		'vc-button': Button,
	},
};
</script>
```
:::

### API方法调用
可以通过

:::RUNTIME
```html
<template>
	<div>
		<vc-button ref="btn" @click="handleClick">
			点我调用
		</vc-button>
	</div>
</template>
<script>
import { Popover, Button } from '@wya/vc';

export default {
	name: "vc-popover-basic",
	components: {
		'vc-button': Button,
	},
	methods: {
		handleClick() {
			Popover.open({
				el: document.body,
				cName: 'vc-popover',
				triggerEl: this.$refs.btn.$el,
				hover: true,
				alone: true, // 需要开启
				theme: 'dark',
				placement: "top",
				content: '我是API调用内容',
			});
		}
	}
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
visible | 显示popover | `Boolean` | - | `false`
animation | 自定义的动画效果 | `String` | - | 无
placement | 弹层的位置 | `String` | `top`、`left`、`right`、`bottom`、`bottom-left`、`bottom-right`、`top-left`、`top-right`、`right-top`、`right-bottom`、`left-top`、`left-bottom` | `bottom`
trigger | 触发的行为 | `String` | `hover`、`click`、`focus` | `hover`
content | 显示的内容 | `String`、`Function` | - | 无
getPopupContainer | 浮层渲染父节点 | `Function` | - | 无
portal | 是否渲染到body上，默认body | `Boolean` | - | `true`
arrow | 浮层有无箭头 | `Boolean` | - | `true`
theme | 颜色主体 | `String` | `light`、`dark`、`none` | `light`
always | 弹层不隐藏 | `Boolean` | - | `false`
tag | 渲染的节点类型 | `String` | - | `span`
disabled | 是否禁用 | `Boolean` | - | `false`
autoWidth | 宽度自适应 | `Boolean` | - | `false`
portalClassName | 外层类名 | `Object`、`String`、`Array` | - | -
portalStyle | 样式 | `Object` | - | - 
triggerEl | 触发元素，使用`open`方法调用时必填 | `Object`、`HTMLElement` | - | -
alone | 直接传送门标记调用时，使用`open`方法调用时必填 | `Boolean` | - | `false`
hover | 直接传送门标记调用时，hover需要绑定事件 | `Boolean` | - | `false`
outsideClickable | 点击弹层外面的区域是否关闭弹层，用于其他组件如`date-picker`内部控制弹层 | `Boolean` | - | `true`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
visible-change | 显示状态改变 | `(visible: Boolean) => void 0` | `visible`：显示状态
close | 关闭时回调 | - | -
ready | 弹层节点挂载完成回调 | - | -

### Slot
属性 | 说明
---|---
default | 触发器
content | 弹层内容

## 注意事项
- 不要在引用的地方带有vc-popover的className
- content的slot写法必须采用vue2.6退出的新语法，旧语法在插槽内容更新时不会同步更新
- `trigger` 为 `false` 时，`Popover` 包含的内容必须是个节点，且有`focus` 和 `blur`事件。