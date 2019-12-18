<template>
	<div style="margin: 50px">
		<vc-button @click="type = type === 'date' ? 'datetime' : 'date'">{{ type }}</vc-button>
		<vc-date-picker 
			v-model="value"
			:options="options" 
			:start-date="new Date('2019', '10', '11')"
			:type="type"
			clearable
			multiple
			placeholder="Select date" 
			style="width: 200px"
			@visible-change="handleVisibleChange"
			@change="handleChange"
		/>
		<vc-date-picker 
			:value="valueRange"
			:split-panels="false" 
			:options="options" 
			type="datetimerange" 
			clearable
			placeholder="Select date"
			style="width: 300px"
			@change="handleRangeChange"
		/>
		<h2>Year</h2>
		<vc-date-picker 
			v-model="year"
			type="year" 
			clearable
			confirm
			placeholder="Select date"
			style="width: 200px"
			@change="handleYearChange"
		/>
		<h2>Month</h2>
		<vc-date-picker 
			v-model="month"
			type="month" 
			clearable
			placeholder="Select date"
			style="width: 200px"
			@change="handleMonthChange"
		/>
		<h2>Quarter</h2>
		<vc-date-picker 
			v-model="quarter"
			type="quarter" 
			clearable
			confirm
			placeholder="Select date"
			style="width: 200px"
			@change="handleQuarterChange"
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
			// valueRange: '',
			year: '',
			month: '',
			quarter: '',
			type: 'datetime',
			options: {
				disabledDate: (date) => {
					let year = date.getFullYear();
					let month = date.getMonth();
					return false;
				}
			},
			rangeStart: '',
			rangeEnd: ''
		};
	},
	computed: {
		valueRange() {
			return [this.rangeStart, this.rangeEnd];
		}
	},
	methods: {
		handleVisibleChange(v) {
			// console.log('VisibleChange', v);
		},
		handleChange(v) {
			console.log(v);
		},
		handleRangeChange(v) {
			this.rangeStart = v[0];
			this.rangeEnd = v[1];
			console.log(v);
		},
		handleYearChange(v) {
			console.log('year-change', v);
		},
		handleMonthChange(v) {
			console.log('month-change', v);
		},
		handleQuarterChange(v) {
			console.log('quarter-change', v);
		},
	}
};
</script>
