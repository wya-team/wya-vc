<template>
	<component 
		:is="tag"
		@touchstart="handleStart"
		@touchmove="handleMove"
		@touchend="handleEnd"
	>
		<slot />
	</component>
</template>
<script>
export default {
	name: "vcm-touch",
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		flickThreshold: {
			type: Number,
			default: 0.6
		}
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	created() {
		this.startX = null;
		this.startY = null;
		this.moveX = null;
		this.moveY = null;
		this.previousPinchScale = 1;
		this.longTapTimeout = null;

		this.maxTapAbsX = 60;
		this.maxTapAbsY = 60;
	},
	methods: {
		getTime() {
			return new Date().getTime(); 
		},
		getDistance(xLen, yLen) {
			return Math.sqrt(xLen * xLen + yLen * yLen);
		},
		/**
		 * 获取向量的旋转方向
		 */
		getRotateDirection(vector1, vector2) {
			return vector1.x * vector2.y - vector2.x * vector1.y;
		},
		getRotateAngle(vector1, vector2) {
			let direction = this.getRotateDirection(vector1, vector2);
			direction = direction > 0 ? -1 : 1;
			let len1 = this.getDistance(vector1.x, vector1.y);
			let len2 = this.getDistance(vector2.x, vector2.y);
			let mr = len1 * len2;
			if (mr === 0) return 0;
			let dot = vector1.x * vector2.x + vector1.y * vector2.y;
			let r = dot / mr;
			if (r > 1) r = 1;
			if (r < -1) r = -1;
			return Math.acos(r) * direction * 180 / Math.PI;
		},
		handleStart(event) {
			let point = event.touches ? event.touches[0] : event;
			this.startX = point.pageX;
			this.startY = point.pageY;
			clearTimeout(this.longTapTimeout);
			// 两点接触
			if (event.touches.length > 1) {
				let point2 = event.touches[1];
				let xLen = Math.abs(point2.pageX - this.startX);
				let yLen = Math.abs(point2.pageY - this.startY);
				this.touchDistance = this.getDistance(xLen, yLen); 
				this.touchVector = {
					x: point2.pageX - this.startX,
					y: point2.pageY - this.startY
				};
			} else {
				this.startTime = this.getTime();
				this.longTapTimeout = setTimeout(() => {
					this.$emit('long-tap', event);
				}, 800);
				if (this.previousTouchPoint) {
					if (Math.abs(this.startX - this.previousTouchPoint.startX) < this.maxTapAbsX 
						&& Math.abs(this.startY - this.previousTouchPoint.startY) < this.maxTapAbsY 
						&& Math.abs(this.startTime - this.previousTouchTime) < 300
					) {
						this.$emit('double-tap', event);
					}
				}
				this.previousTouchTime = this.startTime;
				this.previousTouchPoint = {
					startX: this.startX,
					startY: this.startY
				};
			}
		},
		handleMove(event) {
			let timestamp = this.getTime();
			if (event.touches.length > 1) {
				let xLen = Math.abs(event.touches[0].pageX - event.touches[1].pageX);
				let yLen = Math.abs(event.touches[1].pageY - event.touches[1].pageY);
				let touchDistance = this.getDistance(xLen, yLen);
				if (this.touchDistance) {
					let pinchScale = touchDistance / this.touchDistance;
					this.$emit('pinch', {
						scale: pinchScale - this.previousPinchScale,
						_scale: pinchScale
					});
					this.previousPinchScale = pinchScale;
				}
				if (this.touchVector) {
					let vector = {
						x: event.touches[1].pageX - event.touches[0].pageX,
						y: event.touches[1].pageY - event.touches[0].pageY
					};
					let angle = this.getRotateAngle(vector, this.touchVector);
					this.$emit('rotate', {
						angle
					});
					this.touchVector.x = vector.x;
					this.touchVector.y = vector.y;
				}
			} else {
				clearTimeout(this.longTapTimeout);
				let point = event.touches ? event.touches[0] : event;
				let deltaX = this.moveX === null ? 0 : point.pageX - this.moveX;
				let deltaY = this.moveY === null ? 0 : point.pageY - this.moveY;
				
				this.$emit('move', {
					deltaX,
					deltaY
				});
				this.moveX = point.pageX;
				this.moveY = point.pageY;
			}
			// 判断默认行为是否可以被禁用
			if (event.cancelable) {
				// 判断默认行为是否已经被禁用
				if (!event.defaultPrevented) {
					event.preventDefault();
				}
			}
		},
		handleCancel(event) {
			this.handleEnd();
		},
		handleEnd(event) {
			/**
			 * 在X轴或Y轴发生过移动
			 */
			clearTimeout(this.longTapTimeout);
			let isDouble = event.changedTouches.length > 1;
			let timestamp = this.getTime();
			let absX = Math.abs(this.moveX - this.startX);
			let deltaX = this.moveX - this.startX;
			let absY = Math.abs(this.moveY - this.startY);
			let deltaY = this.moveY - this.startY;
			/**
			 * 每毫秒的运动轨迹px/ms*1000
			 * 默认要1秒超过600像素
			 */
			let time = timestamp - this.startTime;
			let velocity = this.getDistance(absX, absY) / time;
			let isFlick = velocity > this.flickThreshold;
			// 在x轴滑动大于maxTapAbsX ， Y轴下于maxTapAbsY 视为滑动
			if (((this.moveX !== null && absX > this.maxTapAbsX) || (this.moveY !== null && absY > this.maxTapAbsY)) && !isDouble && isFlick) {
				this.$emit('swipe', { deltaX, deltaY, isFlick });
				if (absX > absY) {
					if (deltaX > 0) {
						this.$emit('swipe-left', { deltaX, isFlick });
					} else {
						this.$emit('swipe-right', { deltaX, isFlick });
					}
				} else if (deltaY > 0) {
					this.$emit('swipe-up', { deltaY, isFlick });
				} else {
					this.$emit('swipe-down', { deltaY, isFlick });
				}

			} else if (timestamp - this.startTime < 2000) {
				if (timestamp - this.startTime < 500) {
					this.$emit('tap', event);
				}
				if (timestamp - this.startTime > 500) {
				 // this.$emit('long-tap', event);
				}
			}

			this.startX = null;
			this.startY = null;
			this.moveX = null;
			this.moveY = null;
			this.previousPinchScale = 1;
		},
		setDefault() {
			this.previousPinchScale = 1;
		}

	}
};
</script>
<style></style>