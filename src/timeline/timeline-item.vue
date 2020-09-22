<template>
	<div class="vc-timeline-item">
		<div class="vc-timeline-item__left">
			<div 
				:style="dotStyle" 
				:class="{ 'is-circle': !$slots.dot && color }"
				class="vc-timeline-item__base"
			>
				<!-- 指示器 -->
				<slot name="dot" />
			</div>
			<div :style="lineStyle" class="vc-timeline-item__line" />
		</div>
		<div class="vc-timeline-item__right">
			<slot />
		</div>
	</div>
</template>
<script>
export default {
	name: "vc-timeline-item",
	props: {
		// TODO: 指示器左边文案
		label: {
			type: [String, Function],
			default: ''
		},
		color: {
			type: String,
			default: "#5495f6"
		},
		lineColor: {
			type: String,
			default: "#e8e8e8"
		}
	},
	computed: {
		dotStyle() {
			return { 
				borderColor: this.color,
			};
		},
		lineStyle() {
			return { 
				borderColor: this.lineColor,
			};
		}
	}
};
</script>

<style lang="scss">
@import '../style/vars.scss';

@include block(vc-timeline-item) {
	display: flex;
	font-size: 12px;
	@include element(left) {
		position: relative;
		margin-right: 5px;
	}
	@include element(right) {
		margin-top: -4px;
		color: #999;
	}

	@include element(line) {
		position: absolute;
		left: 50%;
		top: 0;
		width: 1px;
		height: 100%;
		transform: translateX(-50%);
		border-left-width: 1px;
		border-left-style: solid;
	}

	@include element(base) {
		position: relative;
		border-radius: 50%;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		@include when(circle) {
			width: 6px;
			height: 6px;
			border: 2px solid;
			box-sizing: content-box;
			background-color: #fff;
		}
	}
}

.vc-timeline-item:last-child {
	.vc-timeline-item__left {
		.vc-timeline-item__line {
			display: none;
		}
	}
}
</style>
