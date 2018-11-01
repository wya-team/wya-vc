<template>
	<i 
		:class="`wyaicon wyaicon-${type}`"
		@click="$emit('click', $event)" 
	/>
</template>
<script>
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