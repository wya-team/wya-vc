<template>
	<label :class="classes" class="vc-checkbox">
		<span class="vc-checkbox__wrapper">
			<span class="vc-checkbox__border">
				<span class="vc-checkbox__inner"/>
			</span>
			<input
				:checked="checked"
				:name="name"
				:disabled="disabled"
				type="checkbox"
				@change="handleChange"
				@focus="handleFocus"
				@blur="handleBlur"
			>
		</span>
		<slot>
			<span v-if="label">{{ label }}</span>
		</slot>
	</label>
</template>
<script>
import Emitter from '../extends/mixins/emitter';

export default {
	name: 'vc-checkbox',
	mixins: [Emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		value: {
			type: [String, Number, Boolean],
			default: false
		},
		label: {
			type: [String, Number, Boolean]
		},
		indeterminate: {
			type: Boolean,
			default: false
		},
		name: {
			type: String
		},
		/**
		 * group模式下无效
		 */
		trueValue: {
			type: [String, Number, Boolean],
			default: true
		},
		falseValue: {
			type: [String, Number, Boolean],
			default: false
		},
	},
	inject: {
		group: {
			from: 'checkboxGroup',
			default: () => undefined
		}
	},
	data() {
		return {
			currentValue: undefined,
			isFocus: false
		};
	},
	computed: {
		classes() {
			return { 
				'is-indeterminate': this.indeterminate, 
				'is-checked': this.checked, 
				'is-disabled': this.disabled,
				'is-focus': this.isFocus,
			};
		},
		hasGroup() {
			return !this.group;
		},
		checked() {
			return this.group 
				? this.group.currentValue.includes(this.label)
				: this.currentValue === this.trueValue;
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v;
			}
		},
		currentValue(v, old) {
			// ..
		}
	},
	methods: {
		handleChange(e) {
			if (this.disabled) {
				return false;
			}
			let checked = e.target.checked;

			if (this.group) {
				this.group.reset(this.label);
			} else {
				this.currentValue = checked ? this.trueValue : this.falseValue;

				this.sync();
			}
		},
		handleBlur() {
			this.isFocus = false;
		},
		handleFocus() {
			this.isFocus = true;
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			this.$emit('change', this.currentValue);
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-checkbox) {
	cursor: pointer;
	font-size: 12px;
	display: inline-block;
	margin-right: 8px;
	@include element(wrapper) {
		display: inline-block;
		vertical-align: middle;
		white-space: nowrap;
		cursor: pointer;
		line-height: 1;
		position: relative;
		input {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 1;
			cursor: pointer;
			opacity: 0;
			&[disabled] {
				cursor: not-allowed;
			}
		}
	}
	@include element(border) {
		display: inline-block;
		width: 14px;
		height: 14px;
		position: relative;
		top: 0;
		left: 0;
		border-radius: 2px;
		background-color: #fff;
		@include commonBorder1PX('', #d4d7db);
		&:after, &:before {
			transition: border-color .2s;
		}
	}
	@include element(inner) {
		content: '';
		display: table;
		width: 4px;
		height: 8px;
		position: absolute;
		top: 2px;
		left: 5px;
		border: 2px solid #fff;
		border-top: 0;
		border-left: 0;
		transform: rotate(45deg) scale(0);
		transition: all .2s ease-in-out;
		border-collapse: initial;
	}
	@include when(checked) {
		@include element(border){
			background-color: #5495f6;
			&:after, &:before {
				border-color: #5495f6;
			}
		}
		@include element(inner) {
			transform: rotate(45deg) scale(1);
		}
	}
	@include when(disabled) {
		@include element(border){
			background-color: #f4f4f4;
			&:after, &:before {
				border-color: #d4d7db;
			}
			
		}
		@include element(inner) {
			animation-name: none;
			border-color: #f4f4f4;
		}
		@include when(checked) {
			@include element(inner) {
				animation-name: none;
				border-color: #ccc;
			}
		}
	}
	@include when(focus) {
		@include element(border){
			box-shadow: 0 0 0 2px rgba(45,140,240,.2);
			z-index: 1
		}
	}
	@include when(indeterminate) {
		@include element(border){
			background-color: #2d8cf0;
			&:after, &:before {
				border-color: #2d8cf0;
			}
		}
		@include element(inner) {
			width: 8px;
			height: 1px;
			left: 3px;
			top: 6px;
			transform: scale(1);
		}
	}
}
</style>