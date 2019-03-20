<template>
	<div
		class="vcm-picker-col"
		@touchstart.stop.prevent="handleStart($event.touches[0].screenY)"
		@touchmove.stop.prevent="handleMove($event.touches[0].screenY)"
		@touchend.stop.prevent="handleEnd($event.changedTouches[0].screenY)"
		@mousedown.stop.prevent="handleStart($event.screenY)"
		@mousemove.stop.prevent="handleMove($event.screenY)"
		@mouseup.stop.prevent="handleEnd($event.screenY)"
	>
		<div class="__mask" />
		<div :style="styleH" class="__indicator" />
		<div :style="[transform, transition]" class="__items">
			<div
				v-for="(item, index) in dataSource"
				:key="index"
				:style="[styleH, itemStyle]"
				class="__item">
				{{ typeof item === 'object' && item['label'] ? item['label'] : item }}
			</div>
		</div>
	</div>
</template>

<script>
import { cloneDeep } from '../utils/utils';

export default {
	name: 'vcm-picker-col',
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
		value: {
			type: [String, Number]
		}
	},
	data() {
		return {
			offsetY: 0,
			itemH: 34,
			scrollStart: false,
			scrollEnd: true,
		};
	},
	minxin: [],
	computed: {
		maxH() {
			return this.itemH * this.dataSource.length - this.itemH;
		},
		styleH() {
			return {
				height: `${this.itemH}px`,
				lineHeight: `${this.itemH}px`
			};
		},
		transform() {
			let index = this.dataSource.findIndex(item => item.value === this.value);
			return {
				transform: `translate3d(0, ${(index * this.itemH + this.offsetY) * -1}px, 0)`
			};
		},
		// 结束时添加
		transition() {
			return {
				transition: `transform ${this.scrollEnd ? '500' : '0'}ms ease-out`
			};
		}
	},
	beforeCreate() {
		this.startY = 0;
		this.startTime = 0;
	},
	mounted() {
	},
	beforeDestroy() {},
	methods: {
		handleStart(y) {
			this.scrollStart = true;
			this.scrollEnd = false;

			this.startY = y;
			this.startTime = Date.now();
		},
		handleMove(y) {
			this.scrollStart && (this.offsetY = this.startY - y);
		},
		handleEnd(y) {
			let index = this.dataSource.findIndex(item => item.value === this.value);

			// 计算速度
			let translateY;
			const dt = Date.now() - this.startTime;
			if (dt > 500 || dt < 50) {
				translateY = index * this.itemH + this.offsetY;
			} else {
				const dy = this.startY - y;
				const speed = dy / dt;
				translateY = index * this.itemH + speed * 500;
			}

			let target;
			// 通知上级改变
			if (translateY <= 0) {
				target = this.dataSource[0];
			} else if (translateY >= this.maxH) {
				target = this.dataSource[this.dataSource.length - 1];
			} else {
				target = this.dataSource[Math.round(translateY / this.itemH)];
			}
			this.$emit('change', cloneDeep(target));
			this.scrollStart = false;
			this.scrollEnd = true;

			// 初始化
			this.lastY = 0;
			this.startY = 0;
			this.offsetY = 0;
		}
	}
};

</script>

<style scoped lang='scss'>
.vcm-picker-col {
	position: relative;
	height: 238px;
	overflow: hidden;
	width: 100%;

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
			hsla(0, 0%, 100%, 0.6)
		);
		background-position: top, bottom;
		background-size: 100% 102px;
		background-repeat: no-repeat;
	}

	.__indicator {
		position: absolute;
		top: 102px;
		left: 0;
		box-sizing: border-box;
		width: 100%;
		z-index: 3;
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
			text-align: center;
			box-sizing: border-box;
			font-size: 17px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
