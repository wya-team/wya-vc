<template>
	<div :class="classes" class="vc-input">
		<div class="vc-input__wrapper">
			<!-- 前置 -->
			<div 
				v-if="$slots.prepend || prepend" 
				:class="{ 'is-icon': prepend }" 
				class="vc-input__prepend"
			>
				<slot name="prepend">
					<vc-icon
						v-if="prepend" 
						:type="prepend"
					/>
				</slot>
			</div>
			<div class="vc-input__content">
				<slot name="content">
					<input
						ref="input"
						:value="currentValue"
						:style="inputStyle"
						v-bind="binds"
						v-on="hooks"
					>
				</slot>
			</div>
			<!-- 清除 -->
			<vc-transition-fade>
				<vc-icon
					v-if="disabled && clearable && currentValue" 
					class="vc-input__icon-clear" 
					type="clear" 
					@click="handleClear"
				/>
			</vc-transition-fade>
			<div
				v-if="$slots.append || append" 
				:class="{ 'is-icon': append }" 
				class="vc-input__append"
			>
				<slot name="append">
					<vc-icon 
						v-if="append" 
						:type="append"
					/>
				</slot>
			</div>
			<!-- hack, 莫名的黑点-->
			<div v-else-if="!disabled" class="vc-input__hack"/>
		</div>
	</div>
</template>

<script>
import inputMixin from './input-mixin';
import Icon from '../icon/index';
import Transition from '../transition/index';

export default {
	name: 'vc-input',
	components: {
		'vc-icon': Icon,
		'vc-transition-fade': Transition.Fade
	},
	mixins: [inputMixin]
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
	min-height: 28px;
	line-height: 1.5;
	transition: border .2s ease-in-out, 
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
	@include element(content){
		flex: 1;
		input {
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
	}
	@include share-rule(icon) {
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
		@include extend-rule(icon);
		cursor: pointer;
		display: none;
	}

	/**
	 * prend
	 */
	
	@include element(icon-prepend){
		// @include extend-rule(icon);
		
	}

	@include pseudo(hover) {
		@include element(icon-clear){
			display: inline-block;
		}
	}
	
	@include share-rule(pend) {
		height: 100%;
		text-align: center;
		font-size: 13px;
		line-height: 28px;
		white-space: nowrap;
		z-index: 3;
		@include when(icon) {
			width: 16px;
			font-size: 12px;
			background: rgba(229, 229, 229, 1);
		}
	}
	/**
	 * prepend / append
	 */
	@include element(prepend) {
		@include extend-rule(pend);
	}

	@include element(append) {
		@include extend-rule(pend);
	}
	@include when(focus) {
		@include element(prepend) {
			z-index: 1;
		}

		@include element(append) {
			z-index: 1;
		}
	}

	/**
	 * hack
	 */
	@include element(hack) {
		padding-right: 1px;
	}

}
</style>