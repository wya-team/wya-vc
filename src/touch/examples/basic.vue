<template>
	<vcm-touch
		@tap="handleTap"
		@double-tap="handleDoubleTap"
		@long-tap="handleLongTap"
		@swipe="handleSwipe"
		@swipe-up="handleSwipeUp"
		@swipe-right="handleSwipeRight"
		@swipe-down="handleSwipeDown"
		@swipeLeft="handleSwipeLeft"
		@move="handleMove"
		@pinch="handlePinch"
		@rotate="handleRotate"
	>
		<div :style="transform" style="background: 'red'; height: 100vh; display: flex; align-items: center; justify-content: center">
			{{ eventType }} {{ angle }}
		</div>
	</vcm-touch>
</template>
<script>
import Mtouch from '../index.m';

export default {
	name: "vcm-touch-basic",
	components: {
		'vcm-touch': Mtouch
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
