<template>
	<vcm-picker-core
		:show-toolbar="true"
		:data-source="dataSource"
		:cols="cols"
		:value="currentValue"
		@picker-change="handleChange"
		@destory="handleDestory"
		@close="handleClose"
		@sure="handleSure"
	/>
</template>

<script>
import MPickerCore from '../m-picker/core.vue';
import CreatePortal from '../create-portal/index';
import { getSelectedData, value2date, date2value, prefixZero } from '../utils/index';


const config = {
	name: "vcm-date-picker-core",
	components: { 
		'vcm-picker-core': MPickerCore 
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		mode: {
			type: String,
			default: 'datetime',
			validator: (val) => ['datetime', 'date', 'time'].includes(val)
		},
		minDate: {
			type: Date,
			default: () => new Date('1990')
		},
		maxDate: {
			type: Date,
			default: () => new Date('2020')
		},
		startHour: {
			type: Number,
			default: 0
		},
		endHour: {
			type: Number,
			default: 23
		},
		format: {
			type: String,
			default: 'YYYY-MM-dd HH:mm'
		},
		value: {
			type: Date,
			default: () => new Date()
		}
	},
	data() {
		return {
			show: true,
			currentValue: [],
			dataSource: []
		};
	},
	computed: {
		modeArr() {
			let result;
			switch (this.mode) {
				case 'date':
					result = 'YMD';
					break;
				case 'time':
					result = 'Hm';
					break;
				default:
					result = 'YMDHm';
					break;
			}
			return result.split('');
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
					console.error('Invalid Date');
					return;
				}
				if (+new Date(v) !== +value2date(this.currentValue) && v) {
					this.currentValue = date2value(v, this.modeArr);
				}
			}
		}
	},
	mounted() {
		this.dataSource = this.makeData();
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
		/**
		 * todo, 存在副作用，使用函数式编程
		 */
		makeData() {
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
					this.pushSlots.apply(null, [result, type].concat(INTERVAL_MAP[type]));
				}
			});
			for (let i = 0; i < result.length; i++) {
				let eq = result[i].find(item => item.value === this.currentValue[i]);
				if (!eq) {
					this.currentValue.splice(i, 1, result[i][0].value);
				}
			}
			return result;
		},
		fillValues(type, start, end) {
			const INTERVAL_MAP = {
				Y: '年',
				M: '月',
				D: '日',
				H: '时',
				m: '分',
			};
			let arr = Array.from({ length: end - start + 1 }, (no, x) => {
				let afterNum = x + start;
				let finallyStr = String(prefixZero(afterNum));
				return {
					value: finallyStr,
					label: finallyStr + INTERVAL_MAP[type]
				};
			});
			return arr;
		},
		pushSlots(slots, type, start, end) {
			slots.push(this.fillValues(type, start, end));
		},
		handleChange(val, index) {
			this.currentValue.splice(index, 1, val.value);
			this.dataSource = this.makeData();
		},
		/**
		 * CreatePortal事件或模拟其事件
		 */
		handleDestory() {
			this.$emit('destory');
		},
		handleClose() {
			this.$emit('close', []);
		},
		handleSure() {
			let selected = {
				...getSelectedData(this.currentValue, this.dataSource),
				date: value2date(this.currentValue)
			};
			this.$emit('sure', selected);
		}
	}
};
export default config;

export const Func = CreatePortal({}, config);

</script>

<style scoped lang='scss'>
</style>
