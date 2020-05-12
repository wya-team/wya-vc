import { IS_SERVER } from '../utils/constant';

export default {
	props: {
		name: {
			type: String
		},
		label: {
			type: [String, Function],
			default: ''
		},
		/**
		 * 服务端渲染时，lazy设置为false，可以把内容渲染出来;
		 * 不能设置为!IS_SERVER, 会影响客服端激活，不一样会存在问题
		 */
		lazy: {
			type: Boolean,
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			currentName: undefined,
			isLoaded: false
		};
	},
	computed: {
		isActive() {
			let state = this.$parent.currentName === (this.name || this.currentName);

			// 副作用
			if (!this.isLoaded && state) {
				this.isLoaded = true; // eslint-disable-line
			}
			return state;
		},
		isReady() {
			return !this.lazy || this.isLoaded || this.isActive;
		},
		style() {
			return this.isActive ? {} : { 
				opacity: 0,
				height: 0, // 避免重用高度
				overflow: 'hidden', // 避免内层的高度影响
			};
		}
	},
	watch: {
		// value
		name: {
			immediate: true,
			handler(v) {
				this.currentName = v;
				this.refresh();
			}
		},
		label() {
			this.refresh();
		},
		disabled() {
			this.refresh();
		}
	},
	mounted() {
		this.refresh();
	},
	destroyed() {
		this.refresh();
	},
	methods: {
		refresh() {
			this._isMounted && this.$parent.refresh();
		}
	}
};