import Extends from '../extends';

export default {
	name: 'vc-switch',
	components: {},
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: [String, Number, Boolean],
			default: false
		},
		trueValue: {
			type: [String, Number, Boolean],
			default: true
		},
		falseValue: {
			type: [String, Number, Boolean],
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		name: {
			type: String
		},
		openText: {
			type: String,
			default: ''
		},
		closeText: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			currentValue: '',
			loading: false
		};
	},
	computed: {
		classes() {
			return {
				'is-loading': this.loading,
				'is-checked': this.checked
			};
		},
		checked() {
			return this.currentValue === this.trueValue;
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v;
			}
		},
		currentValue(v) {
			// ..
		}
	},
	methods: {
		handdleToggle(e) {
			e.preventDefault();

			if (this.disabled || this.loading) {
				return false;
			}

			let callback = () => {
				let value = this.currentValue === this.trueValue 
					? this.falseValue 
					: this.trueValue;

				this.reset(value);
				this.sync();
			};

			let { $listeners: { click } } = this;
			let fn = click && click(e, callback, this.reset);

			if (fn && fn.then) {
				this.loading = true;
				fn.then((res) => {
					return res;
				}).catch((res) => {
					return Promise.reject(res);
				}).finally(() => {
					this.loading = false;
				});
			} else if (!fn) {
				callback();
			}
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			this.$emit('change', this.currentValue, this.reset);
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		},
		reset(value) {
			this.currentValue = value === this.trueValue 
				? this.trueValue
				: this.falseValue;
		},
	}
};