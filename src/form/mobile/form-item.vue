<template>
	<div :class="classes" class="vcm-form-item">
		<label v-if="label || $slots.label" :for="labelFor" :style="labelStyle" class="vcm-form-item__label">
			<slot name="label">{{ label }}</slot>
		</label>
		<div :style="contentStyle" class="vcm-form-item__content">
			<slot />
		</div>
	</div>
</template>

<script>
import basicFormItemMixin from '../form-item-mixin';

export default {
	/**
	 * 表单特殊, name由mixin管理
	 */
	mixins: [basicFormItemMixin],
};

</script>

<style lang='scss'>
@import '../../style/index.scss';
$block: vcm-form-item;

@include block($block) {
	padding-top: 12px;
	padding-bottom: 12px;
	padding-right: 12px;
	@include commonBorder1PX(bottom);
	@include element(content) { 
		position: relative;
		font-size: 16px;
		line-height: 24px;
	} 
	@include element(label) { 
		text-align: right;
		vertical-align: middle;
		float: left;
		color: $c333;
		font-size: 16px;
		line-height: 24px;
		box-sizing: border-box;
	}
	/**
	 * -> vc-form-item.is_require
	 */
	& {
		@include when(require) {
			@include element(label) {
				&:before {
					content: '*';
					display: inline-block;
					margin-right: 4px;
					line-height: 1;
					font-family: SimSun;
					font-size: 12px;
					color: $error
				}
			}
		}
		@include when(left) {
			@include element(label) {
				text-align: left
			}
		}
		@include when(top) {
			@include element(label) {
				float: none;
				display: inline-block;
				padding: 0 0 10px 0
			}
		}
	}
	&:last-child:after {
		display: none
	}
}

</style>
