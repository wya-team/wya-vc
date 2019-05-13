<template>
	<vcm-input
		v-bind="binds"
		:value="formatterValue"
		:clearable="clearable"
		:prepend="prepend"
		:append="append"
		:type="type"
		:class="{ 'is-disabled': disabled && step, 'vcm-input-number': step }"
		:input-style="[currentStyle, inputStyle]"
		v-on="hooks"
	>
		<template v-if="step" #prepend>
			<slot name="prepend">
				<span 
					:disabled="minusDisabled" 
					class="vcm-input-number__minus" 
					@click="handleStepper(-1)" 
				/>
			</slot>
		</template>
		<template v-if="step" #append>
			<slot name="append">
				<span 
					:disabled="plusDisabled" 
					class="vcm-input-number__plus" 
					@click="handleStepper(1)" 
				/>
			</slot>
		</template>
	</vcm-input>
</template>

<script>
import inputNumberMixin from '../input-number-mixin';
import MInput from './input';

export default {
	name: 'vc-input-number',
	components: {
		'vcm-input': MInput
	},
	mixins: [inputNumberMixin],
	props: {
		clearable: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		currentStyle() {
			return this.step && Number(this.currentValue) > 99 && { 'text-align': 'right' };
		}
	}
};
</script>

<style lang="scss">
@import '../../style/index.scss';

$block: vcm-input-number;

@include block($block) {
	width: auto;
	@include share-rule(icon) {
		width: 27px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		display: block;
		background-color: #F5F5F5;
		cursor: pointer;
		&[disabled] {
			background-color: #F5F5F5!important;
			cursor: not-allowed;
			color: #ccc;
		}
		&:active {
			background-color: rgba(221, 221, 221, 0.616);
		}
	}
	
	@include share-rule(absolute) {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	@include element(plus) {
		position: relative;
		border-radius: 0 2px 2px 0;
		@include extend-rule(icon);
		&:before {
			@include extend-rule(absolute);
			content: '';
			width: 11px;
			height: 2px;
			background-color: #CBCBCB;
		}
		&:after {
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
		@include extend-rule(icon);
		&:before {
			@include extend-rule(absolute);
			content: '';
			width: 11px;
			height: 2px;
			background-color: #CBCBCB;
		}
	}
	@include when(disabled) {
		opacity: 0.4;
	}
	input {
		width: 34px;
		height: 25px;
		font-size: 13px;
		color: #000;
		background-color: #F5F5F5;
		margin: 0 1px;
		padding: 0 6px;
		outline: none;
		text-align: center;
		border-radius: 0; // 不加的话ios端默认带圆角
	}
}
</style>


