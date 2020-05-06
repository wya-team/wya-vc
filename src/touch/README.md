## 触摸（Touch）
移动端touch组件

### 何时使用

在需要调用touch事件时使用

### 基础用法

仅支持移动端使用

:::RUNTIME
```html
<template>
	<div>
		<vcm-touch
			@tap="handleTap"
			@double-tap="handleDoubleTap"
			@long-tap="handleLongTap"
			@swipe="handleSwipe"
			@swipe-up="handleSwipeUp"
			@swipe-right="handleSwipeRight"
			@swipe-down="handleSwipeDown"
			@swipe-left="handleSwipeLeft"
			@move="handleMove"
			@pinch="handlePinch"
			@rotate="handleRotate"
		>
			<div
				:style="transform"
				style="padding:24px;background: #f2f2f2;width: 320px; height: 640px; display: flex;flex-direction: column; justify-content: center"
			>
				<p>
					事件类型：{{ eventType }}
				</p>
				<p>
					旋转角度：{{ angle }}
				</p>
			</div>
		</vcm-touch>
	</div>
</template>
<script>
import { Touch } from '@wya/vc';
export default {
	name: "vcm-touch-basic",
	components: {
		'vcm-touch': Touch
	},
	data() {
		return {
			eventType: "单机，双击，长按，滑动，上滑，下滑，左滑，右滑，旋转，缩放",
			scale: 1,
			angle: 0
		};
	},
	computed: {
		transform() {
			return {
				transform: `scale(${this.scale}) rotate(${this.angle}deg)`
			};
		}
	},
	methods: {
		/**
		 * 单击执行
		 */
		handleTap(e) {
			this.eventType = "单机";
		},
		/**
		 * 双击执行
		 */
		handleDoubleTap(e) {
			this.eventType = "双击";
		},
		/**
		 * 长按执行
		 */
		handleLongTap(e) {
			this.eventType = "长按";
		},
		/**
		 * 只要滑动都会执行
		 */
		handleSwipe(e) {
			this.eventType = "只要滑动都会执行";
		},
		/**
		 * 上滑
		 */
		handleSwipeUp(e) {
			this.eventType = "上滑";
		},
		/**
		 * 右滑
		 */
		handleSwipeRight(e) {
			this.eventType = "右滑";
		},
		/**
		 * 下滑
		 */
		handleSwipeDown(e) {
			this.eventType = "下滑";
		},
		/**
		 * 左滑
		 */
		handleSwipeLeft(e) {
			this.eventType = "左滑";
		},
		/**
		 * 滑动执行的函数
		 */
		handleMove(e) {

		},
		/**
		 * 缩放
		 */
		handlePinch({ scale }) {
			this.eventType = "缩放";
			this.scale += scale;
		},
		/**
		 * 旋转
		 */
		handleRotate({ angle }) {
			this.eventType = "旋转";
			this.angle += angle;
		}
	}
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---
tag | 外层标签 | `String`| `div`、`span`、`p`、`***` | `div`
flickThreshold | 每毫秒的运动轨迹，单位`px` | `Number`| - | 0.6
prevent | 是否阻止冒泡事件 | `Boolean` | - | `true`

### 事件
事件名 | 说明 | 参数 | 返回值
---|---|---|---
tap | 点击事件 | `(e: Event) => void 0` | `e`：事件对象
long-tap | 长按事件 | `(e: Event) => void 0` | `e`：事件对象
double-tap | 双击事件 | `(e: Event) => void 0` | `e`：事件对象
pinch | 缩放事件 | `({ scale: Number }) => void 0` | `scale`：缩放的比例
rotate | 旋转事件 | `({ angle: Number }) => void 0` | `angle`：旋转角度
move | 滑动事件 | `({ deltaX: Number, deltaY }) => void 0` | `deltaX`：滑动的X轴距离位置；`deltaY`：滑动的Y轴距离位置
swipe | 滑动事件，无论哪一种类型 | `({ deltaX: Number, deltaY, isFlick: Number }) => void 0` | `deltaX`,`deltaY`：滑动的X轴和Y轴距离位置；`isFlick`：事件执行的实际每毫秒的运动轨迹是否超过`flickThreshold`
swipe-left | 向左滑动 | `({ deltaX: Number, isFlick: Number }) => void 0` | `deltaX`：向左滑动的距离；`isFlick`：事件执行的实际每毫秒的运动轨迹是否超过`flickThreshold`
swipe-right | 向右滑动 | `({ deltaX: Number, isFlick: Number }) => void 0` | `deltaX`：向右滑动的距离；`isFlick`：事件执行的实际每毫秒的运动轨迹是否超过`flickThreshold`
swipe-up | 向上滑动 | `({ deltaY: Number, isFlick: Number }) => void 0` | `deltaY`：向上滑动的距离；`isFlick`：事件执行的实际每毫秒的运动轨迹是否超过`flickThreshold`
swipe-down | 向下滑动 | `({ deltaY: Number, isFlick: Number }) => void 0` | `deltaY`：向下滑动的距离；`isFlick`：事件执行的实际每毫秒的运动轨迹是否超过`flickThreshold`

### Slot
属性 | 说明
---|---
`default` | -
