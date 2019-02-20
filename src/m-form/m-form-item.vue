<template>
	<div class="vcm-form-item">
		<label
			v-if="label"
			:style="labelStyle"
			:class="{ __require: isRequired }"
			class="__label"
		>{{ label }}</label>
		<div class="__content">
			<slot />
		</div>
	</div>
</template>

<script>
import AsyncValidator from 'async-validator';
import emitter from '../extends/mixins/emitter';

export default {
	name: 'vcm-form-item',
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
		rules: {
			type: [Object, Array]
		},
		showMessage: {
			type: Boolean,
			default: true
		},
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
		labelStyle() {
			const labelWidth = this.labelWidth === 0 || this.labelWidth ? this.labelWidth : this.form.labelWidth;
			return {
				width: labelWidth > 0 ? `${labelWidth}px` : 'auto',
				textAlign: this.form.labelPosition
			};
		},
		fieldValue() {
			const { model } = this.form;
			if (!model || !this.prop) return;
			return model[this.prop];
		}
	},
	watch: {},
	mounted() {
		if (this.prop) {
			this.dispatch('vcm-form', 'form-item-add', this);
			this.setRules();
		}
	},
	beforeDestroy() {
		this.dispatch('vcm-form', 'form-item-remove', this);
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
			formRules = formRules ? formRules[this.prop] : [];
			return [].concat(selfRules || formRules || []);
		},
		getFilteredRule(trigger) {
			const rules = this.getRules();
			return rules.filter(rule => !rule.trigger || rule.trigger.includes(trigger));
		},
		validate(trigger, callback = () => {}) {
			let rules = this.getFilteredRule(trigger);
			this.validateState = 'validating';
			let descriptor = {
			};
			descriptor[this.prop] = rules;
			let validator = new AsyncValidator(descriptor);
			let model = {};
			model[this.prop] = this.fieldValue;
			validator.validate(model, (errors, fields) => {
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
			this.form.model[this.prop] = '';
		},
		handleFieldBlur() {
			this.validate('blur');
		},
		handleFieldChange() {
			if (this.validateDisabled) {
				this.validateDisabled = false;
				return;
			}
			this.validate('change');
		}
	}
};

</script>

<style scoped lang='scss'>
.vcm-form-item {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 5px 0;
	border-bottom:1px solid #ddd;

	.__label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #333;
		font-size: 18px;
		padding: 2px 0;
		font-weight: normal;
	}
	.__require{
		&::before{
			content: '*';
			color: #ff0000;
		}
	}

	.__content {
		flex: 1;
		height: 28px;
		line-height: 28px;
		margin-left: 5px;
		font-size: 16px;
		color: #333;
	}
}
</style>
