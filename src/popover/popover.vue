
<template>
	<component 
		:is="tag" 
		style="position: relative;"
		@focus="isFocus && handleChange($event, true)"
		@blur="isFocus && handleChange($event, false)"
		@mouseenter="isHover && handleChange($event, true)"
		@mouseleave="isHover && handleChange($event, false)"
		@click="isClick && handleChange($event, !isActive)"
	>
		<slot />
	</component>
</template>

<script>
import { pick } from 'lodash';
import Core, { Func } from './core';

export default {
	name: "vc-popover",
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	props: {
		...pick(Core.props, [
			'visible', 
			'animate', 
			'placement', 
			'theme', 
			'content', 
			'getPopupContainer', 
			'transfer', 
			'arrow'
		]),
		trigger: {
			type: String,
			default: 'hover',
			validator: v => /(hover|click|focus)/.test(v)
		},
		tag: {
			type: String,
			default: 'span'
		},
	},
	data() {
		return {
			isActive: false
		};
	},
	computed: {
		// trigger切换, Vue同时会对相关事件卸载
		isHover() {
			return this.trigger === 'hover';
		},
		isClick() {
			return this.trigger === 'click';
		},
		isFocus() {
			return this.trigger === 'focus';
		}
	},
	watch: {
		visible: {
			immediate: true,
			handler(v, old) {
				this.isActive = v;

				this._isMounted && this.refresh();
			}
		}
	},
	mounted() {
		this.isActive && this.refresh();
	},
	destroyed() {
		this.popperInstance && this.popperInstance.$emit('destroy');
	},
	methods: {
		refresh() {
			if (this.isActive) {
				let el = this.getPopupContainer 
					? this.getPopupContainer()
					: this.transfer 
						? document.body 
						: this.$el;
				this.popperInstance = Func.popup({
					el,
					popupContainer: this.$el,
					slots: this.$slots,
					onChange: ::this.handleChange,
					onClose: () => this.$emit('close'),
					onReady: () => this.$emit('ready'),
					isHover: this.isHover,
					...this.$props,
				});
			} else if (this.popperInstance) {
				this.popperInstance.isActive = false;
			}
		},
		/**
		 * transfer: false
		 * 是直接挂在父节点上的，
		 * 点击pop内容区域时click事件冒泡，导致执行了该toggle方法
		 * v: true, false, undefined(处理 doc click)
		 */
		handleChange(e = {}, v) {
			this.isHover && this.timer && clearTimeout(this.timer);
			let path = e.path || (e.composedPath && e.composedPath()) || [];
			let isPopArea = path.some(item => /vc-popover-core/.test(item.className));

			if (!this.transfer && isPopArea) return;

			// doc click
			if (v === undefined) {
				if (!isPopArea && !this.$el.contains(e.target)) {
					v = false;
				} else {
					return;
				}
			}

			if (v != this.isActive) {
				let callback = () => {
					this.$emit('visible-change', v);
					this.isActive = v;
					this.refresh();
				};
				this.isHover && v === false 
					? (this.timer = setTimeout(callback, 200))
					: callback();
			} 
		}
	}
};
</script>
