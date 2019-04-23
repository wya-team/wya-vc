<template>
	<div :class="classes" class="vcm-input">
		<div class="vcm-input__wrapper">
			<!-- 前置 -->
			<div v-if="$slots.prepend" class="vcm-input__prepend">
				<slot name="prepend" />
			</div>
			<input
				ref="input"
				:value="currentValue"
				v-bind="binds"
				class="vcm-input__input"
				v-on="hooks"
			>
			<!-- 清除 -->
			<vcm-transition-fade>
				<vcm-icon
					v-if="clearable && currentValue" 
					class="vcm-input__icon vcm-input__icon-clear" 
					type="close3" 
					@click="handleInput"
				/>
			</vcm-transition-fade>
			<div v-if="$slots.append" class="vcm-input__append">
				<slot name="append" />
			</div>
		</div>
	</div>
</template>

<script>
import basicMixin from '../basic-mixin';
import Icon from '../../icon/index.m';
import Transition from '../../transition/index.m';

export default {
	name: 'vcm-input',
	components: {
		'vcm-icon': Icon,
		'vcm-transition-fade': Transition.Fade
	},
	mixins: [basicMixin]
};
</script>

<style lang="scss">
@import '../../style/index.scss';

$block: vcm-input;

@include block($block) {
	position: relative;
	width: 100%;
	cursor: text;
	font-size: 12px;
	height: 28px;
	line-height: 1.5;
	// overflow: hidden;
	@include element(wrapper) {
		display: flex;
		align-items: center;
		flex: 1;
	}
	@include element(input) {
		position: relative;
		width: 100%;
		background-color: $white;
		outline: 0;
		color: $c51;
		padding-top: 5px;
		padding-bottom: 5px; // 18 + 10 = 28
		padding-left: 7px;
		padding-right: 7px;
		&::placeholder {
			color: #c5c8ce;
		}
		&[disabled] {
			background-color: #f3f3f3;
			opacity: 1;
			cursor: not-allowed;
			color: #ccc;
		}
	}
	@include element(icon) {
		width: 28px;
		height: 28px;
		line-height: 28px;
		font-size: 13px;
		text-align: left;
		padding-left: 1px; // hack for vcm-icon
		color: #808695;
	}

	/**
	 * clear
	 */
	@include element(icon-clear){
		display: none;
	}
	@include pseudo(hover) {
		@include element(icon-clear){
			display: block;
		}
	}

	/**
	 * prepend/ append
	 */
	@include element(prepend) {
		height: 100%;
		text-align: center;
		font-size: 13px;
		line-height: 28px;
	}
	@include element(append) {
		height: 100%;
		text-align: center;
		font-size: 13px;
		line-height: 28px;
	}
	@include element(search) {
		cursor: pointer;
		font-size: 13px;
		padding: 0 16px;
		background: #2d8cf0 !important;
		color: #fff !important;
		border-color: #2d8cf0 !important;
		transition: all .2s ease-in-out;
		position: relative;
		z-index: 3;
		text-align: center;
		line-height: 28px;
		white-space:nowrap;
	}
}
</style>