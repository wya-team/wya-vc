<template>
	<div :class="classes" class="vcm-popup">
		<vcm-transtion-fade>
			<div
				v-show="mask && isActive"
				class="vcm-popup__mask"
				@click="handleClose(maskClosable)"
				@touchmove.prevent
			/>
		</vcm-transtion-fade>
		<components :is="animateComponent" :mode="mode" @after-leave="handleRemove">
			<div
				v-show="isActive"
				:style="[{ position: fixed ? 'fixed' : 'absolute' }, wrapperStyle]"
				:class="wrapperClassName"
				class="vcm-popup__wrapper"
			>
				<slot />
			</div>
		</components>
	</div>
</template>
<script>
import MTransition from '../../transition/index.m';
import Extends from '../../extends';
import { placement2mode, eleInRegExp } from '../../utils';

export default {
	name: "vcm-popup",
	components: {
		'vcm-transtion-fade': MTransition.Fade,
		'vcm-transtion-slide': MTransition.Slide,
	},
	mixins: [...Extends.mixins(['scrollbar'])],
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
		wrapperClassName: [Object, Array, String],
		wrapperStyle: [Object, Array, String],
		scrollRegExp: {
			type: Object,
			default: (v) => ({ 
				className: /(vc-hack-scroll|scroll-container)/ 
			})
		}
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
	mounted() {
		this.operateDOMEvents('add');
	},
	destroyed() {
		this.clearTimer();
		this.operateDOMEvents('remove');
	},
	methods: {
		operateDOMEvents(type) {
			let fn = type === 'add' ? document.addEventListener : document.removeEventListener;
			fn('touchstart', this.handleTouchStart);
			fn('touchmove', this.handleTouchMove, { passive: false }); // 是否会使用preventDefault()，false表示使用
		},

		clearTimer() {
			this.timer && clearTimeout(this.timer);
		},
		/**
		 * 立即执行关闭操作，内部主动触发
		 */
		handleClose(allow = true) {
			if (allow) {
				this.isActive = false;
			}
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
		},
		handleTouchStart(e) {
			if (this.isActive) {
				this.startY = e.touches[0].pageY;
			}
		},
		handleTouchMove(e) {
			// 显示状态下才处理滑动
			if (!this.isActive) return;
			let path = e.path || (e.composedPath && e.composedPath()) || [];
			let inContainer = path.some((ele) => {
				if (eleInRegExp(ele, this.scrollRegExp)) {
					this.scrollContainer = ele;
					return true;
				}
				return false;
			});
			// 容器外的滑动禁止
			if (!inContainer) { e.preventDefault(); return; }
			
			const moveY = e.touches[0].pageY;
			const top = this.scrollContainer.scrollTop;
			const ch = this.scrollContainer.clientHeight;
			const sh = this.scrollContainer.scrollHeight;
			if ((top === 0 && moveY > this.startY) || (top + ch === sh && moveY < this.startY)) {
				// 到底或到头都禁止
				e.preventDefault();
			}
		},
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
