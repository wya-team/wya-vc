<template>
	<vcm-input
		ref="input"
		v-bind="binds"
		:value="formatterValue"
		:clearable="clearable"
		:prepend="prepend"
		:append="append"
		:class="{ 'is-disabled': disabled && step, 'vcm-input-number': step }"
		:input-style="[inputStyle]"
		:right="right"
		type="tel"
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
import inputEventMixin from '../input-event-mixin';
import MInput from './input';

export default {
	name: 'vc-input-number',
	components: {
		'vcm-input': MInput
	},
	mixins: [inputNumberMixin, inputEventMixin],
	props: {
		clearable: {
			type: Boolean,
			default: false
		},
		right: {
			type: Boolean,
			default: false
		}
	},
};
</script>

<style lang="scss">
@import '../../style/index.scss';

$block: vcm-input-number;

@include block($block) {
	width: auto;
	@include share-rule(icon) {
		width: 28px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		display: block;
		background-color: #F5F5F5;
		cursor: pointer;
		&[disabled] {
			background-color: #FBFBFB!important;
			cursor: not-allowed;
			color: #cbcbcb;
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
		background-color: #999;
		&[disabled] {
			background-color: #CBCBCB;
		}
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
		}
		&:after {
			@include extend-rule(absolute);
			content: '';
			width: 2px;
			height: 11px;
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
		}
	}
	@include when(disabled) {
		opacity: 0.4;
	}
	input {
		width: 49px;
		height: 28px;
		font-size: 13px;
		color: #000;
		background-color: #F5F5F5;
		margin: 0 1px;
		padding: 0 3px;
		outline: none;
		text-align: center;
		border-radius: 0; // 不加的话ios端默认带圆角
	}
}

</style>