import { pick } from 'lodash';
import Extends from '../extends';
import InputMixin from '../input/input-mixin';
import BytesMixin from '../input/input-bytes-mixin';
import { getComputedHeight } from './utils';
import { Resize } from '../utils';

export default {
	mixins: [...Extends.mixins(['emitter']), BytesMixin],
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
				paste: this.handlePaste
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
			immediate: true,
			handler(v, old) {
				this.currentValue = v;
				this.curMaxlength = this.getMaxLength();
				this.refresh();
			}
		}
	},
	mounted() {
		Resize.on(this.$refs.textarea, this.handleResize);
		this.refresh();
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

			if (!this.checkInput(value)) {
				e.preventDefault();
				this.$forceUpdate(); // hack
				return;
			}

			this.currentValue = value;
			this.refresh();

			this.sync(value, e);
		},
		refresh() {
			if (!this.autosize) return;

			const { minRows, maxRows } = this.autosize;

			this.$nextTick(() => {
				this.textareaStyle = getComputedHeight({
					el: this.$refs.textarea,
					minRows, 
					maxRows
				});
			});
		},

		/**
		 * TODO
		 */
		handleResize(e) {
			this.contentStyle = {
				height: `${this.$refs.textarea ? this.$refs.textarea.offsetHeight : 0}px`
			};

			this.$emit('resize', e);
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