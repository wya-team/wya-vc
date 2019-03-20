<template>
	<div>
		<vc-time-picker confirm placeholder="Select time" style="width: 168px"/>
		<vc-time-picker 
			confirm 
			mode="timerange" 
			placement="bottom-end" 
			placeholder="Select time" 
			style="width: 168px"/>
	</div>
</template>
<script>
import TimePicker from '..';

export default {
	name: "vc-time-picker-basic",
	components: {
		'vc-time-picker': TimePicker
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
