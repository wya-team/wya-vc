<template>
	<!-- TODO: Transtion 动态的动画组件 -->
	<vc-transition-scale 
		:mode="animate || 'part'" 
		:duration="{ enter: 0.3, leave: 0.15 }"
		@after-leave="handleRemove"
	>
		<div 
			v-show="isActive"
			:style="[wrapperStyle, wrapperW, portalStyle]"
			:class="[wrapperClasses, portalClassName]"
			class="vc-popover-core" 
			@mouseenter="isHover && onChange($event, true)"
			@mouseleave="isHover && onChange($event, false)"
		>
			<div :class="themeClasses" class="vc-popover-core__container">
				<div 
					v-if="arrow" 
					:style="arrowStyle"
					:class="[themeClasses, posClasses]"
					class="vc-popover-core__arrow"
				/>
				<slot v-if="$slots.content || $scopedSlots.content" name="content" />
				<div v-else>{{ content }}</div>
			</div>
		</div>
	</vc-transition-scale>
</template>

<script>
import posMixin from './pos-mixin';
import CreateProtal from '../create-portal/index';
import Transition from '../transition/index';
import { VcError } from '../vc/index';

const popup = {
	name: 'vc-popover-core',
	mixins: [posMixin],
	components: {
		'vc-transition-scale': Transition.Scale
	},
	props: {
		visible: Boolean,
		animate: String,
		placement: {
			type: String,
			default: 'bottom',
			validator: (value) => {
				return [
					'bottom', 'bottom-left', 'bottom-right',
					'top', 'top-left', 'top-right',
					'right', 'right-top', 'right-bottom',
					'left', 'left-top', 'left-bottom'
				].includes(value);
			}
		},
		theme: {
			type: String,
			default: 'light',
			validator: v => /(light|dark|none)/.test(v)
		},
		content: String,
		getPopupContainer: Function,
		portal: {
			type: Boolean,
			default: true
		},
		arrow: { // 是否显示箭头
			type: Boolean,
			default: true
		},
		autoWidth: { // 同宽
			type: Boolean,
			default: false
		},
		popupContainer: HTMLElement,
		onChange: Function,
		onReady: Function,
		isHover: Boolean,
		portalClassName: Object | String,
		portalStyle: Object,
	},
	data() {
		return {
			isActive: false,
			wrapperStyle: {},
			arrowStyle: {},
			fitPos: this.placement,
			wrapperW: { width: 'auto' }
		};
	},
	computed: {
		themeClasses() {
			return {
				'is-light': /light/.test(this.theme),
				'is-dark': /dark/.test(this.theme),
			};
		},
		wrapperClasses() {
			return {
				'is-top': this.arrow && /top/.test(this.fitPos),
				'is-right': this.arrow && /right/.test(this.fitPos),
				'is-bottom': this.arrow && /bottom/.test(this.fitPos),
				'is-left': this.arrow && /left/.test(this.fitPos),
			};
		},
		posClasses() {
			return {
				[`is-${this.fitPos.split('-')[0]}-basic`]: true,
				[`is-${this.fitPos}`]: true
			};
		}
	},
	mounted() {
		this.isActive = true;
		this.$nextTick(() => {
			this.setPopupStyle();
		});

		// 捕获阶段执行
		!this.isHover && document.addEventListener('click', this.handleClick, true);

		this.onReady && this.onReady();
	},
	destroyed() {
		!this.isHover && document.removeEventListener('click', this.handleClick, true);
	}, 
	methods: {
		/**
		 * hack
		 * 外层高度没有撑开时
		 */
		getHackContainer() {
			try {
				let slotHeight = this.$slots.default[0].elm.getBoundingClientRect().height;
				let parentHeight = this.popupContainer.getBoundingClientRect().height;
				if (slotHeight > parentHeight) {
					return this.$slots.default[0].elm;
				}
				return this.popupContainer;

			} catch (e) {
				throw new VcError('vc-popover-core', '不要使用<template #default></template>');
			}
		},

		// set
		setPopupStyle() {
			if (!this.$el) return;

			const popupContainer = this.getHackContainer();

			const { portal, getPopupContainer } = this;

			let rect = this.getRect({
				portal,
				popupContainer,
				el: this.$el,
				hasContainer: !!getPopupContainer
			});

			let result = this.getFitPos({
				rect,
				popupContainer,
				el: this.$el,
				placement: this.placement
			});


			let { wrapperStyle, arrowStyle } = this.getPopupStyle({
				rect,
				popupContainer,
				el: this.$el,
				placement: result
			});

			this.fitPos = result;
			this.wrapperStyle = wrapperStyle;
			this.arrowStyle = arrowStyle;

			/**
			 * 自适应高度
			 */
			if (!this.autoWidth) return;
			this.wrapperW = {
				width: `${popupContainer.getBoundingClientRect().width}px`
			};
		},
		handleClick(e) {
			this.onChange(e);
		},
		/**
		 * 动画执行后关闭
		 * 同时close兼容portal设计
		 */
		handleRemove() {
			!this._isDestroyed && (
				this.$emit('close')
			);
		}
	},
};

