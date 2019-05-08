import { debounce } from 'lodash';

export default {
	name: "vc-debounce-click",
	inheritAttrs: false,
	props: {
		wait: {
			type: Number,
			default: 250
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
				return debounce(callback, wait, {
					leading: true
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
