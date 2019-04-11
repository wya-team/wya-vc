<template>
	<component 
		:is="componentType"
		:tag="tag"
		v-bind="$attrs"
		:enter-active-class="`vc-transition__slide-${direction}--in`"
		:move-class="`vc-transition__slide-${direction}--move`"
		:leave-active-class="`vc-transition__slide-${direction}--out`"
		v-on="hooks"
	>
		<slot />
	</component>
</template>
<script>
import basicMixin from './basic-mixin';

export default {
	name: 'vc-transition-slide',
	mixins: [basicMixin],
	props: {
		direction: {
			type: String,
			default: 'left',
			validator: v => /(left|right|down|up)/.test(v)
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

@mixin slide($direction) {
	@include block(vc-transition) {
		@include element(slide-#{$direction}) {
			@include modifier(in) {
				animation-name: vc-slide-#{$direction}-in;
				animation-timing-function: ease-out;
			}
			@include modifier(out) {
				animation-name: vc-slide-#{$direction}-out;
				animation-timing-function: ease-out;
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
@include slide(left);
@include slide(right);
@include slide(up);
@include slide(down);

/**
 * left
 */
@keyframes vc-slide-left-in {
	from {
		opacity: 0;
		transform: translateX(-15px);
	}

	to {
		opacity: 1;
	}
}

@keyframes vc-slide-left-out {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		transform: translateX(-15px);
	}
}

/**
 * right
 */
@keyframes vc-slide-right-in {
	from {
		opacity: 0;
		transform: translateX(15px);
	}

	to {
		opacity: 1;
	}
}

@keyframes vc-slide-right-out {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		transform: translateX(15px);
	}
}

/**
 * down
 */
@keyframes vc-slide-down-in {
	from {
		opacity: 0;
		transform: translateY(15px);
	}

	to {
		opacity: 1;
	}
}

@keyframes vc-slide-down-out {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		transform: translateY(15px);
	}
}



/**
 * up
 */
@keyframes vc-slide-up-in {
	from {
		opacity: 0;
		transform: translateY(-15px);
	}

	to {
		opacity: 1;
	}
}

@keyframes vc-slide-up-out {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		transform: translateY(-15px);
	}
}

</style>
