<template>
	<div @click="handleClick">
		<slot/>
	</div>
</template>
<script>
export default {
	name: "vc-copy",
	props: {
		value: String
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick(e) {
			let { value } = this;

			// create
			let input = document.createElement('input');
			input.value = value;
			document.body.appendChild(input);

			// copy
			input.select();
			document.execCommand("Copy");

			// remove
			document.body.removeChild(input);

			// end
		}
	}
};
</script>
<style></style>