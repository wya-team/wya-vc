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
		{{ quarter }}
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
			<h2>Date-shortcuts</h2>
			<vc-date-picker
				:value="valueRange2"
				:options="options3"
				type="datetimerange"
				clearable
				placeholder="Select date"
				style="width: 300px"
				@change="handleRangeChange2"
			/>
			<vc-date-picker
				v-model="value2"
				:options="options2"
				:start-date="new Date('2019', '10', '11')"
				:type="type"
				clearable
				confirm
				multiple
				format="YYYY-MM-DD"
				placeholder="Select date"
				@change="handleChange"
				@clear="handleClear"
			/>
			<br>
			<h2>Month-shortcuts</h2>
			<vc-date-picker
				v-model="monthrange3"
				type="monthrange"
				clearable
				:options="optionsMonth"
				confirm
				placeholder="Select date"
				style="width: 200px"
			/>
			<vc-date-picker
				v-model="monthrange2"
				type="month"
				clearable
				confirm
				:options="optionsMonth2"
				placeholder="Select date"
				style="width: 200px"
			/>
			<h2>Quarter-shortcuts</h2>
			<vc-date-picker
				v-model="quarter"
				type="quarter"
				clearable
				confirm
				placeholder="Select date"
				:options="optionsQuarter"
				style="width: 200px"
				@change="handleQuarterChange"
			/>
			<h2>QuarterRange-shortcuts</h2>
			{{ quarterrange }}
			<vc-date-picker
				v-model="quarterrange"
				type="quarterrange"
				:options="optionsQuarterRange"
				clearable
				placeholder="Select date"
				style="width: 250px"
				@change="handleQuarterChange"
			/>
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
			monthrange2: '',
			monthrange3: '',
			value2: [new Date()],
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
			optionsMonth: {
				shortcuts: [
					{
						text: '一年前',
						value() {
							const startDate = new Date('2019-01-01');
							const endDate = new Date('2020-01-01');
							return [startDate, endDate];
						}
					},
					{
						text: '一年后',
						value() {
							const startDate = new Date('2020-01-01');
							const endDate = new Date('2021-01-01');
							return [startDate, endDate];
						}
					}
				]
			},
			optionsMonth2: {
				shortcuts: [
					{
						text: '一年前',
						value() {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
							return date;
						}
					},
					{
						text: '一年',
						value() {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
							return date;
						}
					},
					{
						text: '二年',
						value() {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 2);
							return date;
						}
					},
					{
						text: '三年',
						value() {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 3);
							return date;
						}
					},
					{
						text: '五年',
						value() {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 5);
							return date;
						}
					}
				]
			},
			options2: {
				shortcuts: [
					{
						text: '一年',
						value() {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
							return date;
						}
					},
					{
						text: '二年',
						value() {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 365 * 2);
							return date;
						}
					},
					{
						text: '三年',
						value() {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 365 * 3);
							return date;
						}
					},
					{
						text: 'onClick方法',
						onClick: () => {
							const num = Math.random() * 10;
							const date = new Date();
							if (num > 5) {
								this.value2 = [new Date(date.setTime(date.getTime() - 3600 * 1000 * 24 * 365))];
							} else {
								this.value2 = [new Date(date.setTime(date.getTime() - 3600 * 1000 * 24 * 365 * 2))];
							}
						}
					}
				],
				// disabledDate(time) {
				// 	return time.getTime() > Date.now();
				// }
			},
			options3: {
				shortcuts: [
					{
						text: '一年前',
						value() {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 365);
							return [date, new Date()];
						}
					},
					{
						text: '一年',
						value() {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
							return [new Date(), date];
						}
					},
					{
						text: '二年',
						value() {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 2);
							return [new Date(), date];
						}
					},
					{
						text: '三年',
						value() {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 3);
							return [new Date(), date];
						}
					},
					{
						text: '五年',
						value() {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 5);
							return [new Date(), date];
						}
					}
				],
				// disabledDate(time) {
				// 	return time.getTime() > Date.now();
				// }
			},
			optionsQuarter: {
				shortcuts: [
					{
						text: '19年3季度',
						value() {
							const startDate = new Date('2019-07-01');
							const endDate = new Date('2019-09-01');
							return [startDate, endDate];
						}
					},
					{
						text: '20年1季度',
						value() {
							const startDate = new Date('2020-01-01');
							const endDate = new Date('2020-03-01');
							return [startDate, endDate];
						}
					}
				],
				// disabledDate(time) {
				// 	console.log(time);
				// 	return time > 2 && time < 4;
				// }
			},
			optionsQuarterRange: {
				shortcuts: [
					{
						text: '19/2季度～21/3季度',
						value() {
							const startDate = new Date('2019-04-01');
							const endDate = new Date('2021-09-30');
							return [startDate, endDate];
						}
					},
					{
						text: '21/2季度～24/4季度',
						value() {
							const startDate = new Date('2021-04-01');
							const endDate = new Date('2024-12-30');
							return [startDate, endDate];
						}
					}
				],
			},
			rangeStart: '',
			rangeEnd: '',
			rangeStart2: '',
			rangeEnd2: '',
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
		},
		valueRange2() {
			return [this.rangeStart2, this.rangeEnd2];
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
			console.log(v);
			this.rangeStart = v[0];
			this.rangeEnd = v[1];
			console.log('range-change', v);
		},
		handleRangeChange2(v) {
			console.log(v);
			this.rangeStart2 = v[0];
			this.rangeEnd2 = v[1];
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
