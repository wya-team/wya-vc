<template>
	<div :class="{ 'is-border': border }" class="vcm-list">
		<slot />
	</div>
</template>
<script>
export default {
	name: "vc-list",
	provide() {
		return { list: this };
	},
	props: {
		labelWidth: {
			type: [String, Number],
			default: ''
		},
		border: {
			type: Boolean,
			default: true
		}
	}
};
</script>
<style lang="scss">
@import '../../style/vars.scss';
@include block(vcm-list) {
	@include when(border) {
		@include commonBorder1PX(top);
		@include commonBorder1PX(bottom);
	}
}
</style>
