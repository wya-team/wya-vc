import Emitter from '../extends/mixins/emitter';

export default {
	name: 'vc-switch',
	components: {},
	mixins: [Emitter],
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
		handdleToggle(e, callback) {
			e.preventDefault();

			if (this.disabled || this.loading) {
				return false;
			}

			let { $listeners: { click } } = this;
			let fn = click && click(e, callback);

			if (fn && fn.then) {
				this.loading = true;
				fn.then((res) => {
					return res;
				}).catch((res) => {
					return Promise.reject(res);
				}).finally(() => {
					this.loading = false;
				});
			}


			this.currentValue = this.currentValue === this.trueValue 
				? this.falseValue 
				: this.trueValue;

			this.sync();
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