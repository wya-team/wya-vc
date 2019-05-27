<template>
	<div :class="classes" class="vcm-popup">
		<vcm-transtion-fade>
			<div
				v-show="mask && isActive"
				class="vcm-popup__mask"
				@click="handleClose(maskClosable)"
			/>
		</vcm-transtion-fade>
		<components :is="animateComponent" :mode="mode" @after-leave="handleRemove">
			<div
				v-show="isActive"
				:style="{ position: fixed ? 'fixed' : 'absolute' }"
				class="vcm-popup__wrapper"
			>
				<slot />
			</div>
		</components>
	</div>
</template>
<script>
import MTransition from '../../transition/index.m';
import ScrollbarMixin from '../../extends/mixins/scrollbar';

const placement2mode = {
	left: 'left',
	right: 'right',
	bottom: 'up',
	top: 'down',
	center: '',
};
export default {
	name: "vcm-popup",
	components: {
		'vcm-transtion-fade': MTransition.Fade,
		'vcm-transtion-slide': MTransition.Slide,
	},
	mixins: [ScrollbarMixin],
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	props: {
		fixed: {
			type: Boolean,
			default: true
		},
		visible: {
			type: Boolean,
			default: false
		},
		mask: {
			type: Boolean,
			default: true
		},
		maskClosable: {
			type: Boolean,
			default: true
		},
		placement: {
			type: String,
			default: 'bottom',
			validator: v => /(bottom|top|left|right|center)/.test(v)
		},
		theme: {
			type: String,
			default: 'light',
			validator: v => /(light|dark|none)/.test(v)
		},
	},
	data() {
		return {
			isActive: false
		};
	},
	computed: {
		classes() {
			return {
				[`is-${this.placement}`]: true,
				[`is-${this.theme}`]: true,
			};
		},
		mode() {
			return placement2mode[this.placement];
		},
		animateComponent() {
			return this.placement === 'center' 
				? 'vcm-transtion-fade' 
				: 'vcm-transtion-slide';
		}
	},
	watch: {
		visible: {
			immediate: true,
			handler(v) {
				this.isActive = v;
			}
		}
	},
	destroyed() {
		this.clearTimer();
	},
	methods: {
		clearTimer() {
			this.timer && clearTimeout(this.timer);
		},
		/**
		 * 立即执行关闭操作，内部主动触发
		 */
		handleClose(maskClosable = true) {
			this.isActive = false;
		},
		/**
		 * 动画执行后关闭
		 * 同时close兼容portal设计
		 */
		handleRemove() {
			!this._isDestroyed && (
				this.$emit('close'),
				this.$emit('visible-change', false),
				this.zIndex = -1
			);
		}
	},
};

</script>
<style lang="scss">
@import '../../style/index.scss';

@include block(vcm-popup) {
	@include element(mask) {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .4);
		height: 100%;
		z-index: 1000;
	}
	@include element(wrapper) {
		position: absolute;
		z-index: 1000;
	}
	@include when(bottom) {
		@include element(wrapper) {
			right: 0;
			left: 0;
			bottom: 0;
			// padding-bottom: env(safe-area-inset-bottom);
		}
	}

	@include when(top) {
		@include element(wrapper) {
			right: 0;
			left: 0;
			top: 0;
			// padding-top: env(safe-area-inset-bottom);
		}
	}
	@include when(left) {
		@include element(wrapper) {
			top: 0;
			bottom: 0;
			left: 0;
		}
	}

	@include when(right) {
		@include element(wrapper) {
			top: 0;
			bottom: 0;
			right: 0;
		}
	}

	@include when(center) {
		@include element(wrapper) {
			top: 50%;
			left: 50%;
			transform: translate3d(-50%, -50%, 0);
		}
	}

	@include when(fixed) {
		@include element(wrapper) {
			position: fixed;
		}
	}
	@include when(dark) {
		@include element(wrapper) {
			background: rgba(0, 0, 0, .3);
			color: #fff;
		}
	}
	@include when(light) {
		@include element(wrapper) {
			background-color: #fff;
		}
	}
		
}


	
</style>
