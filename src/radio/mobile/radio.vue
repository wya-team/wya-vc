<template>
	<label :class="classes" class="vcm-radio">
		<span class="vcm-radio__wrapper">
			<span class="vcm-radio__border">
				<span class="vcm-radio__inner" />
			</span>
			<input
				:checked="checked"
				:name="radioName"
				:disabled="disabled"
				type="radio"
				@change="handleChange"
				@focus="handleFocus"
				@blur="handleBlur"
			>
		</span>
		<slot>
			<span v-if="label">{{ label }}</span>
		</slot>
	</label>
</template>
<script>
import RadioMixin from '../radio-mixin';

export default {
	name: 'vcm-radio',
	mixins: [RadioMixin]
};

</script>
<style lang="scss">
@import '../../style/index.scss';

@include block(vcm-radio) {
	font-size: 16px;
	vertical-align: middle;
	display: inline-block;
	position: relative;
	white-space: nowrap;
	margin-right: 12px;
	line-height: 1;
	cursor: pointer;
	@include element(wrapper) {
		display: inline-block;
		margin-right: 12px;
		white-space: nowrap;
		position: relative;
		line-height: 1;
		vertical-align: middle;
		cursor: pointer;
		input {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 16px;
			height: 16px;
			z-index: 1;
			opacity: 0;
			cursor: pointer;
		}
	}
	@include element(border) {
		display: inline-block;
		width: 16px;
		height: 16px;
		position: relative;
		top: 0;
		left: 0;
		background-color: #fff;
		border-radius: 50%;
		transition: all .2s ease-in-out;
		@include commonBorder1PX('', #999);
	}
	@include element(inner) {
		content: '';
		display: table;
		width: 6px;
		height: 10px;
		position: absolute;
		top: 2px;
		left: 5px; // 有效
		border: 2px solid #fff;
		border-top: 0;
		border-left: 0;
		transform: rotate(45deg) scale(0);
		transition: all .2s ease-in-out;
		border-collapse: initial;
	}

	@include when(checked) {
		@include element(border) {
			background-color: #26be76;
			&:before, &:after{
				border-color: #26be76;
			}
		}
		@include element(inner) {
			transform: rotate(45deg) scale(1);
		}
	}
	@include when(disabled) {
		cursor: not-allowed;
		input {
			cursor: not-allowed;
		}
		@include element(border){
			&:before, &:after{
				border-color: #d4d7db;
			}
			background-color: #f4f5f4;
		}
		@include element(inner) {
			animation-name: none;
			background-color: #ccc;
		}
		@include when(checked) {
			@include element(border) {
				animation-name: none;
				&:before, &:after{
					border-color: #ccc;
				}
			}
		}
	}
	@include when(focus) {
		@include element(border){
			box-shadow: 0 0 0 2px rgba(38, 190, 118, .2);
			z-index: 1
		}
	}
}
</style>