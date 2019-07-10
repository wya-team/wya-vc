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
		},
		prevent: {
			type: Boolean,
			default: true
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
		handleStart(e) {
			let point = e.touches ? e.touches[0] : e;
			this.startX = point.pageX;
			this.startY = point.pageY;
			clearTimeout(this.longTapTimeout);
			this.startTime = this.getTime();
			// 两点接触
			if (e.touches.length > 1) {
				let point2 = e.touches[1];
				let xLen = Math.abs(point2.pageX - this.startX);
				let yLen = Math.abs(point2.pageY - this.startY);
				this.touchDistance = this.getDistance(xLen, yLen); 
				this.touchVector = {
					x: point2.pageX - this.startX,
					y: point2.pageY - this.startY
				};
			} else {
				this.longTapTimeout = setTimeout(() => {
					this.$emit('long-tap', e);
				}, 800);
				if (this.previousTouchPoint) {
					if (Math.abs(this.startX - this.previousTouchPoint.startX) < this.maxTapAbsX 
						&& Math.abs(this.startY - this.previousTouchPoint.startY) < this.maxTapAbsY 
						&& Math.abs(this.startTime - this.previousTouchTime) < 300
					) {
						this.$emit('double-tap', e);
					}
				}
				this.previousTouchTime = this.startTime;
				this.previousTouchPoint = {
					startX: this.startX,
					startY: this.startY
				};
			}
		},
		handleMove(e) {
			this.prevent && e.preventDefault();

			let timestamp = this.getTime();

			if (e.touches.length > 1) {
				let xLen = Math.abs(e.touches[0].pageX - e.touches[1].pageX);
				let yLen = Math.abs(e.touches[0].pageY - e.touches[1].pageY);
				let touchDistance = this.getDistance(xLen, yLen);
				// 缩放
				if (this.touchDistance) {
					let pinchScale;
					if (touchDistance > this.touchDistance) { // 放大
						pinchScale = touchDistance / this.touchDistance;
						this.$emit('pinch', {
							scale: pinchScale - this.previousPinchScale,
						});
					} else { // 缩小
						pinchScale = this.touchDistance / touchDistance;
						this.$emit('pinch', {
							scale: this.previousPinchScale - pinchScale,
						});
					}
					this.previousPinchScale = pinchScale;
				}
				// 旋转
				if (this.touchVector) {
					let vector = {
						x: e.touches[1].pageX - e.touches[0].pageX,
						y: e.touches[1].pageY - e.touches[0].pageY
					};
					let angle = this.getRotateAngle(vector, this.touchVector);
					this.$emit('rotate', { angle });
					this.touchVector.x = vector.x;
					this.touchVector.y = vector.y;
				}
			} else {
				clearTimeout(this.longTapTimeout);
				let point = e.touches ? e.touches[0] : e;
				let deltaX = this.moveX === null ? 0 : point.pageX - this.moveX;
				let deltaY = this.moveY === null ? 0 : point.pageY - this.moveY;
				
				this.$emit('move', {
					deltaX,
					deltaY
				});
				this.moveX = point.pageX;
				this.moveY = point.pageY;
			}
		},
		handleCancel(e) {
			this.handleEnd();
		},
		handleEnd(e) {
			/**
			 * 在X轴或Y轴发生过移动
			 */
			clearTimeout(this.longTapTimeout);
			let isDouble = e.changedTouches.length > 1;
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
					this.$emit('tap', e);
				}
				if (timestamp - this.startTime > 500) {
				 // this.$emit('long-tap', e);
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