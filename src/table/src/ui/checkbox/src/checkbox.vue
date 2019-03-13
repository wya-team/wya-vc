<template>
	<label
		:class="[
			border && checkboxSize ? 'el-checkbox--' + checkboxSize : '',
			{ 'is-disabled': isDisabled },
			{ 'is-bordered': border },
			{ 'is-checked': isChecked }
		]"
		:aria-checked="indeterminate ? 'mixed': isChecked"
		:aria-disabled="isDisabled"
		:id="id"
		class="el-checkbox"
		role="checkbox"
	>
		<span 
			:class="{
				'is-disabled': isDisabled,
				'is-checked': isChecked,
				'is-indeterminate': indeterminate,
				'is-focus': focus
			}"
			class="el-checkbox__input"
			aria-checked="mixed"
		>
			<span class="el-checkbox__inner"/>
			<input
				v-if="trueLabel || falseLabel"
				:name="name"
				:disabled="isDisabled"
				:true-value="trueLabel"
				:false-value="falseLabel"
				v-model="model"
				class="el-checkbox__original"
				type="checkbox"
				aria-hidden="true"
				@change="handleChange"
				@focus="focus = true"
				@blur="focus = false">
			<input
				v-else
				:disabled="isDisabled"
				:value="label"
				:name="name"
				v-model="model"
				class="el-checkbox__original"
				type="checkbox"
				aria-hidden="true"
				@change="handleChange"
				@focus="focus = true"
				@blur="focus = false">
		</span>
		<span v-if="$slots.default || label" class="el-checkbox__label">
			<slot/>
			<template v-if="!$slots.default">{{ label }}</template>
		</span>
	</label>
</template>
<script>
import Emitter from '../../../../../extends/mixins/emitter';
/* eslint-disable */
export default {
	name: 'el-checkbox',
	mixins: [Emitter],
	inject: {
		elForm: {
			default: ''
		},
		elFormItem: {
			default: ''
		}
	},
	componentName: 'ElCheckbox',
	props: {
		value: {},
		label: {},
		indeterminate: Boolean,
		disabled: Boolean,
		checked: Boolean,
		name: String,
		trueLabel: [String, Number],
		falseLabel: [String, Number],
		id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
		controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
		border: Boolean,
		size: String
	},
	data() {
		return {
			selfModel: false,
			focus: false,
			isLimitExceeded: false
		};
	},
	computed: {
		model: {
			get() {
				return this.isGroup
					? this.store : this.value !== undefined
						? this.value : this.selfModel;
			},
			set(val) {
				if (this.isGroup) {
					this.isLimitExceeded = false;
					(this._checkboxGroup.min !== undefined
              && val.length < this._checkboxGroup.min
              && (this.isLimitExceeded = true));
					(this._checkboxGroup.max !== undefined
              && val.length > this._checkboxGroup.max
              && (this.isLimitExceeded = true));
					this.isLimitExceeded === false
            && this.dispatch('ElCheckboxGroup', 'input', [val]);
				} else {
					this.$emit('input', val);
					this.selfModel = val;
				}
			}
		},
		isChecked() {
			if ({}.toString.call(this.model) === '[object Boolean]') {
				return this.model;
			} else if (Array.isArray(this.model)) {
				return this.model.indexOf(this.label) > -1;
			} else if (this.model !== null && this.model !== undefined) {
				return this.model === this.trueLabel;
			}
		},
		isGroup() {
			let parent = this.$parent;
			while (parent) {
				if (parent.$options.componentName !== 'ElCheckboxGroup') {
					parent = parent.$parent;
				} else {
					this._checkboxGroup = parent;
					return true;
				}
			}
			return false;
		},
		store() {
			return this._checkboxGroup ? this._checkboxGroup.value : this.value;
		},
		isDisabled() {
			return this.isGroup
				? this._checkboxGroup.disabled || this.disabled || (this.elForm || {}).disabled
				: this.disabled || (this.elForm || {}).disabled;
		},
		_elFormItemSize() {
			return (this.elFormItem || {}).elFormItemSize;
		},
		checkboxSize() {
			const temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
			return this.isGroup
				? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
				: temCheckboxSize;
		}
	},
	watch: {
		value(value) {
			this.dispatch('ElFormItem', 'el.form.change', value);
		}
	},
	created() {
		this.checked && this.addToStore();
	},
	mounted() { // 为indeterminate元素 添加aria-controls 属性
		if (this.indeterminate) {
			this.$el.setAttribute('aria-controls', this.controls);
		}
	},
	methods: {
		addToStore() {
			if (
				Array.isArray(this.model)
          && this.model.indexOf(this.label) === -1
			) {
				this.model.push(this.label);
			} else {
				this.model = this.trueLabel || true;
			}
		},
		handleChange(ev) {
			if (this.isLimitExceeded) return;
			let value;
			if (ev.target.checked) {
				value = this.trueLabel === undefined ? true : this.trueLabel;
			} else {
				value = this.falseLabel === undefined ? false : this.falseLabel;
			}
			this.$emit('change', value, ev);
			this.$nextTick(() => {
				if (this.isGroup) {
					this.dispatch('ElCheckboxGroup', 'change', [this._checkboxGroup.value]);
				}
			});
		}
	},
};
</script>