<template>
	<div class="vcm-checkbox-group">
		<slot />
	</div>
</template>
<script>
import CheckboxGroupMixin from '../checkbox-group-mixin';

export default {
	name: 'vcm-checkbox-group',
	mixins: [CheckboxGroupMixin],
};
</script>
<style lang="scss">
@import '../../style/index.scss';

@include block(vcm-checkbox-group) {
	font-size: 16px;
}
</style>