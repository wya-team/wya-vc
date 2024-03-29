<template>
	<!-- TODO: Transtion 动态的动画组件 -->
	<vc-transition-scale 
		:mode="animation || 'part'" 
		:duration="{ enter: 0.3, leave: 0.15 }"
		@after-leave="handleRemove"
	>
		<div 
			v-show="isActive"
			:style="[wrapperStyle, wrapperW, portalStyle]"
			:class="[wrapperClasses, portalClassName]"
			class="vc-popover-core" 
			@mousedown="!hover && handleMouseDown($event)"
			@mouseenter="hover && handleChange($event, { visible: true })"
			@mouseleave="hover && handleChange($event, { visible: false })"
		>
			<div :class="themeClasses" class="vc-popover-core__container">
				<div 
					v-if="arrow" 
					:style="arrowStyle"
					:class="[themeClasses, posClasses]"
					class="vc-popover-core__arrow"
				/>
				<slot v-if="$slots.content || $scopedSlots.content" name="content" />
				<vc-customer v-else-if="typeof content === 'function'" :render="content" />
				<div v-else v-html="content" />
			</div>
		</div>
	</vc-transition-scale>
</template>

<script>
import posMixin from './pos-mixin';
import Portal from '../portal/index';
import Transition from '../transition/index';
import Customer from '../customer/index';
import { VcError } from '../vc/index';
import { Resize } from '../utils/index';
import { IS_SERVER } from '../utils/constant';

const wrapperComponent = {
	name: 'vc-popover-core',
	mixins: [posMixin],
	components: {
		'vc-transition-scale': Transition.Scale,
		'vc-customer': Customer
	},
	props: {
		visible: Boolean,
		animation: Transition.Scale.props.mode,
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
		content: [String, Function],
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
		triggerEl: {
			type: IS_SERVER ? Object : HTMLElement,
			required: true
		},
		onChange: {
			type: Function,
			default: () => {}
		},
		onReady: Function,
		// 直接传送门标记调用时，hover需要绑定事件
		alone: {
			type: Boolean,
			default: false
		},
		hover: Boolean,
		always: Boolean,
		portalClassName: [Object, String, Array],
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
	created() {
		this.alone && this.hover && this.bindEvents();
	},
	mounted() {
		this.isActive = true;
		this.$nextTick(() => {
			this.setPopupStyle();
		});

		// 捕获阶段执行
		!this.hover && document.addEventListener('click', this.handleClick, true);
		// 监听body的滚动
		document.addEventListener('scroll', this.setPopupStyle);
		// 监听触发节点的Resize
		Resize.on(this.triggerEl, this.setPopupStyle);
		// 监听弹层的Resize
		Resize.on(this.$el, this.handleWrapperResize);

		this.onReady && this.onReady();
	},
	destroyed() {
		!this.hover && document.removeEventListener('click', this.handleClick, true);
		document.removeEventListener('scroll', this.setPopupStyle);
		Resize.off(this.triggerEl, this.setPopupStyle);
		Resize.off(this.$el, this.handleWrapperResize);

		this.alone && this.hover && this.removeEvents();
	}, 
	methods: {
		/**
		 * hack
		 * 外层高度没有撑开时
		 */
		getHackContainer() {
			try {
				let container = this.triggerEl;

				if (this.$slots.content) {
					let slotHeight = this.$slots.default[0].elm.getBoundingClientRect().height;
					let parentHeight = this.triggerEl.getBoundingClientRect().height;
					if (slotHeight > parentHeight) {
						container = this.$slots.default[0].elm;
					}
					
				}
				return container;

			} catch (e) {
				throw new VcError('vc-popover-core', '不要使用<template #default></template>');
			}
		},

		// set
		setPopupStyle() {
			if (!this.$el) return;

			const triggerEl = this.getHackContainer();

			const { portal, getPopupContainer } = this;

			let rect = this.getRect({
				portal,
				triggerEl,
				el: this.$el,
				hasContainer: !!getPopupContainer
			});

			let result = this.getFitPos({
				rect,
				triggerEl,
				el: this.$el,
				placement: this.placement
			});


			let { wrapperStyle, arrowStyle } = this.getPopupStyle({
				rect,
				triggerEl,
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
				width: `${triggerEl.getBoundingClientRect().width}px`
			};
		},

		handleMouseDown(e) {
			this.isPressMouse = true;
		},

		/**
		 * 不会销毁的两种情况
		 * 1. 在容器内的点击
		 * 2. 内部按下，外部释放
		 */
		handleClick(e) {
			const isIn = this.$el.contains(e.target);
			const isPress = this.isPressMouse;

			this.isPressMouse = false;
			if (isIn || isPress) {
				return;
			}

			this.alone && (this.isActive = false);
			this.onChange(e, { context: this });
		},

		handleChange(e, { visible }) {
			this.alone && this.handleTriggerChange(e);
			!this.alone && this.onChange(e, { visible, context: this });
		},

		/**
		 * 弹层【宽度】变化后的自适应，主要服务于Cascader等内容会变化的下拉框
		 */
		handleWrapperResize() {
			let direction = this.placement.split('-');

			let left = parseFloat(this.wrapperStyle.left);
			switch (direction[0]) {
				case 'top':
				case 'bottom':
					if (left + this.$el.offsetWidth >= window.innerWidth) {
						this.wrapperStyle = {
							...this.wrapperStyle,
							left: `${window.innerWidth - this.$el.offsetWidth}px`
						};
					} else {
						this.setPopupStyle();
					}
					break;
				default:
					break;
			}

		},
		/**
		 * 动画执行后关闭
		 * 同时close兼容portal设计
		 */
		handleRemove() {
			!this._isDestroyed && (
				this.$emit('close')
			);
		},
		/**
		 * for alone, 方法直接调用
		 */
		bindEvents() {
			this.triggerEl.addEventListener('mouseenter', this.handleTriggerChange);
			this.triggerEl.addEventListener('mouseleave', this.handleTriggerChange);
		},
		removeEvents() {
			this.triggerEl.removeEventListener('mouseenter', this.handleTriggerChange);
			this.triggerEl.removeEventListener('mouseleave', this.handleTriggerChange);
		},
		handleTriggerChange(e) {
			let visible = e.type === 'mouseenter';

			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.isActive = visible;
				this.onChange(e, { visible, context: this });
			}, 200);
		}
	},
};

export default wrapperComponent;
export const Func = new Portal(wrapperComponent, {
	promise: false,
	// multiple: true
});
</script>

<style lang="scss">
@import '../style/vars.scss';

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
		& > .vc-popover-core__container {
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
