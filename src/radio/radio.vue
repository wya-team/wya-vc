<template>
	<label :class="classes" class="vc-radio">
		<span class="vc-radio__wrapper">
			<span class="vc-radio__border">
				<span class="vc-radio__inner"/>
			</span>
			<input
				:checked="checked"
				:name="radioName"
				:disabled="disabled"
				type="radio"
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
	name: 'vc-radio',
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
			from: 'group',
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
				'is-checked': this.checked, 
				'is-disabled': this.disabled,
				'is-focus': this.isFocus,
			};
		},
		radioName() {
			return this.group 
				? this.group.name
				: this.name;
		},
		checked() {
			return this.group 
				? this.group.currentValue === this.label
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
			// ...
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

@include block(vc-radio) {
	font-size: 12px;
	vertical-align: middle;
	display: inline-block;
	position: relative;
	white-space: nowrap;
	margin-right: 8px;
	cursor: pointer;
	@include element(wrapper) {
		display: inline-block;
		margin-right: 4px;
		white-space: nowrap;
		position: relative;
		line-height: 1;
		vertical-align: middle;
		cursor: pointer;
		input {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 1;
			opacity: 0;
			cursor: pointer;
		}
	}
	@include element(border) {
		display: inline-block;
		width: 14px;
		height: 14px;
		position: relative;
		top: 0;
		left: 0;
		background-color: #fff;
		border-radius: 50%;
		transition: all .2s ease-in-out;
		@include commonBorder1PX('', #dcdee2);
	}
	@include element(inner) {
		position: absolute;
		width: 8px;
		height: 8px;
		left: 3px;
		top: 3px;
		border-radius: 6px;
		display: table;
		border-top: 0;
		border-left: 0;
		content: ' ';
		background-color: #2d8cf0;
		opacity: 0;
		transition: all .2s ease-in-out;
		transform: scale(0);
	}
	@include when(checked) {
		@include element(border) {
			&:before, &:after{
				border-color: #2d8cf0;
			}
		}
		@include element(inner) {
			opacity: 1;
			transform: scale(1);
			transition: all .2s ease-in-out;
		}
	}
	@include when(disabled) {
		cursor: not-allowed;
		input {
			cursor: not-allowed;
		}
		@include element(border){
			&:before, &:after{
				border-color: #dcdee2;
			}
			background-color: #f3f3f3;
		}
		@include element(inner) {
			animation-name: none;
			background-color: #ccc;
		}
		@include when(checked) {
			@include element(inner) {
				animation-name: none;
				&:before, &:after{
					border-color: #ccc;
				}
			}
		}
	}
	@include when(focus) {
		@include element(border){
			box-shadow: 0 0 0 2px rgba(45,140,240,.2);
			z-index: 1
		}
	}
}
</style>