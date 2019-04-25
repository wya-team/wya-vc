<template>
	<form :autocomplete="autocomplete" :class="{ 'is-border': border }" class="vcm-form">
		<slot />
	</form>
</template>

<script>
import basicFormMixin from '../form-mixin';

export default {
	/**
	 * 表单特殊, name由mixin管理
	 */
	mixins: [basicFormMixin],
	props: {
		showMessage: {
			type: Boolean,
			default: false
		},
		border: {
			type: Boolean,
			default: false
		}
	}
};
</script>
<style lang="scss">
@import '../../style/index.scss';
$block: vcm-form;

@include block($block) {
	@include when(border) {
		@include commonBorder1PX(top);
		@include commonBorder1PX(bottom);
	}
}

</style>