<template>
	<div style="margin: 50px">
		<vc-button @click="type = type === 'date' ? 'datetime' : 'date'">
			{{ type }}
		</vc-button>
		<vc-date-picker 
			v-model="value"
			:options="options" 
			:start-date="new Date('2019', '10', '11')"
			:type="type"
			clearable
			format="YYYY-MM-DD"
			placeholder="Select date" 
			@change="handleChange"
			@clear="handleClear"
		/>
		<vc-date-picker 
			:options="options" 
			:start-date="new Date('2019', '10', '11')"
			:type="type"
			clearable
			confirm
			format="YYYY-MM-DD"
			placeholder="Select date" 
			@change="handleChange"
		/>
		<vc-date-picker 
			:value="valueRange"
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
		<h2>自定义</h2>
		<vc-date-picker 
			v-model="month"
			:open="dateOpen"
			type="month" 
			clearable
			placeholder="Select date"
			style="width: 200px"
			@change="handleMonthChange"
			@visible-change="handleVisibleChange"
		>
			<span @click.stop="handleSelectMonth">
				{{ month || '请选择' }}
			</span>
		</vc-date-picker>
		<h2>MonthRange</h2>
		<vc-date-picker 
			v-model="monthrange"
			type="monthrange" 
			clearable
			confirm
			placeholder="Select date"
			style="width: 200px"
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
		<h2>QuarterRange</h2>
		<vc-date-picker 
			v-model="quarterrange"
			type="quarterrange" 
			clearable
			placeholder="Select date"
			style="width: 250px"
			@change="handleQuarterChange"
		/>
		<h2>datetime校验选择时间不可以大于当前时间，精确到时分秒</h2>
		<!-- new Date().getTime() + 24*60*60*1000 -->
		<vc-date-picker
			v-model="formValidate.date"
			:start-date="new Date()"
			:options="disableDate"
			:time-picker-options="timeOpts"
			type="datetime"
			format="YYYY-MM-DD HH:mm:ss"
			class="g-w-300"
			placeholder="请选择"
			@change="handleChangeTime"
		/>
		<h2>Form表单校验</h2>
		<vc-form
			ref="form"
			:model="formValidate" 
			:rules="ruleValidate" 
		>
			<vc-form-item prop="date">
				<vc-date-picker 
					v-model="formValidate.date"
					type="datetime" 
					clearable
					placeholder="Select date" 
					style="width: 300px"
				/>
			</vc-form-item>
			<div @click="handleSubmit">
				提交
			</div>
		</vc-form>
	</div>
</template>
<script>
import Message from '../../message';
import Form from '../../form';
import Button from '../../button/index';
import DatePicker from '..';

export default {
	name: "vc-date-picker-basic",
	components: {
		'vc-date-picker': DatePicker,
		'vc-button': Button,
		'vc-form': Form,
		'vc-form-item': Form.Item,
	},
	data() {
		return {
			value: '2010-10-10',
			year: '',
			month: '',
			monthrange: '',
			quarter: '',
			quarterrange: '',
			type: 'date',
			dateOpen: false,
			disableDate: {
				disabledDate(date) {
					return date && (date.valueOf() < Date.now() - 86400000 || date.valueOf() > Date.now() + 864000000);
				},
			},
			timeOpts: {
				disabledHours: [],
				disabledMinutes: [],
				disabledTime(date) {
					return date && (date.valueOf() < Date.now() || date.valueOf() > Date.now() + 864000000);
				}
			},
			options: {
				disabledDate: (date) => {
					return false;
				}
			},
			rangeStart: '',
			rangeEnd: '',
			formValidate: {
				date: ''
			},
			ruleValidate: {
				date: [
					{ required: true, type: 'date', message: '请选择日期', trigger: 'change' }
				],
			}
		};
	},
	computed: {
		valueRange() {
			return [this.rangeStart, this.rangeEnd];
		}
	},
	methods: {
		handleChangeTime(val) {
			console.log('val :', val);
		},
		handleVisibleChange(v) {
			console.log('VisibleChange', v);
			this.dateOpen = v;
		},
		handleClear(v) {
			console.log('clear', v);
		},
		handleChange(v) {
			console.log('change', v);
		},
		handleRangeChange(v) {
			this.rangeStart = v[0];
			this.rangeEnd = v[1];
			console.log('range-change', v);
		},
		handleYearChange(v) {
			console.log('year-change', v);
		},
		handleSelectMonth() {
			this.dateOpen = !this.dateOpen;
		},
		handleMonthChange(month) {
			this.month = month;
			this.dateOpen = false;
		},
		handleQuarterChange(v) {
			console.log('quarter-change', v);
		},
		handleSubmit(name) {
			this.$refs.form.validate((valid) => {
				if (valid) {
					Message.success('Success!');
				} else {
					Message.error('Fail!');
				}
			});
		},
	}
};
</script>
