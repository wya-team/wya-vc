<template>
	<div class="vcm-stepper">
		<span 
			:class="{ 'is-active': minusActive }" 
			class="vcm-stepper__handler vcm-stepper__minus" 
			@click="handleMinus" 
		/>
		<input 
			:value="currentValue"
			:disabled="readOnly"
			:style="{'text-align': currentValue > 99 ? 'right' : 'center', ...inputStyle}"
			type="tel"
			class="vcm-stepper__input"
			@input="handleInput"
		>
		<span 
			:class="{ 'is-active': addActive }" 
			class="vcm-stepper__handler vcm-stepper__add" 
			@click="handleAdd" 
		/>
	</div>
</template>

<script>
import { RegEx } from '@wya/utils';
import { VcError } from '../../vc/index';

export default {
	name: 'vcm-stepper',
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: Number | String,
			default: 0,
		},
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 99999,
		},
		step: {
			type: Number | String,
			default: 1,
			validator: (v) => RegEx.integer.test(v)
		},
		disabled: {
			type: Boolean,
			default: false
		},
		// input 只读
		readOnly: {
			type: Boolean,
			default: false
		},
		// 输入款样式
		inputStyle: {
			type: Object,
			default: () => ({})
		},
	},

	data() {
		return {
			currentValue: 0
		};
	},
	computed: {
		addActive() {
			return this.currentValue < this.max;
		},
		minusActive() {
			return this.currentValue > this.min;
		}
	},
	watch: {
		/**
		 * TODO
		 * 是否由外部直接控制
		 */
		value: {
			immediate: true,
			handler(v, old) {
				v != this.currentValue && (this.currentValue = v);
			}
		}
	},
	methods: {
		// handle
		handleAdd() {
			if (!this.disabled && this.addActive) {
				let { $listeners: { add } } = this;
				if (add) { return add(); }
				
				let result = this.currentValue + Number(this.step);
				let value = result >= this.max ? this.max : result;

				this.setValue(value);
			}
		},
		handleMinus() {
			if (!this.disabled && this.minusActive) {
				let { $listeners: { minus } } = this;
				if (minus) { return minus(); }

				let result = this.currentValue - Number(this.step);
				let value = result <= this.min ? this.min : result;

				this.setValue(value);
			}
		},
		handleInput(e) {
			let value = Number(e.target.value);
			value = RegEx.integer.test(value) ? value : Math.floor(value);

			value <= this.min && (value = this.min);
			value >= this.max && (value = this.max);

			this.setValue(value);
		},
		/**
		 * TODO
		 * 实际业务场景, 是否需要一次等待setValue结束后触发
		 */
		async setValue(value) {
			try {
				let { $listeners: { before } } = this;

				let state = true;

				if (before) {
					state = await before(value);
				}
				
				if (state) {
					this.currentValue = value;
					this.$emit('change', value);
				}
			} catch (e) {
				throw new VcError('stepper', e);
			} 
			
		}
	}
};
</script>

<style lang="scss">
@import '../../style/index.scss';

@include share-rule(absolute) {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}
@include block(vcm-stepper) {
	position: relative;
	display: flex;
	align-items: center;
	@include element(handler) {
		width: 27px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		display: block;
		background-color: #F5F5F5;
		cursor: pointer;
		@include when(active) {
			@include pseudo(active) {
				background-color: rgba(221, 221, 221, 0.616);
			}
		}
	}
	@include element(add) {
		position: relative;
		border-radius: 0 2px 2px 0;
		@include pseudo(before) {
			@include extend-rule(absolute);
			content: '';
			width: 11px;
			height: 2px;
			background-color: #CBCBCB;
		}
		@include pseudo(after) {
			@include extend-rule(absolute);
			content: '';
			width: 2px;
			height: 11px;
			background-color: #CBCBCB;
		}
	}
	@include element(minus) {
		position: relative;
		border-radius: 2px 0 0 2px;
		@include pseudo(before) {
			@include extend-rule(absolute);
			content: '';
			width: 11px;
			height: 2px;
			background-color: #CBCBCB;
		}
	}
	@include element(input) {
		width: 34px;
		height: 25px;
		font-size: 13px;
		color: #000;
		background-color: #F5F5F5;
		margin: 0 1px;
		padding: 0 6px;
		outline: none;
		border-radius: 0; // 不加的话ios端默认带圆角
	}
	@include when(disabled) {
		opacity: 0.4;
	}
}
</style>
