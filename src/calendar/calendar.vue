<template>
	<div class="vc-calendar">
		<slot
			v-if="$slots.month || $scopedSlots.month"
			:data="{month: monthNames[showMonth][lang], year: showYear}" 
			name="month" 
		/>
		<month-header
			v-else
			:render="renderMonth"
			:month="showMonth"
			:year="showYear"
			:month-names="monthNames"
			:lang="lang"
		/>
		
		<transition :name="slideDirect">
			<div :key="showMonth" class="__calendar-item">
				<slot
					v-if="$slots.week || $scopedSlots.week"
					:data="weekNames.map((item) => item[lang])" 
					name="week" 
				/>
				<week-header
					v-else
					:render="renderWeek"
					:week-names="weekNames"
					:lang="lang"
				/>
				<div>
					<div v-for="i in 6" :key="i" class="__date-row">
						<span
							v-for="(item, index) in dateArr.data.slice((i - 1) * 7, (i - 1) * 7 + 7)"
							:class="`__date-item __date-${item.type}`"
							:key="index"
						>
							<slot
								v-if="$slots.default || $scopedSlots.default"
								:data="item" 
								:curDate="curDateStr"
								:holiday="date2holiday(item.date)"
							/>
							<date-item
								v-else
								:date="item"
								:cur-date-str="curDateStr"
								:render="renderDate"
							/>
						</span>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import CreateCustomer from "../create-customer/index";
import { prefixZero } from "../utils/index";
import date2holiday from "./date2holiday";

const monthNames = [
	{ ch: "一月", en: "January" },
	{ ch: "二月", en: "February" },
	{ ch: "三月", en: "March" },
	{ ch: "四月", en: "April" },
	{ ch: "五月", en: "May" },
	{ ch: "六月", en: "June" },
	{ ch: "七月", en: "July" },
	{ ch: "八月", en: "August" },
	{ ch: "九月", en: "September" },
	{ ch: "十月", en: "October" },
	{ ch: "十一月", en: "November" },
	{ ch: "十二月", en: "December" }
];
const weekNames = [
	{ ch: "日", en: "Sun" },
	{ ch: "一", en: "Mon" },
	{ ch: "二", en: "Tue" },
	{ ch: "三", en: "Wed" },
	{ ch: "四", en: "Thu" },
	{ ch: "五", en: "Fri" },
	{ ch: "六", en: "Sta" }
];
const MonthHeader = CreateCustomer({
	month: Number,
	year: Number,
	monthNames: Array,
	lang: String
});
const WeekHeader = CreateCustomer({
	weekNames: Array,
	lang: String
});
const DateItem = CreateCustomer({
	date: Object,
	curDateStr: String
});

const curDate = new Date();

const defaultRenderDate = (h, { date, curDateStr }) => {
	return <span class={date.date === curDateStr ? "__selected" : ""}>{date.day}</span>;
};
const defaultRenderMonth = (h, { month, year, lang, monthNames }) => {
	return (
		<div class="__month-header">
			<div>
				{monthNames[month][lang]} &nbsp;&nbsp;&nbsp;&nbsp;
				{year}
			</div>
		</div>
	);
};
const defaultRenderWeek = (h, { weekNames, lang }) => {
	return (
		<div class="__week-header">
			{
				weekNames.map((item, index) => {
					return <span key={index}>{item[lang]}</span>;
				})
			}
		</div>
	);
};

