<template>
	<div class="vcm-list">
		<slot/>
	</div>
</template>
<script>
export default {
	name: "vc-list",
	props: {
		labelWidth: {
			type: Number | String,
			default: ''
		},
	},
	provide() {
		return { list: this };
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	mounted() {
		
	},
	methods: {
	}
};
</script>
<style lang="scss">
@import '../../style/index.scss';
@include block(vcm-list) {
	padding-left: 12px;
	@include commonBorder1PX(top);
	@include commonBorder1PX(bottom);
}
</style>
