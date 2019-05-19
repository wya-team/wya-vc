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
	name: 'vc-transition-zoom',
	mixins: [basicMixin],
	props: {
		mode: {
			type: String,
			default: 'x',
			validator: v => /^(x|y|center|none)$/.test(v)
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
			default: 'vc-transition-zoom'
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
$block: vc-transition-zoom;

@include block($block) {
	@include when(in) {
		animation-timing-function: $ease-out-quint; // 弹性
	}
	@include when(out) {
		animation-timing-function: $ease-in-quint; // 弹性
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
@mixin zoom($mode) {
	@include block($block) {
		@include when(#{$mode}) {
			@include when(in) {
				animation-name: vc-zoom-#{$mode}-in;
			}
			@include when(out) {
				animation-name: vc-zoom-#{$mode}-out;
			}
		}
	}
}

@include zoom(x);
@include zoom(y);
@include zoom(center);

@include block($block) {
	@include when(center) {
		@include when(in) {
			animation-timing-function: cubic-bezier(.18, .89, .32, 1.28); // 弹性
		}
		@include when(out) {
			animation-timing-function: cubic-bezier(.55, 0, .55, .2); // 弹性
		}
	}
}

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
		transform: scale(0, 0);
	}

	to {
		transform: scale(1, 1);
	}
}

@keyframes vc-zoom-center-out {
	from {
		transform: scale(1, 1);
	}

	to {
		transform: scale(0, 0);
		opacity: 0;
	}
}

</style>
