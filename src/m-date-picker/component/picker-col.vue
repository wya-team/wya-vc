<template>
	<div
		class="vcm-picker-popup-content-col"
		@touchstart.stop.prevent="handleTouchStart"
		@touchmove.stop.prevent="handleTouchMove"
		@touchend.stop.prevent="handleTouchEnd">
		<div class="vcm-picker-popup-content-col-mask" />
		<div class="vcm-picker-popup-content-col-indicator" />
		<div
			v-if="!divider"
			:style="{transform:`translateY(${translateY}px)`}"
			class="vcm-picker-popup-content-col-items">
			<div
				v-for="(item,index) in values"
				:key="index"
				:style="{textAlign:textAlign}"
				:class="[className]"
				class="vcm-picker-popup-item"> {{ valueKey?item[valueKey]:item }} </div>
		</div>
		<div v-else class="vcm-picker-popup-content-col-items">
			<div class="vcm-picker-popup-item" v-html="content"/>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		values: {
			type: Array
		},
		valueKey: {
			type: String,
			default: 'name'
		},
		textAlign: {
			type: String,
			default: 'center'
		},
		className: {
			type: String,
			default: ''
		},
		index: {
			type: Number
		},
		divider: {
			type: Boolean,
			default: false
		},
		content: {
			type: String,
			default: '-'
		}
	},
	data() {
		return {
			translateY: 0,
		};
	},
	minxin: [],
	computed: {
		maxHeight() {
			return 34 * this.values.length - 34;
		}
	},
	watch: {},
	beforeCreate() {
		this.startY = 0;
		this.lastY = 0;
	},
	mounted() {},
	beforeDestroy() {},
	methods: {
		handleTouchStart(event) {
			event.preventDefault();
			if (this.divider) return;
			let finger = event.changedTouches[0];
			this.startY = finger.pageY;
		},
		handleTouchMove(event) {
			event.preventDefault();
			if (this.divider) return;
			let finger = event.changedTouches[0];
			this.lastY = finger.pageY;
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
			if (this.divider) return;
			let finger = event.changedTouches[0];
			this.lastY = finger.pageY;
			this.computedDistance(this.lastY - this.startY, 'end');
			this.startY = this.lastY;
			this.handleEmit();
		},
		resetTranslate() {
			this.translateY = 0;
		},
		handleEmit() {
			this.$emit('change', this.values[this.translateY / 34 * -1], this.index);
		}
	},
	destoryed() {}
};

</script>

<style scoped lang='scss'>
	.vcm-picker-popup {
		&-item {
			text-align: center;
			box-sizing: border-box;
			padding: 9px 15px;
			height: 42px;
			line-height: 42px;
			color: #108ee9;
			font-size: 17px;
		}

		&-content {

			&-col {
				display: block;
				position: relative;
				height: 238px;
				overflow: hidden;
				width: 100%;

				&-mask {
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

				&-indicator {
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

				&-items {
					padding: 102px 0;
					transition: transform 0.1s;

					.vcm-picker-popup-item {
						color: #000;
						padding: 0;
						margin: 0 10px;
						height: 34px;
						line-height: 34px;
						overflow: hidden;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}

</style>
