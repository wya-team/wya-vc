<template>
	<div :class="classes" class="vc-input">
		<div class="vc-input__wrapper">
			<!-- 前置 -->
			<div v-if="$slots.prepend" class="vc-input__prepend">
				<slot name="prepend" />
			</div>
			<input
				ref="input"
				:value="currentValue"
				v-bind="binds"
				class="vc-input__input"
				v-on="hooks"
			>
			<!-- 清除 -->
			<vc-transition-fade>
				<vc-icon
					v-if="clearable && currentValue" 
					class="vc-input__icon vc-input__icon-clear" 
					type="close3" 
					@click="handleInput"
				/>
			</vc-transition-fade>
			<!-- 后置 -->
			<div v-if="search && enterTxt" class="vc-input__search" @click="handleSearch">
				<vc-icon 
					v-if="enterTxt === true" 
					type="search"
					class="vc-input__icon"
				/>
				<template v-else>{{ enterTxt }}</template>
			</div>
			<div v-else-if="$slots.append" class="vc-input__append">
				<slot name="append" />
			</div>
		</div>
	</div>
</template>

<script>
import basicMixin from './basic-mixin';
import Icon from '../icon/index';
import Transition from '../transition/index';

export default {
	name: 'vc-input',
	components: {
		'vc-icon': Icon,
		'vc-transition-fade': Transition.Fade
	},
	mixins: [basicMixin]
};
</script>

<style lang="scss">
@import '../style/index.scss';

$block: vc-input;

@include block($block) {
	display: inline-block;
	position: relative;
	width: 100%;
	cursor: text;
	font-size: 12px;
	border-radius: 4px;
	height: 28px;
	line-height: 1.5;
	transition: all .2s ease-in-out, 
		background .2s ease-in-out, 
		box-shadow .2s ease-in-out;
	@include commonBorder1PX(); // 不占边距
	@include when(focus) {
		&:after, &:before {
			border-color: #57a3f3;
		}
		z-index: 2;
		box-shadow: 0 0 1px 1px rgba(45, 140, 240, .2)
	}
	&:hover {
		border-color: #57a3f3
	}
	@include element(wrapper) {
		display: flex;
		flex: 1;
		align-items: center;
		border-radius: 4px;
		overflow: hidden;
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
		padding-left: 1px; // hack for vc-icon
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
			display: inline-block;
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