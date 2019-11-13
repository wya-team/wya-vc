<template>
	<div>
		<vc-color-picker v-model="color1" />
		<vc-color-picker v-model="color2" />
		<custom-picker v-model="color3" />
	</div>
</template>
<script>
import ColorPicker from '..';
import CustomPicker from '../main.vue';

export default {
	name: "vc-color-picker-basic",
	components: {
		'vc-color-picker': ColorPicker,
		'custom-picker': CustomPicker
	},
	data() {
		return {
			color1: '#19be6b',
			color2: '',
			color3: 'rgb(19, 206, 102)'
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
