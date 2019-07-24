<template>
	<div
		v-event:touchstart.prevent.stop="e => handleStart(e.touches[0].screenY)"
		v-event:touchmove.prevent.stop="e => handleMove(e.touches[0].screenY)"
		v-event:touchend.prevent.stop="e => handleEnd(e.changedTouches[0].screenY)"
		v-event:mousedown.prevent.stop="e => handleStart(e.screenY)"
		v-event:mousemove.prevent.stop="e => handleMove(e.screenY)"
		v-event:mouseup.prevent.stop="e => handleEnd(e.screenY)"
		class="vcm-picker-col"
	>
		<div class="vcm-picker-col__mask" />
		<div :style="styleH" class="vcm-picker-col__indicator" />
		<div :style="[transform, transition]" class="vcm-picker-col__wrapper">
			<div
				v-for="(item, index) in dataSource"
				:key="index"
				:style="[styleH, itemStyle]"
				class="vcm-picker-col__item"
			>
				{{ typeof item === 'object' && item.label ? item.label : item }}
			</div>
		</div>
	</div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { TRANSFORM, TRANSFORM_AS_VALUE, TRANSITION } from '../../utils';
import Extends from '../../extends';

export default {
	name: 'vcm-picker-col',
	directives: {
		...Extends.directives('event')
	},
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
				[TRANSFORM]: `translate3d(0, ${(index * this.itemH + this.offsetY) * -1}px, 0)`
			};
		},
		// 结束时添加
		transition() {
			return {
				[TRANSITION]: `${TRANSFORM_AS_VALUE} ${this.scrollEnd ? '500' : '0'}ms ease-out`
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

<style lang='scss'>
@import '../../style/index.scss';

@include block(vcm-picker-col) {
	position: relative;
	height: 238px;
	overflow: hidden;
	width: 100%;
	@include element(mask) {
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
	@include element(indicator) {
		position: absolute!important;
		top: 102px;
		left: 0;
		width: 100%;
		z-index: 3;
		@include commonBorder1PX(bottom, #ddd);
		@include commonBorder1PX(top, #ddd);
	}
	@include element(wrapper) {
		padding: 102px 0;
		@include element(item) {
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
