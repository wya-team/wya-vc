export default {
	props: {
		// 面板内的value统一为数组格式
		value: Array,
		format: String,
		disabledDate: {
			type: Function,
			default: () => false
		},
		shortcuts: {
			type: Array,
			default: () => ([])
		},
		startDate: Date,
		focusedDate: [Date, Array],
		showTime: {
			type: Boolean,
			default: false
		},
		timePickerOptions: {
			type: Object,
			default: () => ({})
		}
	},
};
