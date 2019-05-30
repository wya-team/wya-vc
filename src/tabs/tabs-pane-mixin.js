export default {
	props: {
		name: {
			type: String
		},
		label: {
			type: [String, Function],
			default: ''
		},
		lazy: {
			type: Boolean,
			default: true
		}
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
			};
		}
	},
	watch: {
		// value
		name: {
			immediate: true,
			handler(v) {
				this.currentName = name;
				this.refresh();
			}
		},
		label() {
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