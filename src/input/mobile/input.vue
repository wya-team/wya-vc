<template>
	<div :class="classes" class="vcm-input">
		<!-- 前置 -->
		<div v-if="$slots.prepend" class="vcm-input__prepend">
			<slot name="prepend" />
		</div>
		<input
			ref="input"
			:id="elementId"
			:autocomplete="autocomplete"
			:spellcheck="spellcheck"
			:type="type"
			:placeholder="placeholder"
			:disabled="disabled"
			:maxlength="maxlength"
			:readonly="readonly"
			:name="name"
			:value="currentValue"
			:number="number"
			:autofocus="autofocus"
			class="vcm-input__wrapper"
			@keyup.enter="handleEnter"
			@keyup="handleKeyup"
			@keypress="handleKeypress"
			@keydown="handleKeydown"
			@focus="handleFocus"
			@blur="handleBlur"
			@compositionstart="handleComposition"
			@compositionupdate="handleComposition"
			@compositionend="handleComposition"
			@input="handleInput"
			@change="handleChange"
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
		
		<!-- 后置 -->
		<div v-if="search && enterTxt" class="vcm-input__search" @click="handleSearch">
			<vcm-icon 
				v-if="enterTxt === true" 
				type="search"
				class="vcm-input__icon"
			/>
			<template v-else>{{ enterTxt }}</template>
		</div>
		<div v-else-if="$slots.append" class="vcm-input__append">
			<slot name="append" />
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
	display: flex;
	align-items: center;
	width: 100%;
	cursor: text;
	font-size: 12px;
	height: 28px;
	line-height: 1.5;
	// overflow: hidden;
	box-sizing: border-box;
	@include element(wrapper) {
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