<template>
	<component 
		:is="componentType"
		:tag="tag"
		v-bind="$attrs"
		:enter-active-class="`vc-transition__scale-${mode}--in`"
		:leave-active-class="`vc-transition__scale-${mode}--out`"
		move-class="vc-transition__scale--move"
		v-on="hooks"
	>
		<slot />
	</component>
</template>
<script>
import basicMixin from './basic-mixin';

export default {
	name: 'vc-transition-scale',
	mixins: [basicMixin],
	props: {
		mode: {
			type: String,
			default: 'both',
			validator: v => /(part|both)/.test(v)
		},
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

@mixin scale($direction) {
	@include block(vc-transition) {
		@include element(scale-#{$direction}) {
			@include modifier(in) {
				will-change: transform, opacity;
				animation-name: vc-scale-#{$direction}-in;
				animation-timing-function: cubic-bezier(.43, .84, .61, .99);
			}
			@include modifier(out) {
				will-change: transform, opacity;
				animation-name: vc-scale-#{$direction}-out;
				animation-timing-function: cubic-bezier(.43, .84, .61, .99);
			}
			/**
			 * transition-group下删除元素, 其他元素位置变化动画
			 */
			@include modifier(move) {
				transition: transform .3s $ease-out-quint;
			}
		}
	}
}

@include scale(part);
@include scale(both);

/**
 * both
 */
@keyframes vc-scale-both-in {
	from {
		opacity: 0;
		transform: scale(0)
	}

	to {
		opacity: 1;
	}
}

@keyframes vc-scale-both-out {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		transform: scale(0);
	}
}

/**
 * part
 */
@keyframes vc-scale-part-in {
	from {
		opacity: 0;
		transform: scale(0.5)
	}

	to {
		transform: scale(1);
		opacity: 1;
	}
}

@keyframes vc-scale-part-out {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		transform: scale(0.3);
	}
}
</style>
