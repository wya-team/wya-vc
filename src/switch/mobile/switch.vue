<template>
	<!-- tabindex="0" -->
	<span
		:class="classes"
		class="vcm-switch"
		@click="handdleToggle"
		@keydown.space="handdleToggle"
	>
		<input :name="name" :value="currentValue" type="hidden">
		<span class="vcm-switch__content">
			<slot v-if="currentValue === trueValue" name="open" />
			<slot v-if="currentValue === falseValue" name="close" />
		</span>
		<span class="vcm-switch__inner"/>
		<vcm-spin 
			v-if="loading" 
			:size="14"
			foreground="#fff"
			class="vcm-switch__loading"
		/>
	</span>
</template>
<script>
import MSpin from '../../spin/index.m';
import BasicMixin from '../basic-mixin';

export default {
	name: 'vcm-switch',
	components: {
		'vcm-spin': MSpin
	},
	mixins: [BasicMixin],
};
</script>
<style lang="scss">
@import '../../style/index.scss';

@include block(vcm-switch) {
	display: inline-block;
	width: 51px;
	height: 31px;
	line-height: 32px;
	border-radius: 31px;
	vertical-align: middle;
	border: 2px solid #e5e5e5;
	background-color: #fff;
	position: relative;
	cursor: pointer;
	user-select: none;
	transition: all .2s ease-in-out;
	@include element(content) {
		color: #fff;
		font-size: 12px;
		position: absolute;
		left: 23px;
	}
	@include element(inner) {
		content: '';
		width: 28px;
		height: 28px;
		border-radius: 28px;
		background-color: #fff;
		position: absolute;
		left: -1px;
		top: -1px;
		border: 1px solid rgba($color: #000000, $alpha: .13);
		box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.11), 0px 6px 7px 1px rgba(0, 0, 0, 0.15);
		cursor: pointer;
		transition: left .2s ease-in-out,width .2s ease-in-out;
	}
	@include element(loading) {
		width: 14px;
		height: 14px;
		position: absolute;
		left: 3px;
		top: 3px;
		z-index: 1;
		opacity: .4;
	}
	@include when(checked) {
		border-color: #26be76;
		background-color: #26be76;
		@include element(content) {
			left: 7px;
		}
		@include element(inner) {
			left: 20px;
		}
		@include element(loading) {
			left: 25px;
		}
	}

}
</style>