<template>
	<transition :name="animate || `am-popup`" @after-leave="handleRemove">
		<div 
			v-show="isActive"
			:style="wrapperStyle"
			:class="wrapperClasses"
			class="vc-popover-core" 
			@mouseout="isHover && onChange($event, true)"
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
	</transition>
</template>

<script>
import Popper from './popper';
import CreateProtal from '../create-portal/index';

const popup = {
	name: 'vc-popover-core',
	mixins: [Popper],
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
			validator: v => /(light|dark)/.test(v)
		},
		content: String,
		getPopupContainer: Function,
		transfer: {
			type: Boolean,
			default: true
		},
		arrow: { // 是否显示箭头
			type: Boolean,
			default: true
		},
		popupContainer: HTMLElement,
		onChange: Function,
		isHover: Boolean,
	},
	data() {
		return {
			isActive: false,
			wrapperStyle: {},
			arrowStyle: {},
			fitPos: this.placement,
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
				'is-top': /top/.test(this.fitPos),
				'is-right': /right/.test(this.fitPos),
				'is-bottom': /bottom/.test(this.fitPos),
				'is-left': /left/.test(this.fitPos),
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
			this.triggerEl = this.getTriggerEl();
			this.setPopperStyle();
		});

		// 捕获阶段执行
		!this.isHover && document.addEventListener('click', this.handleClick, true);
	},
	destroyed() {
		!this.isHover && document.removeEventListener('click', this.handleClick, true);
	}, 
	methods: {
		/**
		 * hack
		 * 外层高度没有撑开时
		 */
		getTriggerEl() {
			let slotHeight = this.$slots.default[0].elm.getBoundingClientRect().height;
			let parentHeight = this.popupContainer.getBoundingClientRect().height;
			if (slotHeight > parentHeight) {
				return this.$slots.default[0].elm;
			}
			return this.popupContainer;
		},

		getFitPos(rect) {
			// 目前判断是否可展示下是针对于整个页面，没有针对父容器
			let elRect = this.triggerEl.getBoundingClientRect();
			let parentRect = document.body.getBoundingClientRect();
			if (this.placement.indexOf('left') === 0) {
				if (elRect.x - this.$el.offsetWidth < 0) {
					this.fitPos = this.fitPos.replace('left', 'right');
				}
			} else if (this.placement.indexOf('right') === 0) {
				let remanentWidth = window.innerWidth - elRect.x - elRect.width - this.$el.offsetWidth;
				if (remanentWidth < 0) {
					this.fitPos = this.fitPos.replace('right', 'left');
				}
			} else if (this.placement.indexOf('top') === 0) {
				if (elRect.y - this.$el.offsetHeight < 0) {
					this.fitPos = this.fitPos.replace('top', 'bottom');
				}
			} else if (this.placement.indexOf('bottom') === 0) {
				let remanentHeight = window.innerHeight - elRect.y - elRect.height - this.$el.offsetHeight;
				if (remanentHeight < 0) {
					this.fitPos = this.fitPos.replace('bottom', 'top');
				}
			}
			
		},

		// set
		setPopperStyle() {
			let rect;
			if (this.getPopupContainer) { // 基于传入的容器节点
				let elRect = this.triggerEl.getBoundingClientRect();
				let parentRect = this.$el.parentElement.getBoundingClientRect();
				let y = elRect.y - parentRect.y;
				let x = elRect.x - parentRect.x;
				if (x < 0 || y < 0) {
					return console.error('【 vc-popover 】: getPopupContainer选择节点应为容器元素');
				}
				rect = {
					y,
					x,
					height: elRect.height,
					width: elRect.width
				};
			} else if (!this.transfer) { // 基于父节点
				rect = {
					y: 0,
					x: 0,
					height: this.triggerEl.offsetHeight,
					width: this.triggerEl.offsetWidth
				};
			} else {
				rect = this.triggerEl.getBoundingClientRect(); // 基于body
				rect.y = document.scrollingElement.scrollTop + rect.y;
			}
			
			this.getFitPos(rect);
			this.$el && this.getPopupStyle(rect);
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
export const Func = CreateProtal({}, popup);
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
	// 动画
	&.am-popup-enter-active {
		transition: all .2s $ease-out-circ;
	}
	&.am-popup-leave-active {
		transition: all .2s $ease-in-out-circ;
		
	}
	&.am-popup-enter, &.am-popup-leave-active {
		opacity: 0;
		transform: scale(.7)
	}
}

</style>
