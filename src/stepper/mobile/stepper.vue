<template>
	<div class="vcm-stepper">
		<span :class="minusDisabledClass" class="vcm-stepper__handler vcm-stepper__minus" @click="handleMinus" />
		<input 
			:value="value"
			:disabled="readOnly"
			:style="{'text-align': value > 99 ? 'right' : 'center', ...inputStyle}"
			type="tel"
			class="vcm-stepper__input"
			@input="handleInput"
		>
		<span :class="addDisabledClass" class="vcm-stepper__handler vcm-stepper__add" @click="handleAdd" />
	</div>
</template>

<script>
// 正整数正则
const IntegerRegEx = /^[1-9]\d*$/;

export default {
	name: 'vcm-stepper',
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
			validator: (value) => IntegerRegEx.test(value)
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
			
		};
	},
	computed: {
		minusDisabledClass() {
			return this.value <= this.min ? '' : 'is-click';
		},
		addDisabledClass() {
			return this.value >= this.max ? '' : 'is-click';
		}
	},
	methods: {
		// handle
		async handleAdd() {
			if (!this.disabled && !!this.addDisabledClass) {
				// 如果外部有传入加的方法，则以外部方法优先,内部不会去改变value，得由外部修改
				let { $listeners: { add } } = this;
				if (add) { return add(); }
				
				let result = this.value + Number(this.step);
				let value = result >= this.max ? this.max : result;
				let shouldChange = await this.beforeChange(value);
				if (!shouldChange) return;

				this.$emit('input', value);
			}
		},
		async handleMinus() {
			if (!this.disabled && !!this.minusDisabledClass) {
				// 如果外部有传入减的方法，则以外部方法优先,内部不会去改变value，得由外部修改
				let { $listeners: { minus } } = this;
				if (minus) { return minus(); }

				let result = this.value - Number(this.step);
				let value = result <= this.min ? this.min : result;
				let shouldChange = await this.beforeChange(value);
				if (!shouldChange) return;

				this.$emit('input', value);
			}
		},
		async handleInput(e) {
			let value = Number(e.target.value);
			value = IntegerRegEx.test(value) ? value : Math.floor(value);
			if (value <= this.min) value = this.min;
			if (value >= this.max) value = this.max;
			let shouldChange = await this.beforeChange(value);
			if (!shouldChange) return;
			this.$emit('input', value);
			// 【hack】前后value相同时，不会触发update，在这里强制更新
			this.$forceUpdate();
		},
		async beforeChange(value) {
			let { $listeners: { before } } = this;
			if (before) {
				let res = await before(value);
				return res;
			}
			return true;
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
		@include when(click) {
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
