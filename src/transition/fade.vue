<template>
	<component 
		:is="componentType"
		:tag="tag"
		v-bind="$attrs"
		enter-active-class="vc-transition__fade--in"
		move-class="vc-transition__fade--move"
		leave-active-class="vc-transition__fade--out"
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
		}
	}
};

</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-transition) {
	@include element(fade) {
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
