<template>
	<div style="padding: 50px">
		<h2>基础</h2>
		<vc-time-picker 
			v-model="time"
			placeholder="Select time" 
			style="width: 168px"
		/>
		<vc-time-picker 
			v-model="time_1"
			type="timerange" 
			placeholder="Select timerange" 
			style="width: 200px"
		/>
		<h2>带确认栏</h2>
		<vc-time-picker 
			v-model="time1"
			confirm
			placeholder="Select time" 
			style="width: 168px"
		/>
		<h2>时间格式</h2>
		<vc-time-picker 
			v-model="time2"
			format="HH点mm分"
			placeholder="Select time" 
			style="width: 168px"
		/>
		<h2>Steps</h2>
		<vc-time-picker 
			v-model="time3"
			:steps="[1, 15, 15]"
			placeholder="Select time" 
			style="width: 168px"
		/>
		<h2>不可选时间</h2>
		<vc-time-picker 
			v-model="time3"
			:disabled-hours="[1,5,10]"
			:disabled-minutes="[0,10,20]"
			placeholder="Select time" 
			style="width: 168px"
		/>
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
			time: '',
			time_1: '',
			time1: '',
			time2: '',
			time3: '',
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
