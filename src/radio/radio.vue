<template>
	<label :class="classes" class="vc-radio">
		<span class="vc-radio__wrapper">
			<span class="vc-radio__border">
				<span class="vc-radio__inner" />
			</span>
			<input
				:checked="checked"
				:name="radioName"
				:disabled="isDisabled"
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
import RadioMixin from './radio-mixin';

export default {
	name: 'vc-radio',
	mixins: [RadioMixin]
};

</script>
<style lang="scss">
@import '../style/vars.scss';

@include block(vc-radio) {
	font-size: 12px;
	vertical-align: middle;
	display: inline-block;
	position: relative;
	white-space: nowrap;
	margin-right: 8px;
	line-height: 1;
	cursor: pointer;
	@include element(wrapper) {
		display: inline-block;
		margin-right: 4px;
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
			z-index: 1;
			opacity: 0;
			cursor: pointer;
		}
	}
	@include element(border) {
		display: inline-block;
		width: 14px;
		height: 14px;
		position: relative;
		top: 0;
		left: 0;
		background-color: #fff;
		border-radius: 50%;
		transition: all .2s ease-in-out;
		@include commonBorder1PX('', #d4d7db);
	}
	@include element(inner) {
		position: absolute;
		width: 8px;
		height: 8px;
		left: 3px;
		top: 3px;
		border-radius: 6px;
		display: table;
		border-top: 0;
		border-left: 0;
		content: ' ';
		background-color: #5495f6;
		opacity: 0;
		transition: all .2s ease-in-out;
		transform: scale(0);
	}
	@include when(checked) {
		@include element(border) {
			&:before, &:after{
				border-color: #5495f6;
			}
		}
		@include element(inner) {
			opacity: 1;
			transform: scale(1);
			transition: all .2s ease-in-out;
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
			@include element(inner) {
				animation-name: none;
				&:before, &:after{
					border-color: #ccc;
				}
			}
		}
	}
	@include when(focus) {
		@include element(border){
			box-shadow: 0 0 0 2px rgba(45,140,240,.2);
			z-index: 1
		}
	}
}
</style>