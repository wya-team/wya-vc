import { pick } from 'lodash';
import emitter from '../extends/mixins/emitter'; // 表单验证
import InputMixin from '../input/input-mixin';
import { calcTextareaHeight } from './utils';
import { Resize } from '../utils';

export default {
	mixins: [emitter],
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
			'value'
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
			currentValue: this.value,
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
				maxlength: this.maxlength,
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
			immediate: false,
			handler(v, old) {
				this.currentValue = v;
				this.allowDispatch && this.dispatch('vc-form-item', 'form-change', v);
			}
		}
	},
	mounted() {
		this.textareaStyle = this.getFitStyle();

		Resize.on(this.$refs.textarea, this.handleResize);
	},
	beforeDestory() {
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

			this.$emit('input', value);
			this.$emit('change', e);

			this.currentValue = value;
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
	}
};