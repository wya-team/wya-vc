<template>
	<div :class="classes" class="vc-form-item">
		<label v-if="label || $slots.label" :for="labelFor" :style="labelStyle" class="vc-form-item__label">
			<slot name="label">{{ label }}</slot>
		</label>
		<div :style="contentStyle" class="vc-form-item__content">
			<slot />
			<vc-transition-fade>
				<div v-if="showError" class="vc-form-item__tip">{{ validateMessage }}</div>
			</vc-transition-fade>
		</div>
	</div>
</template>

<script>
import basicFormItemMixin from './form-item-mixin';
import Transition from '../transition/index';

export default {
	/**
	 * 表单特殊, name由mixin管理
	 */
	components: {
		'vc-transition-fade': Transition.Fade
	},
	mixins: [basicFormItemMixin],
};

</script>

<style lang='scss'>
@import '../style/index.scss';

$block: vc-form-item;

@include block($block) {
	margin-bottom: 24px;
	@include commonClearfix();
	@include element(content) { 
		position: relative;
		line-height: 28px;
		font-size: 12px
	} 
	@include element(label) { 
		text-align: right;
		vertical-align: middle;
		float: left;
		color: $c333;
		font-size: 12px;
		line-height: 28px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box
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
		/**
		 * 不使用is-error
		 * 影响v-if动画
		 */
		@include element(tip) {
			position: absolute;
			top: 100%;
			left: 0;
			line-height: 1;
			padding-top: 6px;
			color: $error;
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
		/**
		 * 此模式下需要删除label
		 */
		@include when(inline) {
			display: inline-block;
			margin-right: 10px;
			vertical-align: top
		}
	}
	/**
	 * 嵌套管理
	 */
	@include block(vc-form-item) {
		margin-bottom: 0;
		@include element(content, false) {
			margin-left: 0 !important;
		}
	}
}
</style>
