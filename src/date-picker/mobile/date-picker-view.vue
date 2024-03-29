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
import { value2date, date2value, parseMode, getMonthEndDay } from '../utils';
import { QUARTER_CN } from '../constants';

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
			type: Date | Array,
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
			default: () => {
				// 默认 50 年后
				const now = new Date();
				return new Date(now.setFullYear(now.getFullYear() + 50));
			}
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
			QUARTER_CN,
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
				: getMonthEndDay(this.currentValue[0], this.currentValue[1]);
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
				case 'quarter':
					return {
						year,
						quarter: [1, 4]
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
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				if ((v && new Date(v) == 'Invalid Date' && this.mode !== 'quarter') || (!Array.isArray(v) && this.mode === 'quarter')) {
					throw new VcError('m-data-picker', 'Invalid Date');
				}

				/**
				 * 事件对象情况下同值会重新set
				 * 如果v为undefined，this.currentValue也undefined
				 * NaN !== NaN true -> this.currentValue = undefined;
				 */
				if (this.currentValue.length === 0 
					|| (+new Date(v) !== +value2date(this.currentValue) && this.mode !== 'quarter') 
					|| (this.mode === 'quarter' && this.currentValue !== v)) {
					this.currentValue = this.mode === 'quarter' ? this.getQuarterValue(v) : date2value(v, this.modeArr);
					this.rebuildData = this.makeRebuildData();
				}
			}
		}
	},
	methods: {
		/**
		 * 设置默认值，格式化值 -> ['2020-01', '2020-03'] -> ['2020', '1']
		 */
		getQuarterValue(val) {
			let year = new Date().getFullYear();
			let quarter = '1';
			if (val.length) {
				year = new Date(val[0]).getFullYear();
				quarter = this.getQuarterMonth(val[0]);
			}
			return [year + '', quarter];
		},
		getQuarterMonth(value) {
			let month = value.getMonth();
			switch (month) {
				case 0:
				case 2:
					return '1';
				case 3:
				case 5:
					return '2';
				case 6:
				case 8:
					return '3';
				case 9:
				case 11:
					return '4';
				default:
					return false;
			}
		},
		compareWithBoundary(arg1 = [], arg2 = [], len = 0) {
			return arg1.slice(0, len).join('') == arg2.slice(0, len).join('');
		},
		
		makeRebuildData() {
			let result = [];
			const INTERVAL_MAP = {
				Y: this.ranges.year,
				M: this.ranges.month,
				D: this.ranges.date,
				H: this.ranges.hour,
				m: this.ranges.min,
				Q: this.ranges.quarter
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
				Q: '季度'
			};
			let arr = Array.from({ length: end - start + 1 }, (no, x) => {
				let afterNum = x + start;
				let finallyStr = type === 'Q' ? `第${QUARTER_CN[afterNum]}` : String(Utils.preZero(afterNum));

				return {
					value: type === 'Q' ? String(afterNum) : finallyStr,
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
			let formaterValue = this.mode === 'quarter' ? v : value2date(v);
			this.allowDispatch && this.dispatch('vc-form-item', 'form-change', formaterValue);
			this.$emit('change', formaterValue);
		},
	}
};
</script>
