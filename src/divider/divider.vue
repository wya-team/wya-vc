<template>
	<div :class="['vc-divider', `is-${vertical ? 'vertical' : 'horizontal'}`]">
		<div
			v-if="$slots.default && !vertical"
			:class="['vc-divider__text', `is-${placement}`]"
		>
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'vc-divider',
	inheritAttrs: false,
	props: {
		vertical: {
			type: Boolean,
			default: false,
		},
		placement: {
			type: String,
			default: 'center',
			validator(val) {
				return ['left', 'center', 'right'].indexOf(val) !== -1;
			}
		}
	}
};

</script>

<style lang="scss">
@import '../style/vars.scss';

$block: vc-divider;

@include block($block) {
	background-color: #e8e8e8;
	position: relative;

	@include when(horizontal) {
		display: block;
		height: 1px;
		width: 100%;
		margin: 24px 0;
	}

	@include when(vertical) {
		position: relative;
		display: inline-block;
		top: -0.06em;
		width: 1px;
		height: .9em;
		margin: 0 12px;
		vertical-align: middle;
	}

	@include element(text) {
		position: absolute;
		background-color: #fff;
		padding: 0 20px;
		font-weight: 500;
		color: #303133;
		font-size: 14px;

		@include when(left) {
			left: 20px;
			transform: translateY(-50%);
		}

		@include when(center)  {
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
		}

		@include when(right)  {
			right: 20px;
			transform: translateY(-50%);
		}
	}
}
</style>
