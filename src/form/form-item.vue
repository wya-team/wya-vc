<template>
	<div :class="classes" class="vc-form-item">
		<label v-if="label" :style="labelStyle" class="__label">{{ label }}</label>
		<div :style="contentStyle" class="__content">
			<slot />
			<transition name="am-fade">
				<div v-if="showError" class="__tip">{{ validateMessage }}</div>
			</transition>
		</div>
	</div>
</template>

<script>
import AsyncValidator from 'async-validator';
import emitter from '../extends/mixins/emitter';

const getPropByPath = (obj, path) => {
	let target = obj;
	path = path.replace(/\[(\w+)\]/g, '.$1');
	path = path.replace(/^\./, '');

	let keyArr = path.split('.');
	let i = 0;

	for (let len = keyArr.length; i < len - 1; ++i) {
		let key = keyArr[i];
		if (key in target) {
			target = target[key];
		} else {
			throw new Error('[@wya/vc]: please transfer a valid prop path to form item!');
		}
	}
	return {
		target,
		key: keyArr[i],
		value: target[keyArr[i]]
	};
};

export default {
	name: 'vc-form-item',
	components: {},
	mixins: [emitter],
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
				__require: this.required || this.isRequired,
				__error: this.validateState === 'error',
				__validating: this.validateState === 'validating',
				__inline: this.form.inline,
				[`__${this.form.labelPosition}`]: true,
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
				value: this.fieldValue
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
				return;
			} else if (rules.length) {
				this.isRequired = rules.find(rule => rule.required);
			} else if (this.required) {
				this.isRequired = this.required;
			}
			this.$off('form-blur', this.handleFieldBlur);
			this.$off('form-change', this.handleFieldChange);
			this.$on('form-blur', this.handleFieldBlur);
			this.$on('form-change', this.handleFieldChange);
		},
		getRules() {
			let formRules = this.form.rules;
			const selfRules = this.rules;
			// getPropByPath(formRules, this.prop.replace(/\.[0-9]+\./g, '.'));
			formRules = formRules ? formRules[this.prop] : [];
			return [].concat(selfRules || formRules || []);
		},
		getFilteredRule(trigger) {
			const rules = this.getRules();
			return rules.filter(rule => !rule.trigger || rule.trigger.includes(trigger));
		},
		validate(trigger, callback = () => {}) {
			let rules = this.getFilteredRule(trigger);

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
			model[this.prop] = this.fieldValue;
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

</script>

<style lang='scss'>
.vc-form-item {
	margin-bottom: 24px;
	vertical-align: top;
	zoom: 1;
	&:before, &:after {
		content: "";
		display: table;
	}
	&:after {
		clear: both;
		visibility: hidden;
		font-size: 0;
		height: 0;
	}
	.__content {
		position: relative;
		line-height: 32px;
		font-size: 12px
	}
	.__label {
		text-align: right;
		vertical-align: middle;
		float: left;
		font-size: 12px;
		color: #515a6e;
		line-height: 1;
		padding: 10px 12px 10px 0;
		-webkit-box-sizing: border-box;
		box-sizing: border-box
	}
	&.__require {
		.__label:before {
			content: '*';
			display: inline-block;
			margin-right: 4px;
			line-height: 1;
			font-family: SimSun;
			font-size: 12px;
			color: #ed4014
		}
	}
	&.__error .__tip {
		position: absolute;
		top: 100%;
		left: 0;
		line-height: 1;
		padding-top: 6px;
		color: #ed4014;
		transition: opacity .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
	}
	&.__inline {
		display: inline-block;
		margin-right: 10px;
		vertical-align: top;
	}
	&.__left .__label {
		text-align: left
	}

	&.__top .__label {
		float: none;
		display: inline-block;
		padding: 0 0 10px 0
	}
	.am-fade-enter, .am-fade-leave-active {
		opacity: 0;
	}
}
</style>
