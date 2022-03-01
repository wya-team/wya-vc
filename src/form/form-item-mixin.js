import { cloneDeep } from 'lodash';
import AsyncValidator from 'async-validator';
import { RegEx } from '@wya/utils';
import { getPropByPath } from '../utils';
import Extends from '../extends';

const filterEmpty = (val) => {
	if (val instanceof Array) {
		val = val.filter(i => i !== '');
	}
	return val;
};

export default {
	name: 'vc-form-item',
	components: {},
	mixins: [...Extends.mixins(['emitter'])],
	props: {
		label: {
			type: String,
			default: ''
		},
		labelWidth: {
			type: Number
		},
		prop: {
			type: String
		},
		required: {
			type: Boolean,
			default: false
		},
		error: {
			type: String
		},
		rules: {
			type: [Object, Array]
		},
		showMessage: {
			type: Boolean,
			default: true
		},
		// validateStatus: {
		// 	type: String
		// },
		labelFor: {
			type: String
		}
	},
	inject: ['form'],
	data() {
		return {
			isRequired: false,
			validateState: '',
			validateMessage: '',
			validateDisabled: false,
			validator: {}
		};
	},
	computed: {
		classes() {
			return { 
				'is-require': this.required || this.isRequired,
				'is-error': this.validateState === 'error',
				'is-validating': this.validateState === 'validating',
				'is-inline': this.form.inline,
				[`is-${this.form.labelPosition}`]: true,
			};
		},
		labelStyle() {
			const labelWidth = this.labelWidth === 0 || this.labelWidth ? this.labelWidth : this.form.labelWidth;
			return {
				width: labelWidth > 0 ? `${labelWidth}px` : 'auto',
				textAlign: this.form.labelPosition
			};
		},
		contentStyle() {
			const labelWidth = this.labelWidth === 0 || this.labelWidth ? this.labelWidth : this.form.labelWidth;
			return {
				marginLeft: labelWidth > 0 ? `${labelWidth}px` : 'unset'
			};
		},
		fieldValue: {
			cache: false,
			get() {
				const model = this.form.model;
				if (!model || !this.prop) { return; }

				let path = this.prop;
				if (path.includes(':')) {
					path = path.replace(/:/, '.');
				}

				return getPropByPath(model, path).value;
			}
		},
		showError() {
			return this.validateState === 'error' && this.showMessage && this.form.showMessage;
		}
	},
	watch: {
		error(val) {
			this.validateMessage = val;
			this.validateState = val === '' ? '' : 'error';
		},
		// validateStatus(val) {
		// 	this.validateState = val;
		// },
		rules() {
			this.setRules();
		}
	},
	mounted() {
		if (this.prop) {
			this.dispatch('vc-form', 'form-item-add', this);
			Object.defineProperty(this, 'initialValue', {
				value: cloneDeep(this.fieldValue)
			});
			this.setRules();
		}
	},
	beforeDestroy() {
		this.dispatch('vc-form', 'form-item-remove', this);
	},
	methods: {
		setRules() {
			let rules = this.getRules();
			if (rules.length && this.required) {
				// return;
			} else if (rules.length) {
				this.isRequired = rules.some(rule => {
					return typeof rule.required === 'function' 
						? rule.required(() => {}) // 避免报错 契合业务的一种设计（@wya/utils - RegEx: validator）
						: rule.required;
				});
			} else if (this.required) {
				this.isRequired = this.required;
			}
			this.$off('form-blur', this.handleFieldBlur);
			this.$off('form-change', this.handleFieldChange);
			this.$on('form-blur', this.handleFieldBlur);
			this.$on('form-change', this.handleFieldChange);
		},
		getRules() {
			const formRules = this.form.rules;
			const formItemBindRules = this.rules instanceof Array 
				? this.rules 
				: this.rules 
					? [this.rules]
					: undefined;

			let formItemRules = formItemBindRules || [];
			if (!formItemRules.length) {
				try {
					// 如果是数组的话 xxx.1.xxx -> xxx.xxx
					let { value } = getPropByPath(formRules, this.prop.replace(/\.[0-9]+\./g, '.')) || {};
					formItemRules = value || [];
				} catch {
					formItemRules = formRules ? formRules[this.prop] : [];
				}
			}

			return cloneDeep(formItemRules);
		},
		getFilteredRule(trigger) {
			const rules = this.getRules();
			return rules.filter(rule => !rule.trigger || rule.trigger.includes(trigger));
		},
		validate(trigger, callback = () => {}) {
			let rules = this.getFilteredRule(trigger);

			/**
			 * hack for AsyncValidator
			 * 默认不传校正string
			 */
			rules = rules.map((i) => {
				if (!i.validator && !i.type && i.required) {
					return {
						...i,
						validator: RegEx.validator
					};
				} else {
					return i;
				}
			});
			if (!rules || rules.length === 0) {
				if (!this.required) {
					callback();
					return true;
				} else {
					rules = [{ required: true }];
				}
			}

			this.validateState = 'validating';
			let descriptor = {};

			descriptor[this.prop] = rules;
			let validator = new AsyncValidator(descriptor);
			let model = {};
			model[this.prop] = filterEmpty(this.fieldValue);
			validator.validate(model, { firstFields: false }, (errors, fields) => {
				this.validateState = !errors ? 'success' : 'error';
				this.validateMessage = errors ? errors[0].message : '';
				callback({
					prop: this.prop,
					msg: this.validateMessage
				});
			});
			this.validateDisabled = false;
		},
		resetField() {
			this.validateState = '';
			this.validateMessage = '';
			

			let model = this.form.model;
			let value = this.fieldValue;
			let path = this.prop;
			if (path.includes(':')) {
				path = path.replace(/:/, '.');
			}

			let prop = getPropByPath(model, path);

			if (Array.isArray(value)) {
				this.validateDisabled = true;
				prop.target[prop.key] = [].concat(this.initialValue);
			} else {
				this.validateDisabled = true;
				prop.target[prop.key] = this.initialValue;
			}

		},
		handleFieldBlur() {
			this.validate('blur');
		},
		handleFieldChange(v) {
			if (this.validateDisabled) {
				this.validateDisabled = false;
				return;
			}
			this.validate('change');
		}
	}
};