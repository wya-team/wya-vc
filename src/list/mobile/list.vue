<template>
	<div :class="{ 'is-border': border }" class="vcm-list">
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
		border: {
			type: Boolean,
			default: true
		}
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
	@include when(border) {
		@include commonBorder1PX(top);
		@include commonBorder1PX(bottom);
	}
}
</style>
