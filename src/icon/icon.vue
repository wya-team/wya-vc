<template>
	<svg class="vc-icon" aria-hidden="true" @click="$emit('click', $event)">
		<use :xlink:href="`#icon-${type}`"/>
	</svg>
</template>
<script>
import "./iconfont";

export default {
	name: "vc-icon",
	props: {
		type: String,
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
<style>
.vc-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>