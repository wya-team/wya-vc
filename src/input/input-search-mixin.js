import inputMixin from './input-mixin';

export default {
	props: {
		...inputMixin.props,
		enterTxt: {
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
				input: this.handleInput
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
		handleFocusChange(isFocus) {
			this.isFocus = isFocus;
		}
	}
	
};