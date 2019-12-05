import { debounce } from 'lodash';

export default {
	name: "vc-debounce-click",
	inheritAttrs: false,
	props: {
		wait: {
			type: Number,
			default: 0.25
		},
		tag: {
			type: [String, Object, Function],
			default: 'div'
		}
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick(callback) {
			const { wait } = this;
			if (callback) {
				// TODO: 时间转换成秒为单位
				return debounce(callback, wait > 50 ? wait : wait * 1000, {
					leading: true,
					trailing: false
				});
			}
		}
	},
	render(h) {
		return h(this.tag, {
			attrs: this.$attrs,
			on: {
				click: this.handleClick(this.$listeners.click)
			},
			props: {
				...this.$props
			}
		}, this.$slots.default);
	}
};
