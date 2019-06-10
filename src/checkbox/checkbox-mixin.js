import Emitter from '../extends/mixins/emitter';

export default {
	mixins: [Emitter],
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
		indeterminate: {
			type: Boolean,
			default: false
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
			from: 'checkboxGroup',
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
				'is-indeterminate': this.indeterminate, 
				'is-checked': this.checked, 
				'is-disabled': this.disabled,
				'is-focus': this.isFocus,
			};
		},
		hasGroup() {
			return !this.group;
		},
		checked() {
			return this.group 
				? this.group.currentValue.includes(this.label)
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
			// ..
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
			} else {
				this.currentValue = checked ? this.trueValue : this.falseValue;

				this.sync();
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
		sync() {
			this.$emit('change', this.currentValue);
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		}
	}
};