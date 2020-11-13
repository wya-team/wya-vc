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
			default: (v, precision) => (/^(-|)$/.test(v) ? '' : Number(v).toFixed(precision))
		},

		/**
		 * 失焦的情况下，会强制把value, 转化为number类型
		 * input事件实时输入只能是string
		 * 等价于@blur="value = arguments[1]"
		 */
		outputNumber: {
			type: Boolean,
			default: false
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
				blur: this.handleBlur,
				keyup: this.handleKeyup,
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
				// hookValue有值后将不再在此处赋值
				if (!this.timer && !this.hookValue && !this.isInput) {
					this.hookValue = v;
				}
				this.currentValue = v;
			}
		}
	},
	/**
	 * TODO: 优化afterHook composeValue
	 */
	methods: {
		async handleKeyup(e) {
			// 数字键盘
			if (e.keyCode == 13 || e.keyCode == 108) {

				let value = this.composeValue({
					value: this.currentValue,
					tag: 'input'
				});

				try {
					let state = await this.afterHook(value);
					state && this.$emit('input', value);
					this.$emit('enter', e);
				} catch (e) {
					throw new VcError('vc-input-number', e);
				}

			}
			this.$emit('keyup', e);
		},
		handleInput(value, e) {
			this.isInput = true;

			value = value.trim();

			if (/[^-]/.test(value) && Number.isNaN(Number(value))) { // `[A-Za-z]` -> ''
				value = this.currentValue;
			} else if (/[-]{2,}/.test(value)) { // `--` -> `-`
				value = '-';
			} else if (value !== '') {
				let regex = this.precision
					? new RegExp(`(.*\\.[\\d]{${this.precision}})[\\d]+`)
					: new RegExp(`(.*)\\.`);

				value = value.replace(regex, '$1');
				// 0002 -> 2, 0.2 -> .2
				value = value === '0' ? '0' : value.replace(/^[0]{1,}/, '');
				// '0.' -> '.' -> '0.'
				value = value.charAt(0) === '.' ? `0${value}` : value;
			}

			// TODO: 实时边界值计算, 矛盾点考虑加入最小值是100, 无法删除到最小值以下
			// if (this.min <= 1 && value !== '') {
			// 	value = this.compareWithBoundary({ value, tag: 'input' });
			// }

			this.$emit('input', value);
		},
		async handleBlur(e) {
			this.isInput = false;
			let value = this.composeValue({
				value: this.currentValue, 
				tag: 'input' 
			});

			try {
				let state = await this.afterHook(value);
				state && this.$emit('input', value);
				this.$emit('blur', e, Number(e.target.value));
			} catch (e) {
				throw new VcError('vc-input-number', e);
			}
		},

		async handleStepper(base) {
			let { $listeners: { plus, minus, before } } = this;
			if (base === 1 && this.plusDisabled) {
				this.$emit('tip', {
					type: 'max',
					msg: '不能再多了',
					tag: 'button'
				});
				return;
			} else if (base === -1 && this.minusDisabled) {
				this.$emit('tip', {
					type: 'min',
					msg: '不能再少了',
					tag: 'button'
				});
				return;
			}

			if (base === 1 && plus) { return plus(); }
			if (base === -1 && minus) { return minus(); }

			let value = +this.currentValue + this.step * base;
			value = this.compareWithBoundary({ value, tag: 'button' });

			let state = true;
			try {
				if (before) {
					state = await before(value);
				}

				state && this.$emit('input', value);
				this.afterDebounce(value);
			} catch (e) {
				throw new VcError('vc-input-number', e);
			}
		},

		/**
		 * 为防止在有after的时候多次触发input事件，返回state
		 * 没有after时，返回true，有外面自己发射input
		 * 有after时，根据after的返回值，如果是false，则由内部发射input事件，重新赋值value；
		 * 如果是true，也由外部发射
		 */
		afterDebounce(value) {
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.afterHook(value);
				this.timer = null;
			}, 500);
		},

		async afterHook(value) {
			let { $listeners: { after } } = this;
			if (!after) return true;
			let state = await after(value);
			if (state) {
				this.hookValue = value;
			} else {
				this.$emit('input', this.hookValue);
			}
			return state;
		},

		/**
		 * 得到一个正确展示的value
		 */
		composeValue({ value, tag }) {
			// 失焦时，只留一个'-'或为''
			value = /^(-|)$/.test(value)
				? '' 
				: this.compareWithBoundary({ value, tag });
			value = this.required && !value
				? this.min
				: value;


			return this.outputNumber ? Number(value) : value;
		},

		/**
		 * @param  {String}  options.value
		 * @param  {Boolean} options.tag 类型（input | button）
		 * @return {String} 输入的值
		 */
		compareWithBoundary({ value, tag }) {

			if (value > this.max) {
				value = this.max;

				this.$emit('tip', {
					type: 'max',
					msg: `数值不能超过${value}`,
					value,
					tag
				});
			}

			if (value < this.min) {
				value = this.min;

				this.$emit('tip', {
					type: 'min',
					msg: `数值不能低于${value}`,
					value,
					tag
				});
			}
			return value;
		}
	}
};
