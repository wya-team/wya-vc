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
	minins: [BasicMixin],
	components: {
		'vcm-spin': MSpin
	}
};
</script>
<style lang="scss">
@import '../../style/index.scss';

@include block(vcm-switch) {
	display: inline-block;
	width: 44px;
	height: 22px;
	line-height: 20px;
	border-radius: 22px;
	vertical-align: middle;
	border: 1px solid #ccc;
	background-color: #ccc;
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
		width: 18px;
		height: 18px;
		border-radius: 18px;
		background-color: #fff;
		position: absolute;
		left: 1px;
		top: 1px;
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
		border-color: #2d8cf0;
		background-color: #2d8cf0;
		@include element(content) {
			left: 7px;
		}
		@include element(inner) {
			left: 23px;
		}
		@include element(loading) {
			left: 25px;
		}
	}

}
</style>