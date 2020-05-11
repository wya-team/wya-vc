import inputMixin from './input-mixin';

export default {
	props: {
		...inputMixin.props,
		enterText: {
			type: Boolean | String,
			default: true
		}
	},
	data() {
		return {
			currentValue: this.value,
			isFocus: false
		};
	},
	computed: {
		binds: inputMixin.computed.binds,
		hooks() {
			return {
				...this.$listeners,
				input: this.handleInput,
				focus: this.handleFocus,
				blur: this.handleBlur,
			};
		}
	},
	watch: {
		value: {
			immediate: false,
			handler(v) {
				this.currentValue = v;
			}
		}
	},
	methods: {
		handleInput(value, e) {
			this.$emit('input', value, e);
		},
		handleSearch() {
			if (this.disabled) return false;

			this.$refs.input.focus();
			this.$emit('enter', this.currentValue);
		},
		handleFocus(e) {
			this.isFocus = true;
			if (this.focusEnd) {
				let length = this.currentValue.length;
				// hack chrome浏览器的BUG：setSelectionRange() for input/textarea during onFocus fails when mouse clicks
				setTimeout(() => {
					e.srcElement.setSelectionRange(length, length);
				}, 0);
			}
			this.$emit('focus', e);
		},
		handleBlur(e) {
			this.isFocus = false;
			this.$emit('blur', e);
		}
	}
};