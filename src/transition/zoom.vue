<template>
	<component 
		:is="componentType"
		:tag="tag"
		v-bind="$attrs"
		:enter-active-class="`vc-transition__zoom-${direction}--in`"
		:move-class="`vc-transition__zoom-${direction}--move`"
		:leave-active-class="`vc-transition__zoom-${direction}--out`"
		v-on="hooks"
	>
		<slot />
	</component>
</template>
<script>
import basicMixin from './basic-mixin';

export default {
	name: 'vc-transition-zoom',
	mixins: [basicMixin],
	props: {
		direction: {
			type: String,
			default: 'x',
			validator: v => /(x|y|center)/.test(v)
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

@mixin zoom($direction) {
	@include block(vc-transition) {
		@include element(zoom-#{$direction}) {
			@include modifier(in) {
				animation-name: vc-zoom-#{$direction}-in;
				animation-timing-function: $ease-out-circ;
			}
			@include modifier(out) {
				animation-name: vc-zoom-#{$direction}-out;
				animation-timing-function: $ease-in-out-circ;
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
@include zoom(x);
@include zoom(y);
@include zoom(center);

/**
 * x
 */
@keyframes vc-zoom-x-in {
	from {
		opacity: 0;
		transform: scaleX(0);
	}

	50% {
		opacity: 1;
	}
}

@keyframes vc-zoom-x-out {
	from {
		opacity: 1;
	}

	50% {
		opacity: 0;
		transform: scaleX(0);
	}

	to {
		opacity: 0;
	}
}

/**
 * y
 */
@keyframes vc-zoom-y-in {
	from {
		opacity: 0;
		transform: scaleY(0);
	}

	50% {
		opacity: 1;
		transform: scaleY(1)
	}
}

@keyframes vc-zoom-y-out {
	from {
		opacity: 1;
	}

	50% {
		opacity: 0;
		transform: scaleY(0);
	}

	to {
		opacity: 0;
	}
}

/**
 * center
 */
@keyframes vc-zoom-center-in {
	from {
		opacity: 0;
		transform: scale3d(.3, .3, .3);
	}

	50% {
		opacity: 1;
	}
}

@keyframes vc-zoom-center-out {
	from {
		opacity: 1;
	}

	50% {
		opacity: 0;
		transform: scale3d(.3, .3, .3);
	}

	to {
		opacity: 0;
	}
}
</style>
