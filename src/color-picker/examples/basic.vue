<template>
	<div>
		<vc-color-picker v-model="color1" />
		<vc-color-picker v-model="color2" />
	</div>
</template>
<script>
import ColorPicker from '..';

export default {
	name: "vc-color-picker-basic",
	components: {
		'vc-color-picker': ColorPicker
	},
	data() {
		return {
			color1: '#19be6b',
			color2: ''
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
