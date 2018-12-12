import { debounce } from 'lodash';

export default {
	name: "vc-debounce-click",
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
				return debounce(callback, wait);
			}
		}
	},
	render(h) {
		return h(this.tag, {
			on: {
				click: this.handleClick(this.$listeners.click)
			}
		}, this.$slots.default);
	}
};
