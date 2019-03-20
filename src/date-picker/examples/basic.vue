<template>
	<div>
		<vc-date-picker mode="date" confirm placeholder="Select date" style="width: 200px"/>
		<vc-date-picker 
			mode="daterange" 
			confirm 
			placement="bottom-end" 
			placeholder="Select date" 
			style="width: 200px"/>
	</div>
</template>
<script>
import DatePicker from '..';

export default {
	name: "vc-date-picker-basic",
	components: {
		'vc-date-picker': DatePicker
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
