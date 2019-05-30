
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
import { getUid } from '../utils/index';
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
			'portal', 
			'arrow',
			'portalClassName',
			'portalStyle',
			'autoWidth'
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
		disabled: {
			type: Boolean,
			default: false
		}
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
			}
		},
		isActive(v) {
			this._isMounted && this.refresh();
		}
	},
	created() {
		this.popoverId = getUid('popover');
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
					: this.portal 
						? document.body 
						: this.$el;
				let { portalClassName } = this;

				typeof portalClassName === 'object' 
					? portalClassName instanceof Array 
						? portalClassName.push(this.popoverId)
						: (portalClassName[this.popoverId] = true)
					: (portalClassName += ` ${this.popoverId}`);

				this.popperInstance = Func.popup({
					el,
					cName: this.popoverId,
					triggerEl: this.$el,
					onChange: ::this.handleChange,
					onClose: () => this.$emit('close'),
					onReady: () => this.$emit('ready'),
					isHover: this.isHover,
					/**
					 * 传送门通信控制
					 */
					$slots: this.$slots,
					$parent: this.$parent,
					...this.$props,
					portalClassName
				});
			} else if (this.popperInstance) {
				this.popperInstance.isActive = false;
			}
		},
		/**
		 * portal: false
		 * 是直接挂在父节点上的，
		 * 点击pop内容区域时click事件冒泡，导致执行了该toggle方法
		 * v: true, false, undefined(处理 doc click)
		 */
		handleChange(e = {}, v) {
			if (this.disabled) return;

			this.isHover && this.timer && clearTimeout(this.timer);
			let path = e.path || (e.composedPath && e.composedPath()) || [];

			let isPopArea = path.some(item => new RegExp(this.popoverId).test(item.className));

			if (!this.portal && isPopArea) return;

			// document click
			if (v === undefined) {
				if (!isPopArea && !this.$el.contains(e.target)) {
					v = false;
				} else {
					return;
				}
			}

			if (v != this.isActive) {
				let callback = () => {
					this.isActive = v;

					this.sync();
				};
				this.isHover && v === false 
					? (this.timer = setTimeout(callback, 200))
					: callback();
			} 
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			this.$emit('visible-change', this.isActive);
		}
	}

};
</script>
