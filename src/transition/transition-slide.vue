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
			validator: v => /^(left|right|down|up|none)(|-part)$/.test(v)
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
			return this.mode !== 'none' ? `-${this.mode}`.split('-').join(' is-') : '';
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
@mixin slideByMode($mode) {
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
@include slideByMode(left);
@include slideByMode(right);
@include slideByMode(up);
@include slideByMode(down);

/**
 * 动画名称
 */
@mixin slideBySize($mode, $size) {
	@include block($block) {
		@include when(#{$mode}) {
			@include when(#{$size}) {
				@include when(in) {
					animation-name: vc-slide-#{$mode}-#{$size}-in;
				}
				@include when(out) {
					animation-name: vc-slide-#{$mode}-#{$size}-out;
				}
			}
		}
	}
}
@include slideBySize(left, part);
@include slideBySize(right, part);
@include slideBySize(up, part);
@include slideBySize(down, part);



// left
@keyframes vc-slide-left-in {
	from {
		visibility: visible;
		transform: translate3d(-100%, 0, 0);
	}

	to {
		transform: translate3d(0, 0, 0);
	}
}

@keyframes vc-slide-left-out {
	from {
		transform: translate3d(0, 0, 0);
	}

	to {
		visibility: visible;
		transform: translate3d(-100%, 0, 0);
	}
}

/**
 * left-part
 */
@keyframes vc-slide-left-part-in {
	from {
		opacity: 0;
		transform: translate3d(-15px, 0, 0);
	}

	to {
		transform: translate3d(0, 0, 0);
	}
}

@keyframes vc-slide-left-part-out {
	from {
		transform: translate3d(0, 0, 0);
	}

	to {
		opacity: 0;
		transform: translate3d(-15px, 0, 0);
	}
}


// right
@keyframes vc-slide-right-in {
	from {
		visibility: visible;
		transform: translate3d(100%, 0, 0);
	}

	to {
		transform: translate3d(0, 0, 0);
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
 * right-part
 */
@keyframes vc-slide-right-part-in {
	from {
		opacity: 0;
		transform: translate3d(15px, 0, 0);
	}

	to {
		transform: translate3d(0, 0, 0);
	}
}

@keyframes vc-slide-right-part-out {
	from {
		transform: translate3d(0, 0, 0);
	}

	to {
		opacity: 0;
		transform: translate3d(15px, 0, 0);
	}
}

/**
 * down-part
 */
@keyframes vc-slide-down-part-in {
	from {
		opacity: 0;
		transform: translate3d(0, -15px, 0);
	}

	to {
		transform: translate3d(0, 0, 0);
	}
}

@keyframes vc-slide-down-part-out {
	from {
		transform: translate3d(0, 0, 0);
	}

	to {
		opacity: 0;
		transform: translate3d(0, -15px, 0);
	}
}

// down
@keyframes vc-slide-down-in {
	from {
		visibility: visible;
		transform: translate3d(0, -100%, 0);
	}

	to {
		transform: translate3d(0, 0, 0);
	}
}

@keyframes vc-slide-down-out {
	from {
		transform: translate3d(0, 0, 0);
	}

	to {
		visibility: visible;
		transform: translate3d(0, -100%, 0);
	}
}



/**
 * up-part
 */
@keyframes vc-slide-up-part-in {
	from {
		opacity: 0;
		transform: translate3d(0, 15px, 0);
	}

	to {
		transform: translate3d(0, 0, 0);
	}
}

@keyframes vc-slide-up-part-out {
	from {
		transform: translate3d(0, 0, 0);
	}

	to {
		opacity: 0;
		transform: translate3d(0, 15px, 0);
	}
}

// up
@keyframes vc-slide-up-in {
	from {
		visibility: visible;
		transform: translate3d(0, 100%, 0);
	}

	to {
		transform: translate3d(0, 0, 0);
	}
}

@keyframes vc-slide-up-out {
	from {
		transform: translate3d(0, 0, 0);
	}

	to {
		visibility: visible;
		transform: translate3d(0, 100%, 0);
	}
}

</style>
