import inputMixin from './input-mixin';
import { VcError } from '../vc/index';
import Input from './input';
import Icon from '../icon';

export default {
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
			// default: Number.MAX_SAFE_INTEGER,
			default: 0,
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
		},
		addDisabled() {
			return this.currentValue >= this.max;
		},
		minusDisabled() {
			return this.currentValue <= this.min;
		}
	},
	watch: {
		value: {
			immediate: false,
			handler(v) {
				this.currentValue = v;

				/**
				 * TODO: form-item-mixin 默认校正string, 待修复后可删除
				 */
				if (typeof v === 'number') {
					this.$emit('input', this.defaultFormat(v));
				}
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

			value = this.compareWithBoundary({ value, format: false });

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
		async handleStepper(base) {
			let { $listeners: { add, minus, before } } = this;

			if (base === 1 && add) { return add(); }
			if (base === -1 && minus) { return minus(); }

			let value = +this.currentValue + this.step * base;
			value = this.compareWithBoundary({ value, format: true });

			let state = true;
			try {
				if (before) {
					state = await before(value);
				}
				
				state && this.$emit('input', value);
			} catch (e) {
				throw new VcError('vc-input-number', e);
			} 
		},
		/**
		 * @param  {String}  options.value
		 * @param  {Boolean} options.format [是否需要格式化]
		 * @return {String} 输入的值
		 */
		compareWithBoundary({ value, format = false }) {

			if (value > this.max) {
				format = true;
				value = this.max;

				this.$emit('tip', {
					type: 'max',
					msg: `数值不能超过${value}`,
					value
				});
			}

			if (value < this.min) {
				format = true;
				value = this.min;

				this.$emit('tip', {
					type: 'min',
					msg: `数值不能低于${value}`,
					value
				});
			}

			value = format ? this.defaultFormat(value) : value;

			return value;
		},

		defaultFormat(value) {
			try {
				typeof value === 'number' && (value = String(value));
				if (value === '' || !this.precision) return value;

				let length = this.precision - (value.split('.')[1] ? value.split('.')[1].length : 0);
				let suffix = Array.from({ length }, () => '0').join('');

				return `${value}${!this.precision || value.includes('.') ? '' : '.'}${suffix}`;
			} catch (e) {
				return value;
			}
		}
	}
};