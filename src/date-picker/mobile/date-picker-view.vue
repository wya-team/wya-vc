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
import Extends from '../../extends';
import { value2date, date2value, parseMode } from '../utils';

export default {
	name: "vcm-date-picker-view",
	components: { 
		'vcm-picker-view': MPicker.View 
	},
	mixins: [...Extends.mixins(['emitter'])],
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
		// iOS时间不要使用xxxx-xx -> xxxx/xx
		minDate: {
			type: Date,
			default: () => new Date('1940/01/01 00:00')
		},
		maxDate: {
			type: Date,
			default: () => new Date('2030/12/31 23:59')
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
		/**
		 * TODO: 最优算法
		 */
		ranges() {

			let min = date2value(this.minDate);
			let max = date2value(this.maxDate);

			// year
			let minYear = Number(min[0]);
			let maxYear = Number(max[0]);
			let year = [minYear, maxYear];

			// month
			let minMonth = this.compareWithBoundary(min, this.currentValue, 1) 
				? Number(min[1])
				: 1;
			let maxMonth = this.compareWithBoundary(max, this.currentValue, 1) 
				? Number(max[1])
				: 12;
			let month = [minMonth, maxMonth];

			// date
			let minDate = this.compareWithBoundary(min, this.currentValue, 2)
				? Number(min[2])
				: 1;
			let maxDate = this.compareWithBoundary(max, this.currentValue, 2)
				? Number(max[2])
				: this.getMonthEndDay(this.currentValue[0], this.currentValue[1]);
			let date = [minDate, maxDate];

			// hour
			let minHour = this.compareWithBoundary(min, this.currentValue, 3)
				? Number(min[3])
				: 0;

			let maxHour = this.compareWithBoundary(max, this.currentValue, 3)
				? Number(max[3])
				: 23;
			let hour = [minHour, maxHour];

			// minute
			let minMinute = this.compareWithBoundary(min, this.currentValue, 4)
				? Number(min[4])
				: 0;

			let maxMinute = this.compareWithBoundary(max, this.currentValue, 4)
				? Number(max[4])
				: 59;
			let minute = [minMinute, maxMinute];

			switch (this.mode) {
				case 'date':
					return {
						year,
						month,
						date,
					};
				case 'time':
					return {
						hour: [this.startHour, this.endHour],
						min: [0, 59]
					};
				default:
					return {
						year,
						month,
						date,
						hour,
						min: minute
					};
			}
		},
		defaultValue() {
			let now = new Date();
			return this.minDate > now ? this.minDate : now;
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
				 * 如果v为undefined，this.currentValue也undefined
				 * NaN !== NaN true -> this.currentValue = undefined;
				 */
				if (this.currentValue.length === 0 || +new Date(v) !== +value2date(this.currentValue)) {
					this.currentValue = date2value(v || this.defaultValue, this.modeArr);
					this.rebuildData = this.makeRebuildData();
				}
			}
		}
	},
	methods: {
		compareWithBoundary(arg1 = [], arg2 = [], len = 0) {
			return arg1.slice(0, len).join('') == arg2.slice(0, len).join('');
		},

		getMonthEndDay(year, month) {
			month = Number(month);
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

			this.sync();
		},

		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			let v = this.currentValue;
			let formaterValue = value2date(v);
			this.allowDispatch && this.dispatch('vc-form-item', 'form-change', formaterValue);
			this.$emit('change', formaterValue);
		}
	}
};
</script>
