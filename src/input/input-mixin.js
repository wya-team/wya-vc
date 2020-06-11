import Extends from '../extends';
import BytesMixin from './input-bytes-mixin';
import EventMixin from './input-event-mixin';
import Icon from '../icon/index';
import Transition from '../transition/index';

export default {
	mixins: [...Extends.mixins(['emitter']), BytesMixin, EventMixin],
	props: {
		type: {
			type: String,
			validator: v => /(text|password|tel|search|date|number|email|url)/.test(v),
			default: 'text'
		},
		value: {
			type: [String, Number, Array], // Array, 作为select等数组存放临时值
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		maxlength: Number,
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		name: {
			type: String
		},
		autofocus: {
			type: Boolean,
			default: false
		},
		spellcheck: {
			type: Boolean,
			default: false
		},
		autocomplete: {
			validator: v => /^(on|off|new-password)$/.test(v),
			default: 'off'
		},
		clearable: {
			type: Boolean,
			default: false
		},
		elementId: {
			type: String
		},
		prepend: {
			type: String
		},
		append: {
			type: String
		},
		afloat: {
			type: Boolean,
			default: false
		},	
		inputStyle: {
			type: [Object, Array]
		},
		allowDispatch: {
			type: Boolean,
			default: true
		},
		// 聚焦时光标是否在文字最后面
		focusEnd: {
			type: Boolean,
			default: false
		},
		// 是否按字节数计算长度，1个长度 = 2个字节，影响maxlength
		bytes: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			currentValue: this.value,
			isFocus: false,
			isOnComposition: false
		};
	},
	watch: {
		value: {
			immediate: false,
			handler(v, old) {
				/**
				 * 强制必须使用v-model，所以不需要判断一次
				 */
				this.currentValue = v;
				this.curMaxlength = this.getMaxLength();
				this.allowDispatch && this.dispatch('vc-form-item', 'form-change', v);
			}
		}
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
				type: this.type,
				placeholder: this.placeholder,
				disabled: this.disabled,
				maxlength: this.maxlength, // 频率高
				readonly: this.readonly,
				name: this.name,
				// value: this.currentValue, // 频率高
				number: this.number,
				autofocus: this.autofocus,
				focusEnd: this.focusEnd
			};
		}
	},
	mounted() {
	},
	methods: {
		handleKeydown(e) {
			this.$emit('keydown', e);
		},
		handleKeypress(e) {
			this.$emit('keypress', e);
		},
		handleKeyup(e) {
			// 数字键盘
			if (e.keyCode == 13 || e.keyCode == 108) {
				this.$emit('enter', e);
			}
			this.$emit('keyup', e);
		},
		handleFocus(e) {
			this.isFocus = true;
			
			if (this.focusEnd) {
				let length = this.currentValue.length;
				// hack chrome浏览器的BUG：setSelectionRange() for input/textarea during onFocus fails when mouse clicks
				setTimeout(() => {
					e.srcElement.setSelectionRange(length, length);
				}, 0);
			}
			this.$emit('focus', e);
		},
		handleBlur(e) {
			this.isFocus = false;

			this.$emit('blur', e);
			this.allowDispatch && this.dispatch('vc-form-item', 'form-blur', this.currentValue);
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
			if (this.isOnComposition) return;
			let value = e.target.value;
			if (!this.checkInput(value)) {
				e.preventDefault();
				this.$forceUpdate(); // hack
				return;
			}
			this.$emit('input', value, e);
			this.$emit('change', e);
			this.$forceUpdate(); // hack
		},
		handleChange(e) {
			this.$emit('change', e);
		},
		handleClear() {
			const e = { target: { value: '' } };
			this.$emit('input', '');
			this.$emit('change', e);

			this.focus();
		}
	},
};
