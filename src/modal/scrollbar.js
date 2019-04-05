export default {
	watch: {
		isActive: {
			immediate: false, // 非立即的
			handler(v) {
				this.setScrollBar(v);
			}
		}
	},
	mounted() {
		// 初始值
		this.__INIT__ = document.body.style.overflow;
	},
	/**
	 * 被强制清理时触发
	 */
	beforeDestroy() {
		this.setScrollBar(false);
	},
	methods: {
		setScrollBar(v) {
			if (this.scrollable || !this._isMounted || this.__INIT__ === 'hidden') return;

			if (v) {
				document.body.style.overflow = 'hidden';
			} else {
				// document.body.style.overflow = '';
				document.body.style.removeProperty("overflow");
			}
		}
	}
};