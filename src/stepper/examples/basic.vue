<template>
	<stepper 
		v-model="value"
	/>
</template>
<script>
import Stepper from '../index';

export default {
	name: "vc-stepper-basic",
	components: {
		Stepper
	},
	data() {
		return {
			value: 0
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>