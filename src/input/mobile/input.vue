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
			<div :class="{ 'is-right': right }" class="vcm-input__content">
				<input
					ref="input"
					:value="currentValue"
					:style="inputStyle"
					v-bind="binds"
					class="vcm-input__input"
					v-on="hooks"
				>
			</div>
			<!-- 清除 -->
			<vcm-transition-fade>
				<vcm-icon
					v-if="clearable && currentValue" 
					class="vcm-input__icon vcm-input__icon-clear" 
					type="clear" 
					@touchstart.native="handleClear"
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
	mixins: [inputMixin],
	props: {
		right: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="scss">
@import '../../style/index.scss';

$block: vcm-input;

@include block($block) {
	position: relative;
	width: 100%;
	display: inline-block;
	cursor: text;
	height: 24px;
	line-height: 1.5;
	// overflow: hidden;
	@include element(wrapper) {
		display: flex;
		align-items: center;
		flex: 1;
	}
	@include element(content) {
		flex: 1;
		input {
			position: relative;
			width: 100%;
			background-color: $white;
			outline: 0;
			color: #000;
			font-size: 16px;
			padding-left: 7px;
			padding-right: 7px;
			&::placeholder {
				color: #999;
			}
			&[disabled] {
				background-color: #f3f3f3;
				opacity: 1;
				cursor: not-allowed;
				color: #ccc;
			}
		}
		@include when(right) {
			input {
				text-align: right;
				color: #999;
			}
		}
	}

	@include share-rule(icon) {
		font-size: 16px;
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
		line-height: inherit;
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