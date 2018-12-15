<template>
	<div
		class="vcm-picker-col"
		@touchstart.stop.prevent="handleTouchStart"
		@touchmove.stop.prevent="handleTouchMove"
		@touchend.stop.prevent="handleTouchEnd">
		<div class="__mask" />
		<div class="__indicator" />
		<div :style="{transform:`translateY(${translateY}px)`,transition: `transform ${duration}ms cubic-bezier(0.19, 1, 0.22, 1)`}" class="__items">
			<div
				v-for="(item,index) in dataSource"
				:key="index"
				:style="itemStyle"
				class="__item">
				{{ typeof item === 'object' && item['label'] ? item['label'] : item }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		dataSource: {
			type: Array,
			default: () => []
		},
		itemStyle: {
			type: Object,
			default: () => {}
		},
		index: {
			type: Number
		},
		cascade: {
			type: Boolean
		},
		colValue: {
			type: [String, Object]
		}
	},
	data() {
		return {
			translateY: 0,
			selectIndex: 0,
			duration: 800
		};
	},
	minxin: [],
	computed: {
		maxHeight() {
			return 34 * this.dataSource.length - 34;
		},
	},
	watch: {
		dataSource(v, old) {
			if (this.cascade && this.dataSource && this.dataSource.length) {
				this.selectIndex = 0;
				this.translateY = 0;
			} else {
				if (old && v.length == old.length) return;
				if (!v[this.translateY / 34 * -1]) {
					this.translateY = 0;
				}
			}
		},
		colValue: {
			immediate: true,
			handler(v) {
				let index = this.dataSource.findIndex(item => item.value === this.colValue);
				if (index * 34 === this.translateY * -1) return;
				this.translateY = index * 34 * -1;
			}
		}
	},
	beforeCreate() {
		this.startY = 0;
		this.startTime = 0;
		this.lastY = 0;
		this.lastTime = 0;
	},
	mounted() {
	},
	beforeDestroy() {},
	methods: {
		handleTouchStart(event) {
			event.preventDefault();
			let finger = event.changedTouches[0];
			this.startY = finger.pageY;
			this.duration = 800;
			this.startTime = new Date();
		},
		handleTouchMove(event) {
			event.preventDefault();
			let finger = event.changedTouches[0];
			this.lastY = finger.pageY;
			let duration = new Date() - this.startTime;
			if (duration > 300 && this.duration > 100) {
				this.duration -= 100;
			}
			this.computedDistance(this.lastY - this.startY);
			this.startY = this.lastY;
		},
		computedDistance(move, type) {
			let updateMove = this.translateY * 1 + move;
			if (updateMove > 0) {
				updateMove = 0;
			}
			if (updateMove < -1 * this.maxHeight) {
				updateMove = -1 * this.maxHeight;
			}
			if (type == 'end') {
				this.translateY = updateMove == 0 ? 0 : Math.round(updateMove / 34) * 34;
			} else {
				this.translateY = updateMove;
			}
		},
		handleTouchEnd(event) {
			event.preventDefault();
			let momentumRatio = 7;
			let duration = new Date() - this.startTime;
			let finger = event.changedTouches[0];
			this.lastY = finger.pageY;
			this.computedDistance(this.lastY - this.startY, 'end');
			this.startY = this.lastY;
			if (this.selectIndex !== this.translateY / 34 * -1) {
				this.selectIndex = this.translateY / 34 * -1;
				this.handleEmit();
			}
		},
		handleEmit() {
			if (this.dataSource[this.selectIndex]) {
				this.$emit('change', this.dataSource[this.selectIndex], this.index);
			}
		}
	},
	destoryed() {}
};

</script>

<style scoped lang='scss'>
.vcm-picker-col {
	display: block;
	position: relative;
	height: 238px;
	overflow: hidden;
	width: 100%;

	.__item {
		text-align: center;
		box-sizing: border-box;
		padding: 9px 15px;
		height: 42px;
		line-height: 42px;
		color: #108ee9;
		font-size: 17px;
	}

	.__mask {
		position: absolute;
		left: 0;
		z-index: 3;
		top: 0;
		margin: 0 auto;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(180deg,
			hsla(0, 0%, 100%, 0.95),
			hsla(0, 0%, 100%, 0.6)),
			linear-gradient(0deg,
			hsla(0, 0%, 100%, 0.95),
			hsla(0, 0%, 100%, 0.6));
		background-position: top, bottom;
		background-size: 100% 102px;
		background-repeat: no-repeat;
	}

	.__indicator {
		position: absolute;
		top: 102px;
		left: 0;
		box-sizing: border-box;
		// border-top: 1px solid #ddd;
		// border-bottom: 1px solid #ddd;
		width: 100%;
		z-index: 3;
		height: 34px;

		&::before {
			content: '';
			position: absolute;
			background-color: #ddd;
			display: block;
			z-index: 1;
			top: 0;
			right: auto;
			bottom: auto;
			left: 0;
			width: 100%;
			height: 1px;
			transform-origin: 50% 50%;
			transform: scaleY(0.5);
		}

		&::after {
			content: '';
			position: absolute;
			background-color: #ddd;
			display: block;
			z-index: 1;
			top: auto;
			right: auto;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1px;
			transform-origin: 50% 100%;
			transform: scaleY(0.5);
		}
	}

	.__items {
		padding: 102px 0;
		.__item {
			color: #000;
			padding: 0;
			margin: 0 10px;
			height: 34px !important;
			line-height: 34px !important;
			overflow: hidden;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
