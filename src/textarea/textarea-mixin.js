import { pick } from 'lodash';
import Extends from '../extends';
import InputMixin from '../input/input-mixin';
import { calcTextareaHeight } from './utils';
import { Resize } from '../utils';

export default {
	mixins: [...Extends.mixins(['emitter'])],
	props: {
		...pick(InputMixin.props, [
			'elementId',  
			'autocomplete', 
			'placeholder', 
			'disabled', 
			'maxlength', 
			'readonly', 
			'name',
			'autofocus',
			'allowDispatch',
			'value',
			'bytes'
		]),
		wrap: {
			type: String,
			validator: v => /(soft|hard)/.test(v),
			default: 'soft',

		},
		rows: {
			type: Number,
			default: 2
		},
		autosize: {
			type: [Boolean, Object],
			default: false
		},
	},
	data() {
		return {
			currentValue: null,
			isOnComposition: false,
			isFocus: false,
			textareaStyle: {},
			contentStyle: {}
		};
	},
	computed: {
		classes() {
			return {
				'is-focus': this.isFocus,
				'is-disabled': this.disabled
			};
		},
		// 单字节换成双字节 maxlength 需要额外加的长度
		extraLength() {
			let charArr = String(this.currentValue).match(/[\x20-\x7e]/g) || [];
			let charLength = charArr.length;
			if (charLength % 2 === 0) {
				return charLength / 2;
			}
			return (charLength + 1) / 2;
		},
		// 输入框内容允许输入的长度
		length() {
			if (!this.maxlength) return undefined;
			if (!this.bytes) return this.maxlength;
			return this.maxlength + this.charLength;
		},
		hooks() {
			return {
				keyup: this.handleKeyup,
				keypress: this.handleKeypress,
				keydown: this.handleKeydown,
				focus: this.handleFocus,
				blur: this.handleBlur,
				compositionstart: this.handleComposition,
				compositionupdate: this.handleComposition,
				compositionend: this.handleComposition,
				input: this.handleInput,
				change: this.handleChange,
			};
		},
		binds() {
			return {
				id: this.elementId, // 此id用于input, 不能改为this.id
				autocomplete: this.autocomplete,
				spellcheck: this.spellcheck,
				placeholder: this.placeholder,
				disabled: this.disabled,
				maxlength: this.length,
				readonly: this.readonly,
				name: this.name,
				rows: this.rows,
				wrap: this.wrap,
				// value: this.currentValue, // 频率高
				autofocus: this.autofocus
			};
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v, old) {
				this.currentValue = v;
			}
		}
	},
	mounted() {
		this.textareaStyle = this.getFitStyle();

		Resize.on(this.$refs.textarea, this.handleResize);
	},
	beforeDestroy() {
		Resize.off(this.$refs.textarea, this.handleResize);
	},
	methods: {
		handleKeydown(e) {
			this.$emit('keydown', e);
		},
		handleKeypress(e) {
			this.$emit('keypress', e);
		},
		handleKeyup(e) {
			if (e.keyCode == 13) {
				this.$emit('enter', e);
			}
			this.$emit('keyup', e);
		},
		handleFocus(e) {
			this.isFocus = true;

			this.$emit('focus', e);
		},
		handleBlur(e) {
			this.isFocus = false;

			this.$emit('blur', e);
			this.allowDispatch && this.dispatch('vc-form-item', 'form-blur', this.currentValue);
		},
		handleChange(e) {
			this.$emit('change', e);
		},
		handleComposition(e) {
			if (e.type === 'compositionstart') {
				this.isOnComposition = true;
			}
			if (e.type === 'compositionend') {
				this.isOnComposition = false;
				this.handleInput(e);
			}
		},
		handleInput(e) {
			let value = e.target.value;
			if (this.isOnComposition || value === this.currentValue) return;

			this.currentValue = value;

			this.sync(value, e);

			this.$nextTick(() => {
				this.textareaStyle = this.getFitStyle();
			});
		},

		getFitStyle() {
			if (!this.autosize) return;

			const { minRows, maxRows } = this.autosize;

			return calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
		},

		/**
		 * TODO
		 */
		handleResize(e) {
			this.contentStyle = {
				height: `${this.$refs.textarea ? this.$refs.textarea.offsetHeight : 0}px`
			};
		}, 
		focus() {
			this.$refs.textarea.focus();
		},
		blur() {
			this.$refs.textarea.blur();
		},

		/**
		 * for v-model
		 */
		sync(v, e) {
			this.$emit('input', v, e);
			this.$emit('change', e);

			this.allowDispatch && this.dispatch('vc-form-item', 'form-change', v);
		}
	}
};