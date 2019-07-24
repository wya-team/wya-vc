import Portal from './portal';
import { getUid } from '../utils';

const WRAPPER_COMPONENT = { 
	name: 'vc-portal-slot',
	render(h) {
		let fn = this.$scopedSlots.content;
		return h('div', fn && fn({ portal: true }));
	}
};

export default {
	name: 'vc-portal-view',
	inheritAttrs: true,
	props: {
		repeat: {
			type: Boolean,
			default: false
		}
	},
	created() {
		if (this.wrapper) return; // 避免HRM重复注入
		this.wrapper = new Portal(WRAPPER_COMPONENT, {
			cName: getUid('portal-view'),
			multiple: false,
			promise: false
		});
	},

	mounted() {
		if (this.vm) return; // 避免HRM重复注入
		this.vm = this.wrapper.popup({
			$scopedSlots: this.$scopedSlots,
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
		let attrs = {
			style: this.$slots.default ? {} : { display: "none" },
			class: 'vc-portal-view' 
		};
		let children = [this.$slots.default];
		if (this.repeat && this.$scopedSlots.content) {
			children.push(this.$scopedSlots.content({ portal: false }));
		}

		return h('div', attrs, children);
	}
};