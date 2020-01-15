export default {
	props: {
		// 面板内的value统一为数组格式
		value: Array,
		format: String,
		disabledDate: {
			type: Function,
			default: () => false
		},
		confirm: {
			type: Boolean,
			default: false
		},
		steps: {
			type: Array,
			default: () => []
		},
		disabledHours: {
			type: Array,
			default() {
				return [];
			}
		},
		disabledMinutes: {
			type: Array,
			default() {
				return [];
			}
		},
		disabledSeconds: {
			type: Array,
			default() {
				return [];
			}
		},
		hideDisabledOptions: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			isReady: false
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.isReady = true;
		});
	},
};