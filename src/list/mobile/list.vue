<template>
	<div :class="{ 'is-border': border }" :style="{ paddingLeft: `${indent}px`}" class="vcm-list">
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
		},
		indent: {
			type: Number,
			default: 12
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
	padding-left: 12px;
	@include when(border) {
		@include commonBorder1PX(top);
		@include commonBorder1PX(bottom);
	}
}
</style>
