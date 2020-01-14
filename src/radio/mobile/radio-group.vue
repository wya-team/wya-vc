<template>
	<div :name="name" :class="classes" class="vcm-radio-group">
		<slot />
	</div>
</template>
<script>
import RadioGroupMixin from '../radio-group-mixin';

export default {
	name: 'vcm-radio-group',
	mixins: [RadioGroupMixin]
};

</script>
<style lang="scss">
@import '../../style/vars.scss';

$size: 28px;

@include block(vcm-radio-group) {
	display: inline-block;
	font-size: 16px;
	line-height: unset;
	@include when(vertical) {
		.vcm-radio {
			display: block;
			height: 24px;
			line-height: 24px;
		}
	}
}
</style>