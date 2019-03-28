<template>
	<i class="vc-icon" @click="$emit('click', $event)">
		<svg aria-hidden="true">
			<use :xlink:href="`#icon-${type}`"/>
		</svg>
	</i>
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
.vc-icon svg {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>