export default {
	visible: Boolean,
	animate: String,
	placement: {
		type: String,
		default: 'bottom',
		validator: (value) => {
			return [
				'bottom', 'bottom-left', 'bottom-right',
				'top', 'top-left', 'top-right',
				'right', 'right-top', 'right-bottom',
				'left', 'left-top', 'left-bottom'
			].includes(value);
		}
	},
	trigger: {
		type: String,
		default: 'hover',
		validator: (value) => ['hover', 'click', 'focus'].includes(value)
	},
	theme: {
		type: String,
		default: 'light',
		validator: (value) => ['light', 'dark'].includes(value)
	},
	content: String,
	getPopupContainer: Function,
	transfer: {
		type: Boolean,
		default: true
	},
	arrow: { // 是否显示箭头
		type: Boolean,
		default: true
	}
};