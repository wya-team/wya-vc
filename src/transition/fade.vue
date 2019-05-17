<template>
	<component 
		:is="componentType"
		:tag="tag"
		:enter-active-class="`${prefix}--in`"
		:move-class="`${prefix}--move`"
		:leave-active-class="`${prefix}--out`"
		v-bind="$attrs"
		v-on="hooks"
	>
		<slot />
	</component>
</template>
<script>
import basicMixin from './basic-mixin';

export default {
	name: 'vc-transition-fade',
	mixins: [basicMixin],
	props: {
		styles: {
			type: Object,
			default: () => ({
				animationFillMode: 'both',
				animationTimingFunction: undefined,
			})
		},
		prefix: {
			type: String,
			default: 'vc-transition-fade'
		}
	}
};

</script>
<style lang="scss">
@import '../style/index.scss';
$block: vc-transition-fade;

@include block($block) {
	@include modifier(in) {
		will-change: opacity;
		animation-name: vc-fade-in;
		animation-timing-function: linear;
	}
	@include modifier(out) {
		will-change: opacity;
		animation-name: vc-fade-out;
		animation-timing-function: linear;
	}
	/**
	 * transition-group下删除元素, 其他元素位置变化动画
	 */
	@include modifier(move) {
		transition: transform .3s $ease-out-quint;
	}
}

@keyframes vc-fade-in {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@keyframes vc-fade-out {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
	}
}

</style>
