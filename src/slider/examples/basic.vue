<template>
	<div>
		<vc-slider
			v-model="value4"
			:step="10"
			@change="handleChange"
			@active-change="handleChange"
		/>
		<vc-slider
			v-model="value5"
			:step="10"
			range
		/>
	</div>
</template>
<script>
import Slider from '..';

export default {
	name: "vc-slider-basic",
	components: {
		'vc-slider': Slider
	},
	data() {
		return {
			value4: 30,
			value5: [20, 50]
		};
	},
	computed: {
		
	},
	methods: {
		handleChange() {
			console.log(arguments[0]);
		}
	}
};
</script>
