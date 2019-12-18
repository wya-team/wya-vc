<template>
	<div style="margin: 50px">
		<vc-button @click="type = type === 'date' ? 'datetime' : 'date'">{{ type }}</vc-button>
		<vc-date-picker 
			v-model="value"
			:options="options" 
			:start-date="new Date('2019', '10', '11')"
			:type="type"
			clearable
			placeholder="Select date" 
			style="width: 200px"
			@visible-change="handleVisibleChange"
			@change="handleChange"
		/>
		<vc-date-picker 
			v-model="valueRange"
			:split-panels="false" 
			:options="options" 
			type="datetimerange" 
			clearable
			placeholder="Select date"
			style="width: 300px"
		/>
		<h2>Year</h2>
		<vc-date-picker 
			v-model="year"
			type="year" 
			clearable
			confirm
			placeholder="Select date"
			style="width: 200px"
		/>
		<h2>Month</h2>
		<vc-date-picker 
			v-model="month"
			type="month" 
			clearable
			placeholder="Select date"
			style="width: 200px"
		/>
	</div>
</template>
<script>
import Button from '../../button/index';
import DatePicker from '..';

export default {
	name: "vc-date-picker-basic",
	components: {
		'vc-date-picker': DatePicker,
		'vc-button': Button
	},
	data() {
		return {
			value: '',
			valueRange: '',
			year: '',
			month: '',
			type: 'datetime',
			options: {
				disabledDate: (date) => {
					let year = date.getFullYear();
					let month = date.getMonth();
					return false;
				}
			}
		};
	},
	computed: {
		
	},
	methods: {
		handleVisibleChange(v) {
			console.log('VisibleChange', v);
		},
		handleChange(v) {
			console.log(v);
		}
	}
};
</script>
