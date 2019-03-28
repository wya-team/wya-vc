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
import PopoverProps from './props';
import { Func } from './core';

const config = {
	name: "vc-popover",
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	mixins: [Popper],
	props: {
		...PopoverProps
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
					this.popperInstance && this.popperInstance.close();
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
		switch (this.trigger) {
			case 'hover':
				this.popContainer.addEventListener('mouseenter', this.handleMouseOver);
				this.popContainer.addEventListener('mouseleave', this.handleMouseOut);
				break;
			case 'click':
				this.popContainer.addEventListener('click', this.handleTriggerClick);
				document.addEventListener('click', this.handleDocumentClick);
				break;
			case 'focus':
				this.popContainer.addEventListener('focus', this.handleSlotFocus);
				this.popContainer.addEventListener('blur', this.handleSlotBlur);
				break;
			default:
				break;
		}
	},
	destroyed() {
		switch (this.trigger) {
			case 'hover':
				this.popContainer.removeEventListener('mouseenter', this.handleMouseOver);
				this.popContainer.removeEventListener('mouseleave', this.handleMouseOut);
				break;
			case 'click':
				this.popContainer.removeEventListener('click', this.handleTriggerClick);
				document.removeEventListener('click', this.handleDocumentClick);
				break;
			case 'focus':
				this.popContainer.removeEventListener('focus', this.handleSlotFocus);
				this.popContainer.removeEventListener('blur', this.handleSlotBlur);
				break;
			default:
				break;
		}
		this.popperInstance && this.popperInstance.$emit('destroy');
	},
	methods: {
		// get
		getParentNode() {
			if (this.getPopupContainer) return this.getPopupContainer();
			
			return this.transfer ? document.body : this.$el;
		},
		setShow(value) {
			this.show = value;
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
		handleSlotFocus() {
			this.setShow(true);
		},
		handleSlotBlur() {
			this.setShow(false);
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

<style lang='scss'>
</style>