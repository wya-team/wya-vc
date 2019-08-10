import Extends from '../extends';

export default {
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		value: {
			type: [String, Number, Boolean],
			default: false
		},
		label: {
			type: [String, Number, Boolean]
		},
		name: {
			type: String
		},
		/**
		 * group模式下无效
		 */
		trueValue: {
			type: [String, Number, Boolean],
			default: true
		},
		falseValue: {
			type: [String, Number, Boolean],
			default: false
		},
	},
	inject: {
		group: {
			from: 'radioGroup',
			default: () => undefined
		}
	},
	data() {
		return {
			currentValue: undefined,
			isFocus: false
		};
	},
	computed: {
		classes() {
			return { 
				'is-checked': this.checked, 
				'is-disabled': this.disabled,
				'is-focus': this.isFocus,
			};
		},
		radioName() {
			return this.group 
				? this.group.name
				: this.name;
		},
		checked() {
			return this.group 
				? this.group.currentValue === this.label
				: this.currentValue === this.trueValue;
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v;
			}
		},
		currentValue(v, old) {
			// ...
		}
	},
	methods: {
		handleChange(e) {
			if (this.disabled) {
				return false;
			}
			let checked = e.target.checked;

			if (this.group) {
				this.group.reset(this.label);
				this.group.sync(e);
			} else {
				this.reset(checked);
				this.sync(e);
			}
		},
		handleBlur() {
			this.isFocus = false;
		},
		handleFocus() {
			this.isFocus = true;
		},

		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync(e) {
			this.$emit('change', this.currentValue, e, this.reset);
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		},
		reset(checked) {
			this.currentValue = checked ? this.trueValue : this.falseValue;
		}
	}
};