export default popup;
export const Func = CreateProtal({
	promise: false,
	// multiple: true
}, popup);
</script>

<style lang="scss">
@import '../style/index.scss';

@include block(vc-popover-core) {
	position: absolute;
	transition: top .02s linear, left .02s linear;
	z-index: $popup-zindex;
	@include when(top) {
		padding-bottom: 8px;
	}
	@include when(bottom) {
		padding-top: 8px;
	}
	@include when(right) {
		padding-left: 8px;
	}
	@include when(left) {
		padding-right: 8px;
	}
	@include element(container) {
		padding: 5px 12px;
		border-radius: 4px;
		box-shadow: $border-shadow;
		@include when(dark) {
			color: $white;
			background-color: $dark-bg-color;
		}
		@include when(light) {
			background-color: $white;
		}
	}
	@include when(padding-none) {
		@include element(container) {
			padding: 0;
		}
	}
	@include element(arrow) {
		background: transparent;
		width: 9px;
		height: 9px;
		transform: rotate(45deg);
		position: absolute;
		display: block;
		border-width: 4px;
		border-style: solid;
		border-color: transparent;
		@include when(top-basic) {
			bottom: 4px;
			box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
			border-top-color: transparent;
			border-left-color: transparent;
			@include when(light) {
				border-right-color: $white;
				border-bottom-color: $white;
			}
			@include when(dark) {
				border-right-color: $dark-bg-color;
				border-bottom-color: $dark-bg-color;
			}
		}
		@include when(top) {
			left: 50%;
			transform: translateX(-50%) rotate(45deg);
		}
		@include when(top-left) {
			left: 16px;
		}
		@include when(top-right) {
			right: 16px;
		}

		@include when(bottom-basic) {
			top: 4px;
			box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
			border-right-color: transparent;
			border-bottom-color: transparent;
			@include when(light) {
				border-top-color: $white;
				border-left-color: $white;
			}
			@include when(dark) {
				border-top-color: $dark-bg-color;
				border-left-color: $dark-bg-color;
			}
			
		}
		@include when(bottom) {
			left: 50%;
			transform: translateX(-50%) rotate(45deg);
		}
		@include when(bottom-left) {
			left: 16px;
		}
		@include when(bottom-right) {
			right: 16px;
		}

		@include when(right-basic) {
			left: 4px;
			box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
			border-top-color: transparent;
			border-right-color: transparent;

			@include when(light) {
				border-bottom-color: $white;
				border-left-color: $white;
			}
			@include when(dark) {
				border-bottom-color: $dark-bg-color;
				border-left-color: $dark-bg-color;
			}
		}

		@include when(left) {
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
		}

		@include when(left-basic) {
			right: 4px;
			box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
			border-bottom-color: transparent;
			border-left-color: transparent;

			@include when(light) {
				border-top-color: $white;
				border-right-color: $white;
			}
			@include when(dark) {
				border-top-color: $dark-bg-color;
				border-right-color: $dark-bg-color;
			}
		}


		@include when(right) {
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
		}
	}
}

</style>
