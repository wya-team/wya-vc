<template>
	<div :class="classes" class="vcm-input">
		<div class="vcm-input__wrapper">
			<!-- 前置 -->
			<div 
				v-if="$slots.prepend || prepend" 
				:class="{ 'is-icon': prepend }" 
				class="vcm-input__prepend"
			>
				<slot name="prepend">
					<vcm-icon
						v-if="prepend" 
						:type="prepend"
					/>
				</slot>
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
					type="clear" 
					@click="handleClear"
				/>
			</vcm-transition-fade>
			<div
				v-if="$slots.append || append" 
				:class="{ 'is-icon': append }" 
				class="vcm-input__prepend"
			>
				<slot name="append">
					<vcm-icon 
						v-if="append" 
						:type="append"
					/>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
import inputMixin from '../input-mixin';
import MIcon from '../../icon/index.m';
import MTransition from '../../transition/index.m';

export default {
	name: 'vcm-input',
	components: {
		'vcm-icon': MIcon,
		'vcm-transition-fade': MTransition.Fade
	},
	mixins: [inputMixin]
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

	@include share-rule(icon) {
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
		@include extend-rule(icon);
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
}
</style>