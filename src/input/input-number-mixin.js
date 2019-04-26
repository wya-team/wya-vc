import inputMixin from './input-mixin';
// import emitter from '../extends/mixins/emitter'; // 表单验证
import Input from './input';
import Icon from '../icon';

export default {
	// mixins: [emitter],
	props: {
		...inputMixin.props,
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: Number.MAX_SAFE_INTEGER,
		},
		step: {
			type: Number | Boolean,
			default: 1, // 为0时不展示
		},
		required: {
			type: Boolean,
			default: false
		},
		precision: {
			type: Number,
			default: Number.MAX_SAFE_INTEGER,
		}
	},
	data() {
		return {
			currentValue: this.defaultFormat(this.value),
		};
	},
	computed: {
		binds: inputMixin.computed.binds,
		hooks() {
			return {
				...this.$listeners,
				input: this.handleInput,
				blur: this.handleBlur
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
			value = value.trim();
			if (/[^-]/.test(value) && Number.isNaN(Number(value))) {
				value = this.currentValue;
			} else if (value !== '') {
				let regex = this.precision
					? new RegExp(`(.*\\.[\\d]{${this.precision}})[\\d]+`)
					: new RegExp(`(.*)\\.`);
				
				value = value.replace(regex, '$1');
				value = value.charAt(0) === '.' ? `0${value}` : value;
			}

			if (value > this.max) {
				value = this.defaultFormat(this.max);

				this.$emit('tip', {
					type: 'max',
					msg: `数值不能超过${value}`,
					value
				});
			}

			if (value < this.min) {
				value = this.defaultFormat(this.min);

				this.$emit('tip', {
					type: 'min',
					msg: `数值不能低于${value}`,
					value
				});
			}

			this.$emit('input', value);
		},
		handleBlur(e) {
			let value = this.defaultFormat(
				this.required && !this.currentValue 
					? this.min
					: this.currentValue
			);

			this.$emit('input', value);
		},
		handleStepper(base) {
			let value = +this.currentValue + this.step * base;

			this.handleInput(this.defaultFormat(value));
		},
		defaultFormat(value) {
			typeof value === 'number' && (value = String(value));
			if (value === '') return value;

			let length = this.precision - (value.split('.')[1] ? value.split('.')[1].length : 0);
			let suffix = Array.from({ length }, () => '0').join('');

			return `${value}${!this.precision || value.includes('.') ? '' : '.'}${suffix}`;
		}
	}
};