<!--
TODO
1. 各个方位的呼出动画
-->
<template>
	<span ref="popupContainer" style="position: relative">
		<slot />
		<transition :name="animate || `am-popup`" @after-leave="handleRemove">
			<div 
				v-if="show" 
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
					<component 
						v-else-if="Object.keys($options.components).indexOf(content) > -1" 
						:is="content" 
					/>
					<div v-else>{{ content }}</div>
				</div>
			</div>
		</transition>
	</span>
</template>

<script>
import Popper from './Popper';
import CreatePortal from '../create-portal/index';

const config = {
	name: "vc-popover",
	model: {
		prop: 'visible',
		event: 'change'
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
			validator: (value) => (['hover', 'click'].indexOf(value) !== -1)
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
		}
	},
	data() {
		return {
			show: this.visible,
			popStyle: {},
			fitPlacement: this.placement,
			fixTop: 0, // 基于body定位时，如果body滚动，会导致y的高度变化，所以在初始化时记录页面渲染时y的值
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
		show: {
			immediate: true,
			handler(newVal) {
				if (newVal) {
					this.$nextTick(() => {
						this.popper = this.$refs.popper;
						this.parentNode = this.getParentNode();
						this.parentNode.appendChild(this.popper);
						this.setPopperStyle();
					});
				}
			}
		}
	},
	mounted() {
		if (!this.$slots.default[0]) {
			return console.error('【 vc-popover 】: 请检查默认插槽是否写入');
		}
		this.triggerElm = this.$slots.default[0].elm;
		this.fixTop = this.triggerElm.getBoundingClientRect().y;
		if (this.trigger === 'hover') {
			this.triggerElm.addEventListener('mouseenter', this.handleMouseOver);
			this.triggerElm.addEventListener('mouseleave', this.handleMouseOut);
		} else if (this.trigger === 'click') {
			this.triggerElm.addEventListener('click', this.handleToggle);
			document.addEventListener('click', this.handleDocumentClick);
		}
	},
	destroyed() {
		if (this.trigger === 'hover') {
			this.triggerElm.removeEventListener('mouseenter', this.handleMouseOver);
			this.triggerElm.removeEventListener('mouseleave', this.handleMouseOut);
		} else if (this.trigger === 'click') {
			this.triggerElm.removeEventListener('click', this.handleToggle);
			document.removeEventListener('click', this.handleDocumentClick);
		}
		this.handleRemove();
	},
	methods: {
		// get
		getParentNode() {
			if (this.getPopupContainer) return this.getPopupContainer();
			
			return this.transfer ? document.body : this.$refs.popupContainer;
		},
		getFitPlacement(rect) {
			// 目前判断是否可展示下是针对于整个页面，没有针对父容器
			let elmRect = this.triggerElm.getBoundingClientRect();
			let parentRect = document.body.getBoundingClientRect();
			if (this.placement.indexOf('left') === 0) {
				if (elmRect.x - this.popper.offsetWidth < 0) {
					this.fitPlacement = this.fitPlacement.replace('left', 'right');
				}
			} else if (this.placement.indexOf('right') === 0) {
				let remanentWidth = parentRect.width - elmRect.x + elmRect.width - this.popper.offsetWidth;
				if (remanentWidth < 0) {
					this.fitPlacement = this.fitPlacement.replace('right', 'left');
				}
			} else if (this.placement.indexOf('top') === 0) {
				if (elmRect.y - this.popper.offsetHeight < 0) {
					this.fitPlacement = this.fitPlacement.replace('top', 'bottom');
				}
			} else if (this.placement.indexOf('bottom') === 0) {
				let remanentHeight = parentRect.height - elmRect.y + elmRect.height - this.popper.offsetHeight;
				if (remanentHeight < 0) {
					this.fitPlacement = this.fitPlacement.replace('bottom', 'top');
				}
			}
			
		},
		// set
		setPopperStyle() {
			let rect;
			if (this.getPopupContainer) { // 基于传入的容器节点
				let elmRect = this.triggerElm.getBoundingClientRect();
				let parentRect = this.parentNode.getBoundingClientRect();
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
					y: this.triggerElm.offsetTop,
					x: this.triggerElm.offsetLeft,
					height: this.triggerElm.offsetHeight,
					width: this.triggerElm.offsetWidth
				};
			} else {
				rect = this.triggerElm.getBoundingClientRect(); // 基于body
				rect.y = this.fixTop;
			}
			
			this.getFitPlacement(rect);
			this.popper && this.getPopupStyle(rect);
		},
		// handle
		handleMouseOver() {
			if (this.trigger !== 'hover') return;
			this.timer && clearTimeout(this.timer);
			this.show = true;
		},
		handleMouseOut() {
			if (this.trigger !== 'hover') return;
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.show = false;
			}, 200);
		},
		handleToggle() {
			this.show = !this.show;
		},
		handleDocumentClick(e) {
			// 不能更createProtal中的click监听方法同名
			let path = e.path || (e.composedPath && e.composedPath()) || [];
			if (!this.$el.contains(e.target) && !path.some(item => /vc-popover/.test(item.className))) {
				this.handleClose();
			}		
		},
		handleRemove() {
			// this.popper && this.parentNode.removeChild(this.popper);
			this.popper = null;
			this.fitPlacement = this.placement; // reset
		},
		handleClose(e) {
			this.show = false;
		},
	}
};

export default config;

export const createPopover = (opts = {}) => {
	return { ...config, ...opts };
};

</script>

<style lang='scss' scoped>
.vc-popover {
	position: absolute;
	transition: top .02s linear, left .02s linear;
	z-index: 999;
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