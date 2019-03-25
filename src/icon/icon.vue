<template>
	<!-- <i 
		:class="`wyaicon wyaicon-${type}`"
		@click="$emit('click', $event)" 
	/> -->
	<svg class="icon" aria-hidden="true">
		<use :xlink:href="`#icon-${type}`"/>
	</svg>
</template>
<script>
import "./iconfont";
import '../style/index.scss';

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
<style></style>