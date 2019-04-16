<template>
	<vcm-stepper v-model="value" />
</template>
<script>
import Stepper from '../index';

export default {
	name: "vcm-stepper-basic",
	components: {
		'vcm-stepper': Stepper
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