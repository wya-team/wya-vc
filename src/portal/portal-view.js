import Portal from './portal';
import { getUid } from '../utils';

const WRAPPER_COMPONENT = { 
	name: 'vc-portal-slot',
	render(h) {
		return h('div', this.$slots.content);
	}
};

export default {
	name: 'vc-portal-view',
	inheritAttrs: true,
	props: {
		
	},
	created() {
		if (this.wrapper) return; // 避免HRM重复注入
		this.wrapper = new Portal(WRAPPER_COMPONENT, {
			cName: getUid('portal-view'),
			multiple: false,
			promise: false,
			// 避免在路由切换时被卸载闪白
			autoDestroy: false
		});
	},

	mounted() {
		if (this.vm) return; // 避免HRM重复注入
		this.vm = this.wrapper.popup({
			$slots: this.$slots,
			// $scopedSlots: this.$scopedSlots,
			$parent: this.$parent,
		});
		// 需要触发一次，才可以建立关系
		this.vm.$forceUpdate();
	},

	destroyed() {
		this.wrapper.destroy();
		this.wrapper = null;
	},

	render(h) {
		/**
		 * 考虑占位的情况下需要渲染default
		 */
		return this.$slots.default
			 ? h('div', { class: 'vc-portal-view' }, this.$slots.default)
			 : null;
	}
};