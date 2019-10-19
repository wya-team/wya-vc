export default {
	methods: {
		/**
		 * 外部方法扩展
		 */
		focus() {
			this.$refs.input.focus();
		},
		blur() {
			this.$refs.input.blur();
		},
		click() {
			this.$refs.input.click();
			this.focus();
		}
	}
};