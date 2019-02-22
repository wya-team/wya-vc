<template>
	<vc-input-number :max="10" :min="1" v-model="value1" />
</template>
<script>
import InputNumber from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-input-number': InputNumber
	},
	data() {
		return {
			value1: 1
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
