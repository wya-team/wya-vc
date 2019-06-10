<template>
	<div class="vc-checkbox-group">
		<slot />
	</div>
</template>
<script>
import CheckboxGroupMixin from './checkbox-group-mixin';

export default {
	name: 'vc-checkbox-group',
	mixins: [CheckboxGroupMixin],
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-checkbox-group) {
	font-size: 14px;
}
</style>