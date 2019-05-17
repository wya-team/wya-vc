<template>
	<component 
		:is="componentType"
		:tag="tag"
		:enter-active-class="`${prefix} ${classes} is-in`"
		:leave-active-class="`${prefix} ${classes} is-out`"
		:move-class="`${prefix} ${classes} is-move`"
		v-bind="$attrs"
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
		mode: {
			type: String,
			default: 'left',
			validator: v => /(left|right|down|up|none)/.test(v)
		},
		styles: {
			type: Object,
			default: () => ({
				animationFillMode: 'both',
				animationTimingFunction: undefined,
			})
		},
		prefix: {
			type: String,
			default: 'vc-transition-slide'
		}
	},
	computed: {
		classes() {
			return this.mode !== 'none' ? `is-${this.mode}` : '';
		}
	}
};

</script>
<style lang="scss">
@import '../style/index.scss';
$block: vc-transition-slide;

@include block($block) {
	@include when(in) {
		will-change: transform, opacity;
		animation-timing-function: ease-out;
	}
	@include when(out) {
		will-change: transform, opacity;
		animation-timing-function: ease-out;
	}
	/**
	 * transition-group下删除元素, 其他元素位置变化动画
	 */
	@include when(move) {
		transition: transform .3s $ease-out-quint;
	}
}

/**
 * 动画名称
 */
@mixin slide($mode) {
	@include block($block) {
		@include when(#{$mode}) {
			@include when(in) {
				animation-name: vc-slide-#{$mode}-in;
			}
			@include when(out) {
				animation-name: vc-slide-#{$mode}-out;
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
