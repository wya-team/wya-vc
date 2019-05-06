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
		},
		formatter: {
			type: Function,
			default: (v, precision) => (!v ? v : Number(v).toFixed(precision)) 
		}
	},
	data() {
		return {
			currentValue: '',
			isInput: false,
			isNumber: false
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
		plusDisabled() {
			return this.currentValue >= this.max;
		},
		minusDisabled() {
			return this.currentValue <= this.min;
		},
		/**
		 * 确保初始和失焦都是格式化的值
		 */
		formatterValue() {
			return this.isInput 
				? this.currentValue
				: this.formatter(this.currentValue, this.precision);
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v;
			}
		}
	},
	methods: {
		handleInput(value, e) {
			this.isInput = true;

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

			value = this.compareWithBoundary(value);

			this.$emit('input', value);
		},
		handleBlur(e) {
			this.isInput = false;
			let value = this.required && !this.currentValue 
				? this.min
				: this.currentValue;

			this.$emit('input', value);
			this.$emit('blur', e);
		},
		async handleStepper(base) {
			let { $listeners: { plus, minus, before } } = this;

			if (base === 1 && plus) { return plus(); }
			if (base === -1 && minus) { return minus(); }

			let value = +this.currentValue + this.step * base;
			value = this.compareWithBoundary(value);

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
		compareWithBoundary(value) {

			if (value > this.max) {
				value = this.max;

				this.$emit('tip', {
					type: 'max',
					msg: `数值不能超过${value}`,
					value
				});
			}

			if (value < this.min) {
				value = this.min;

				this.$emit('tip', {
					type: 'min',
					msg: `数值不能低于${value}`,
					value
				});
			}
			return value;
		}
	}
};