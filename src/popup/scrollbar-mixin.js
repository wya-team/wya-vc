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
		this.__INIT__ = document.body.style.height;
	},
	/**
	 * 被强制清理时触发
	 */
	beforeDestroy() {
		this.setScrollBar(false);
	},
	methods: {
		setScrollBar(v) {
			if (!this._isMounted || this.__INIT__ === '100vh') return;

			if (v) {
				document.body.style.height = '100vh';
			} else {
				// document.body.style.height = '';
				document.body.style.removeProperty("height");
			}
		}
	}
};