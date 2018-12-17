<template>
	<c-picker
		:show-toolbar="true"
		:data-source="dateSlots"
		:cols="typeStr.length"
		v-model="currentValue"
		@colChange="onChange"
		@close="handleClose"
		@sure="handleSure" />
</template>

<script>
import CPicker from '../m-picker/core.vue';
import CreatePortal from '../create-portal/index';


const config = {
	components: { CPicker },
	name: "vcm-date-picker-core",
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		type: {
			type: String,
			// 'datetime', 'date', 'time'
			default: 'datetime'
		},
		minDate: {
			type: Date,
			default: () => new Date(+new Date() - (20 * 365 * 24 * 60 * 60 * 1000))
		},
		maxDate: {
			type: Date,
			default: () => new Date(+new Date() + (10 * 365 * 24 * 60 * 60 * 1000))
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
		value: null
	},
	data() {
		return {
			show: true,
			currentValue: [],
			dateSlots: []
		};
	},
	minxin: [],
	computed: {
		typeStr() {
			switch (this.type) {
				case 'date':
					return 'YMD';
				case 'time':
					return 'Hm';
				default:
					return 'YMDHm';
			}
		},
		computedStartEnd() {
			if (this.type === 'time') {
				return {
					hour: [this.startHour, this.endHour],
					min: [0, 59]
				};
			}
			if (this.type === 'date') {
				return {
					year: [this.minDate.getFullYear(), this.maxDate.getFullYear()],
					month: [1, 12],
					date: [1, this.getMonthEndDay(this.currentValue[0] * 1, this.currentValue[1] * 1)],
				};
			}
			return {
				year: [this.minDate.getFullYear(), this.maxDate.getFullYear()],
				month: [1, 12],
				date: [1, this.getMonthEndDay(this.currentValue[0] * 1, this.currentValue[1] * 1)],
				hour: [0, 23],
				min: [0, 59]
			};
		}
	},
	watch: {
		computedStartEnd() {
			this.generateSlots();
		},
		currentValue() {
			this.$emit('change', this.dateVal());
		},
		value: {
			immediate: true,
			handler(v) {
				if (v && new Date(v) == 'Invalid Date') {
					console.error('Invalid Date');
					return;
				}
				if (+new Date(v) !== +this.dateVal() && v) {
					const arr = {
						Y: v.getFullYear() + '',
						M: v.getMonth() * 1 + 1 + '',
						D: v.getDate() + '',
						H: v.getHours() + '',
						m: v.getMinutes() + '',
					};
					let typeArr = this.typeStr.split('');
					typeArr.forEach((item, index) => {
						this.currentValue.splice(index, 1, arr[item]);
					});
				}
			}
		}
	},
	mounted() {
		this.generateSlots();
	},
	methods: {
		dateVal(formate) {
			let arr = [];
			for (let i = 0; i < 5 - this.currentValue.length; i++) {
				arr.push(false);
			}
			arr = [...this.currentValue, ...arr];
			const INTERVAL_MAP = {
				Y: arr[0] || new Date().getFullYear(),
				M: arr[1] || new Date().getMonth() * 1 + 1,
				D: arr[2] || new Date().getDate(),
				H: arr[3] || '00',
				m: arr[4] || '00',
			};
			let str = this.format;
			if (formate) {
				return str.replace(/YYYY/g, INTERVAL_MAP.Y)
					.replace(/MM/g, INTERVAL_MAP.M)
					.replace(/dd/g, INTERVAL_MAP.D)
					.replace(/HH/g, INTERVAL_MAP.H)
					.replace(/mm/g, INTERVAL_MAP.m);
			} else {
				return new Date(INTERVAL_MAP.Y, INTERVAL_MAP.M * 1 - 1, INTERVAL_MAP.D, INTERVAL_MAP.H, INTERVAL_MAP.m);
			}
		},
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
		generateSlots() {
			let dateSlots = [];
			const INTERVAL_MAP = {
				Y: this.computedStartEnd.year,
				M: this.computedStartEnd.month,
				D: this.computedStartEnd.date,
				H: this.computedStartEnd.hour,
				m: this.computedStartEnd.min
			};
			let typesArr = this.typeStr.split('');
			typesArr.forEach(type => {
				if (INTERVAL_MAP[type]) {
					this.pushSlots.apply(null, [dateSlots, type].concat(INTERVAL_MAP[type]));
				}
			});
			for (let i = 0; i < dateSlots.length; i++) {
				let eq = dateSlots[i].find(item => item.value === this.currentValue[i]);
				if (!eq) {
					this.currentValue.splice(i, 1, dateSlots[i][0].value);
				}
			}
			this.dateSlots = dateSlots;
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
				let finallyStr = afterNum * 1 >= 10 ? afterNum + '' : `0${afterNum}`;
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
		handleClose() {
			this.$emit('close', []);
		},
		onChange() {},
		handleSure() {
			this.$emit('sure', this.dateVal());
		},
		handleCancel() {}
	},
	destoryed() {}
};
export default config;

export const datePicker = CreatePortal({}, config);

</script>

<style scoped lang='scss'>
</style>
