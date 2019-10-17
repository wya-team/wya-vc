
<template>
	<component 
		:is="tag" 
		style="position: relative;"
		@focus="isFocus && handleChange($event, { visible: true })"
		@blur="isFocus && handleChange($event, { visible: false })"
		@mouseenter="isHover && handleChange($event, { visible: true })"
		@mouseleave="isHover && handleChange($event, { visible: false })"
		@click="isClick && handleChange($event, { visible: !isActive })"
	>
		<slot />
	</component>
</template>

<script>
import { pick } from 'lodash';
import { DOM } from '@wya/utils';
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
			'animation', 
			'placement', 
			'theme', 
			'content', 
			'getPopupContainer', 
			'portal', 
			'arrow',
			'portalClassName',
			'portalStyle',
			'autoWidth',
			'always'
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
			return this.trigger === 'hover' && !this.always;
		},
		isClick() {
			return this.trigger === 'click' && !this.always;
		},
		isFocus() {
			return this.trigger === 'focus' && !this.always;
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
					hover: this.isHover,
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
		 * visible: true, false, undefined(处理 doc click)
		 */
		handleChange(e = {}, { visible, context }) {
			visible = this.always || visible;
			if (this.disabled) return;

			this.isHover && this.timer && clearTimeout(this.timer);
			let path = e.path || DOM.composedPath(e) || [];

			let isPopArea = path.some(item => new RegExp(this.popoverId).test(item.className));

			if (!this.portal && isPopArea) return;

			// document click
			if (visible === undefined) {
				if (!isPopArea && !this.$el.contains(e.target)) {
					visible = false;
				} else {
					return;
				}
			}

			if (visible != this.isActive) {
				let callback = () => {
					this.isActive = visible;

					this.sync();
				};
				this.isHover && visible === false 
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
