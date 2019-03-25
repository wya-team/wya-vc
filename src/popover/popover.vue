<!--
TODO
1. 各个方位的呼出动画
-->
<template>
	<span ref="popupContainer" style="position: relative">
		<slot />
	</span>
</template>

<script>
import Popper from './popper';
import { Func } from './core';

const config = {
	name: "vc-popover",
	model: {
		prop: 'visible',
		event: 'visible-change'
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
		}
	},
	data() {
		return {
			show: this.visible
		};
	},
	watch: {
		visible: {
			immediate: true,
			handler(val) {
				this.show = val;
			}
		},
		show: {
			immediate: true,
			handler(val) {
				this.$emit('visible-change', val);
				if (val) {
					this.$nextTick(() => {
						this.parentNode = this.getParentNode();
						Func.popup({
							el: this.parentNode,
							...this.$props,
							popContainer: this.popContainer,
							slots: this.$slots,
							onMouseOver: this.handleMouseOver.bind(this),
							onMouseOut: this.handleMouseOut.bind(this),
							getInstance: vm => { 
								this.popperInstance = vm; 
								this.popper = vm.$el; 
							}
						}).then((result) => {
						}).catch((err) => {
						});
					});
				} else {
					this.popperInstance && this.popperInstance.handleRemove();
				}
			}
		}
	},
	mounted() {
		this.popContainer = this.$el;
		if (this.trigger === 'focus') {
			if (!this.$slots.default[0].elm) {
				return console.error('【 vc-popover 】: trggier为focus的模式下默认插槽必须是一个有focus和blur事件的节点');
			}
			this.popContainer = this.$slots.default[0].elm;
		}
		if (this.trigger === 'hover') {
			this.popContainer.addEventListener('mouseenter', this.handleMouseOver);
			this.popContainer.addEventListener('mouseleave', this.handleMouseOut);
		} else if (this.trigger === 'click') {
			this.popContainer.addEventListener('click', this.handleTriggerClick);
			document.addEventListener('click', this.handleDocumentClick);
		} else if (this.trigger === 'focus') {
			this.popContainer.addEventListener('focus', this.handleSlotFocus);
			this.popContainer.addEventListener('blur', this.handleSlotBlur);
		}
	},
	destroyed() {
		if (this.trigger === 'hover') {
			this.popContainer.removeEventListener('mouseenter', this.handleMouseOver);
			this.popContainer.removeEventListener('mouseleave', this.handleMouseOut);
		} else if (this.trigger === 'click') {
			this.popContainer.removeEventListener('click', this.handleTriggerClick);
			document.removeEventListener('click', this.handleDocumentClick);
		} else if (this.trigger === 'focus') {
			this.popContainer.removeEventListener('focus', this.handleSlotFocus);
			this.popContainer.removeEventListener('blur', this.handleSlotBlur);
		}
		this.popperInstance && this.popperInstance.$emit('destroy');
	},
	methods: {
		// get
		getParentNode() {
			if (this.getPopupContainer) return this.getPopupContainer();
			
			return this.transfer ? document.body : this.$el;
		},
		// handle
		handleMouseOver() {
			if (this.trigger !== 'hover') return;
			this.timer && clearTimeout(this.timer);
			this.setShow(true);
		},
		handleMouseOut() {
			if (this.trigger !== 'hover') return;
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.setShow(false);
			}, 200);
		},
		handleSlotFocus() {
			this.setShow(true);
		},
		handleSlotBlur() {
			this.setShow(false);
		},
		handleTriggerClick(e) {
			// 因为transfer为false时，是直接挂在父节点上的，点击pop内容区域时click事件冒泡，导致执行了该toggle方法
			if (!this.transfer && this.isPopArea(e)) return;
			this.setShow(!this.show);
		},
		handleDocumentClick(e) {
			// 不能更createProtal中的click监听方法同名
			if (!this.$el.contains(e.target) && !this.isPopArea(e)) {
				this.setShow(false);
			}		
		},
		setShow(value) {
			this.show = value;
		},
		// 是否在pop弹层区域
		isPopArea(e) {
			let path = e.path || (e.composedPath && e.composedPath()) || [];
			return path.some(item => /vc-popover/.test(item.className));
		}
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