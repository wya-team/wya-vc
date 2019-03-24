<template>
	<transition :name="animate || `am-popup`" @after-leave="handleRemove">
		<div 
			v-show="show"
			ref="popper"
			:style="popStyle" 
			:class="popClass"
			class="vc-popover" 
			style="transform-origin: 100% 16px;"
			@mouseover="handleMouseOver"
			@mouseout="handleMouseOut"
		>
			<div class="_popover-container">
				<div v-if="arrow" :class="arrowClass" class="__arrow" />
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
	components: {

	},
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
				].indexOf(value) !== -1;
			}
		},
		trigger: {
			type: String,
			default: 'hover',
			validator: (value) => (['hover', 'click', 'focus'].indexOf(value) !== -1)
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
		popContainer: HTMLElement,
		onMouseOver: Function,
		onMouseOout: Function,
	},
	data() {
		return {
			show: false,
			popStyle: {},
			fitPlacement: this.placement
		};
	},
	computed: {
		popClass() {
			return `vc-popover-${this.fitPlacement}`;
		},
		arrowClass() {
			let placement = this.fitPlacement.split('-')[0];
			return `__arrow-${placement}-basic __arrow-${this.fitPlacement}`;
		}
	},
	watch: {
		
	},
	created() {
	},
	mounted() {
		this.popper = this.$refs.popper;
		this.show = true;
		this.$nextTick(() => {
			this.setPopperStyle();
		});
	},
	updated() {
		
	},
	methods: {
		getFitPlacement(rect) {
			// 目前判断是否可展示下是针对于整个页面，没有针对父容器
			let elmRect = this.popContainer.getBoundingClientRect();
			let parentRect = document.body.getBoundingClientRect();
			if (this.placement.indexOf('left') === 0) {
				if (elmRect.x - this.popper.offsetWidth < 0) {
					this.fitPlacement = this.fitPlacement.replace('left', 'right');
				}
			} else if (this.placement.indexOf('right') === 0) {
				let remanentWidth = window.innerWidth - elmRect.x - elmRect.width - this.popper.offsetWidth;
				if (remanentWidth < 0) {
					this.fitPlacement = this.fitPlacement.replace('right', 'left');
				}
			} else if (this.placement.indexOf('top') === 0) {
				if (elmRect.y - this.popper.offsetHeight < 0) {
					this.fitPlacement = this.fitPlacement.replace('top', 'bottom');
				}
			} else if (this.placement.indexOf('bottom') === 0) {
				let remanentHeight = window.innerHeight - elmRect.y - elmRect.height - this.popper.offsetHeight;
				if (remanentHeight < 0) {
					this.fitPlacement = this.fitPlacement.replace('bottom', 'top');
				}
			}
			
		},
		// set
		setPopperStyle() {
			let rect;
			if (this.getPopupContainer) { // 基于传入的容器节点
				let elmRect = this.popContainer.getBoundingClientRect();
				let parentRect = this.$el.parentElement.getBoundingClientRect();
				let y = elmRect.y - parentRect.y;
				let x = elmRect.x - parentRect.x;
				if (x < 0 || y < 0) {
					return console.error('【 vc-popover 】: getPopupContainer选择节点应为容器元素');
				}
				rect = {
					y,
					x,
					height: elmRect.height,
					width: elmRect.width
				};
			} else if (!this.transfer) { // 基于父节点
				rect = {
					y: 0,
					x: 0,
					height: this.popContainer.offsetHeight,
					width: this.popContainer.offsetWidth
				};
			} else {
				rect = this.popContainer.getBoundingClientRect(); // 基于body
				rect.y = document.scrollingElement.scrollTop + rect.y;
			}
			
			this.getFitPlacement(rect);
			this.popper && this.getPopupStyle(rect);
		},
		handleMouseOver() {
			this.onMouseOver && this.onMouseOver();
		},
		handleMouseOut() {
			this.onMouseOut && this.onMouseOut();
		},
		handleRemove() {
			this.show = false;
			this.$emit('close');
		},
	},
};

export default popup;
export const Func = CreateProtal({}, popup);
</script>

<style lang="scss" scoped>
.vc-popover {
	position: absolute;
	transition: top .02s linear, left .02s linear;
	z-index: 1001;
	._popover-container {
		background-color: #ffffff;
		padding: 5px 12px;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		.__arrow {
			background: transparent;
			width: 9px;
			height: 9px;
			transform: rotate(45deg);
			position: absolute;
			display: block;
			border-width: 4px;
			border-style: solid;
		}
		// arrow-top
		.__arrow-top-basic {
			bottom: 4px;
			box-shadow: 3px 3px 7px rgba(0,0,0,0.07);
			border-top-color: transparent;
			border-right-color: #fff;
			border-bottom-color: #fff;
			border-left-color: transparent;
		}
		.__arrow-top {
			left: 50%;
			transform: translateX(-50%) rotate(45deg);
		} 
		.__arrow-top-left {
			left: 16px;
		}
		.__arrow-top-right {
			right: 16px;
		}
		// arrow-bottom
		.__arrow-bottom-basic {
			top: 4px;
			box-shadow: -2px -2px 5px rgba(0,0,0,0.06);
			border-top-color: #fff;
			border-right-color: transparent;
			border-bottom-color: transparent;
			border-left-color: #fff;
		}
		.__arrow-bottom {
			left: 50%;
			transform: translateX(-50%) rotate(45deg);
		}
		.__arrow-bottom-left {
			left: 16px;
		}
		.__arrow-bottom-right {
			right: 16px;
		}
		// arrow-right
		.__arrow-right-basic {
			left: 4px;
			box-shadow: -3px 3px 7px rgba(0,0,0,0.07);
			border-top-color: transparent;
			border-right-color: transparent;
			border-bottom-color: #fff;
			border-left-color: #fff;
		}
		.__arrow-right {
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
		}
		.__arrow-right-top {
			top: 12px;
		}
		.__arrow-right-bottom {
			bottom: 12px;
		}
		// arrow-left
		.__arrow-left-basic {
			right: 4px;
			box-shadow: 3px -3px 7px rgba(0,0,0,0.07);
			border-top-color: #fff;
			border-right-color: #fff;
			border-bottom-color: transparent;
			border-left-color: transparent;
		}
		.__arrow-left {
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
		}
		.__arrow-left-top {
			top: 12px;
		}
		.__arrow-left-bottom {
			bottom: 12px;
		}
	}
}
// popper距离触发节点的距离
.vc-popover-top, .vc-popover-top-left, .vc-popover-top-right {
	padding-bottom: 8px;
}
.vc-popover-bottom, .vc-popover-bottom-left, .vc-popover-bottom-right {
	padding-top: 8px;
}
.vc-popover-left, .vc-popover-left-top, .vc-popover-left-bottom {
	padding-right: 8px;
}
.vc-popover-right, .vc-popover-right-top, .vc-popover-right-bottom {
	padding-left: 8px;
}
// 动画
.am-popup-enter-active {
	transition: all .2s cubic-bezier(0.08, 0.82, 0.17, 1);
}
.am-popup-leave-active {
	transition: all .2s cubic-bezier(0.78, 0.14, 0.15, 0.86);
	
}
.am-popup-enter, .am-popup-leave-active {
	opacity: 0;
	transform: scale(.9)
}
</style>