export default {
	name: "vc-calendar",
	components: {
		"date-item": DateItem,
		"month-header": MonthHeader,
		"week-header": WeekHeader
	},
	props: {
		renderMonth: {
			type: Function,
			default: defaultRenderMonth
		},
		renderWeek: {
			type: Function,
			default: defaultRenderWeek
		},
		renderDate: {
			type: Function,
			default: defaultRenderDate
		},
		lang: {
			type: String,
			default: "ch"
		},
		monthNames: {
			type: Array,
			default: () => monthNames
		},
		weekNames: {
			type: Array,
			default: () => weekNames
		}
	},
	data() {
		return {
			curDate,
			showMonth: curDate.getMonth(), // 要展示的月份 0-11
			showYear: curDate.getFullYear(), // 要展示的年份,
			slideDirect: "",
			toggle: true
		};
	},
	computed: {
		dateArr() {
			return this.getCurrentInfo(this.showYear, this.showMonth + 1);
		},
		curDateStr() {
			return `${this.curDate.getFullYear()}-${prefixZero(this.curDate.getMonth() + 1)}-${prefixZero(
				this.curDate.getDate()
			)}`;
		}
	},
	mounted() {
		console.log(this.monthNames, this);
	},
	methods: {
		getCurrentInfo(year, month) {
			let prevYear;
			let nextYear;
			let prevMonth;
			let nextMonth;
			let prevData;
			let curData;
			let nextData;

			// 处理下当前值
			if (month === 0) {
				year -= 1;
				month = 12;
			} else if (month === 13) {
				year += 1;
				month = 1;
			}

			prevYear = year;
			nextYear = year;
			prevMonth = month - 1;
			nextMonth = month + 1;

			// 处理前后值
			if (month === 1) {
				prevYear = year - 1;
				prevMonth = 12;
			} else if (month === 12) {
				nextYear = year + 1;
				nextMonth = 1;
			}

			prevData = this.createDaysArray(prevYear, prevMonth, this.getMonthDays(prevYear, prevMonth), "prev");
			curData = this.createDaysArray(year, month, this.getMonthDays(year, month), "current");
			nextData = this.createDaysArray(nextYear, nextMonth, this.getMonthDays(nextYear, nextMonth), "next");

			// 生成日历数组
			let firstWeek = this.getWeek(`${year}-${prefixZero(month)}-1`); // 本月第一天是星期几
			let data = [
				...prevData.slice(prevData.length - (firstWeek === 0 ? 7 : firstWeek), prevData.length),
				...curData,
				...nextData.slice(0, 42 - firstWeek - curData.length)
			];

			return {
				year,
				month,
				data
			};
		},
		// 创建每个月天数的数组
		createDaysArray(year, month, days, type) {
			let array = [];
			for (let i = 0; i < days; i++) {
				let item = {};
				item.date = `${year}-${prefixZero(month)}-${prefixZero(i + 1)}`;
				item.day = i + 1;
				item.type = type;
				array.push(item);
			}
			return array;
		},

		// 获取某月的天数
		getMonthDays(year, month) {
			let day = new Date(year, month, 0);
			return day.getDate();
		},

		// 根据日期判断是星期几
		getWeek(dateString) {
			let date;
			if (!dateString) {
				date = new Date();
			} else {
				let dateArray = dateString.split("-");
				date = new Date(dateArray[0], parseInt(dateArray[1] - 1, 10), dateArray[2]);
			}

			// return "星期" + "日一二三四五六".charAt(date.getDay());
			return date.getDay();
		},
		date2holiday(dateStr) {
			return date2holiday(dateStr);
		},

		next() {
			this.slideDirect = "left";
			this.toggle = !this.toggle;
			if (this.showMonth === 11) {
				this.showMonth = 0;
				this.showYear++;
			} else {
				this.showMonth++;
			}
		},
		prev() {
			this.slideDirect = "right";
			this.toggle = !this.toggle;
			if (this.showMonth === 0) {
				this.showMonth = 11;
				this.showYear--;
			} else {
				this.showMonth--;
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../style/index.scss';
.vc-calendar {
	width: 100%;
	position: relative;
	overflow: hidden;
	.__calendar-item {
		width: 100%;
		transition: all .3s;
		position: relative;
		z-index: 0;
		.__date-row {
			@include commonFlex();
			// padding-top: 15px;
			// padding-bottom: 15px;
		}
		.__date-item {
			@include commonFlexCc();
			flex:1 ;
			font-size: 16px;
			&.__date-prev,
			&.__date-next {
				color: lightgray;
			}
		}
		.__week-header {
			@include commonFlex();
			width: 100%;
			align-items: center;
			color: gray;
			padding: 15px 0;
			font-size: 16px;
			> span {
				width: 14.28%;
				text-align: center;
			}
		}
		.__selected {
			@include commonFlexCc();
			width: 40px;
			height: 40px;
			border-radius: 20px;
			background-color: #2f75ef;
			color: #fff;
			box-shadow: 1px 2px 10px #2f8aef;
		}
		
	}
	.__month-header {
		@include commonFlexCc();
		line-height: 60px;
		font-size: 24px;
		background-color: #f5f6f7;
		color: #2e3136;
	}
}
.right-leave-active,
.left-leave-active {
	position: absolute !important;
}
.right-leave-to,
.left-enter {
	transform: translateX(100%);
}
.right-enter,
.left-leave-to {
	transform: translateX(-100%);
}
</style>