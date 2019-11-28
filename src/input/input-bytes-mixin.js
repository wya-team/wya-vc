export default {
	data() {
		return {
			curMaxlength: this.maxlength
		};
	},
	watch: {
		maxlength: {
			immediate: false,
			handler(v) {
				this.curMaxlength = v;
			}
		}
	},
	methods: {
		handlePaste(e) {
			// 只有在bytes下,会需要重新计算maxlength
			if (this.bytes) {
				let content = this.currentValue + e.clipboardData.getData('text');
				if (!this.checkInput(content)) { e.preventDefault(); }
				this.curMaxlength = this.getMaxLength(content);
			}
		},
		// 单字节换成双字节 maxlength 需要额外加的长度
		getExtraLength(value) {
			let charArr = String(value || this.currentValue).match(/[\x20-\x7e]/g) || [];
			let charLength = charArr.length;
			if (charLength % 2 === 0) {
				return charLength /= 2;
			} else {
				return (charLength + 1) / 2;
			}
		},
		// 输入框内容允许输入的长度
		getMaxLength(value) {
			if (!this.bytes) return this.maxlength;
			let extraLength = this.getExtraLength(value);
			return this.maxlength + extraLength;
		},
		checkInput(value) {
			let charLength = (value.match(/[\x20-\x7e]/g) || []).length;
			let chineseLength = value.length - charLength;
			if ((charLength + chineseLength * 2) > this.maxlength * 2) {
				return false;
			}
			return true;
		},
	}
};