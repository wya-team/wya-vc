<template>
	<vcm-picker-view
		v-model="currentValue"
		:data-source="rebuildData"
		:cols="cols"
		:cascade="false"
		@picker-change="handleChange"
	/>
</template>

<script>
import { Utils } from '@wya/utils';
import MPicker from '../../picker/index.m';
import { VcError } from '../../vc/index';
import { getSelectedData } from '../../utils/index';
import emitter from '../../extends/mixins/emitter'; // 表单验证
import { value2date, date2value, parseMode } from '../utils';

export default {
	name: "vcm-date-picker-view",
	components: { 
		'vcm-picker-view': MPicker.View 
	},
	mixins: [emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: Date,
			// default: () => new Date()
		},
		mode: {
			type: String,
			default: 'datetime',
		},
		minDate: {
			type: Date,
			default: () => new Date('1990')
		},
		maxDate: {
			type: Date,
			default: () => new Date('2030')
		},
		startHour: {
			type: Number,
			default: 0
		},
		endHour: {
			type: Number,
			default: 23
		},
		allowDispatch: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			currentValue: [],
			rebuildData: []
		};
	},
	computed: {
		modeArr() {
			return parseMode(this.mode).split('');
		},
		cols() {
			return this.modeArr.length;
		},
		ranges() {
			switch (this.mode) {
				case 'date':
					return {
						year: [this.minDate.getFullYear(), this.maxDate.getFullYear()],
						month: [1, 12],
						date: [1, this.getMonthEndDay(this.currentValue[0] * 1, this.currentValue[1] * 1)],
					};
				case 'time':
					return {
						hour: [this.startHour, this.endHour],
						min: [0, 59]
					};
				default:
					return {
						year: [this.minDate.getFullYear(), this.maxDate.getFullYear()],
						month: [1, 12],
						date: [1, this.getMonthEndDay(this.currentValue[0] * 1, this.currentValue[1] * 1)],
						hour: [0, 23],
						min: [0, 59]
					};
			}
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				if (v && new Date(v) == 'Invalid Date') {
					throw new VcError('m-data-picker', 'Invalid Date');
				}

				/**
				 * 事件对象情况下同值会重新set
				 */
				if (+new Date(v) !== +value2date(this.currentValue) && v) {
					this.currentValue = date2value(v, this.modeArr);
					this.rebuildData = this.makeRebuildData();
				}

				if (!v) {
					this.currentValue = date2value(new Date(), this.modeArr);
					this.rebuildData = this.makeRebuildData();
				}
			}
		},
		currentValue(v) {
			let formaterValue = value2date(v);
			this.$emit('change', formaterValue);
			this.allowDispatch && this.dispatch('vc-form-item', 'form-change', formaterValue);
		}
	},
	methods: {
		getMonthEndDay(year, month) {
			if (this.isShortMonth(month)) {
				return 30;
			} else if (month === 2) {
				return this.isLeapYear(year) ? 29 : 28;
			} else {
				return 31;
			}
		},
		isShortMonth(month) {
			return [4, 6, 9, 11].indexOf(month) > -1;
		},
		isLeapYear(year) {
			return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
		},
		
		makeRebuildData() {
			let result = [];
			const INTERVAL_MAP = {
				Y: this.ranges.year,
				M: this.ranges.month,
				D: this.ranges.date,
				H: this.ranges.hour,
				m: this.ranges.min
			};
			this.modeArr.forEach(type => {
				if (INTERVAL_MAP[type]) {
					result.push(this.makeData(type, ...INTERVAL_MAP[type]));
				}
			});

			return result;
		},

		makeData(type, start, end) {
			const INTERVAL_MAP = {
				Y: '年',
				M: '月',
				D: '日',
				H: '时',
				m: '分',
			};
			let arr = Array.from({ length: end - start + 1 }, (no, x) => {
				let afterNum = x + start;
				let finallyStr = String(Utils.preZero(afterNum));
				return {
					value: finallyStr,
					label: finallyStr + INTERVAL_MAP[type]
				};
			});
			return arr;
		},

		checkValue() {
			let data = this.rebuildData;
			for (let i = 0; i < data.length; i++) {
				let eq = data[i].find(item => item.value === this.currentValue[i]);
				if (!eq) {
					this.currentValue.splice(i, 1, data[i][0].value);
				}
			}
		},

		handleChange(val, index) {
			/**
			 * 重新计算值
			 */
			this.currentValue.splice(index, 1, val.value);
			this.rebuildData = this.makeRebuildData();

			// 检查数值
			this.checkValue();

			this.$emit('picker-change');
		},

		getValue() {

		}
	}
};
</script>
