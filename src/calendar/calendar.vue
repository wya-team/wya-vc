<template>
	<div class="vc-calendar">
		<slot
			:data="{month: monthNames[showMonth][lang], year: showYear}" 
			name="month" 
		>
			<month-header
				:render="renderMonth"
				:month="showMonth"
				:year="showYear"
				:month-names="monthNames"
				:lang="lang"
			/>
		</slot>
		<transition-group :name="slideDirect">
			<div :key="showMonth" class="vc-calendar__content">
				<slot
					:data="weekNames.map((item) => item[lang])" 
					name="week" 
				>
					<week-header
						:render="renderWeek"
						:week-names="weekNames"
						:lang="lang"
					/>
				</slot>
				<div>
					<div v-for="i in 6" :key="i" class="vc-calendar-row">
						<span
							v-for="(item, index) in dateArr.data.slice((i - 1) * 7, (i - 1) * 7 + 7)"
							:class="`vc-calendar-row__item is-${item.type}`"
							:key="index"
						>
							<slot
								:data="item" 
								:curDate="curDateStr"
								:holiday="date2holiday(item.date)"
							>
								<date-item
									:date="item"
									:cur-date-str="curDateStr"
									:render="renderDate"
								/>
							</slot>
						</span>
					</div>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
import { prefixZero } from "../utils/index";
import date2holiday from "./date2holiday";
import { monthNames, weekNames } from './constants';
import {
	MonthHeader, WeekHeader, DateItem,
	defaultRenderDate, defaultRenderMonth, defaultRenderWeek
} from './components';

const curDate = new Date();

export default {
	name: "vc-calendar",
	components: {
		"date-item": DateItem,
		"month-header": MonthHeader,
		"week-header": WeekHeader,
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
			slideDirect: "left",
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

@include block(vc-calendar) {
	width: 100%;
	position: relative;
	overflow: hidden;
	@include element(month) {
		@include commonFlexCc();
		line-height: 60px;
		font-size: 24px;
		background-color: #f5f6f7;
		color: #2e3136;
	}
	@include element(week) {
		@include commonFlex();
		width: 100%;
		align-items: center;
		color: gray;
		padding: 15px 0;
		font-size: 16px;
		@include spec-selector('>') {
			span {
				width: 14.28%;
				text-align: center;
			}
		}
	}
	@include element(content) {
		width: 100%;
		transition: all .3s;
		position: relative;
		z-index: 0;
	}
	@include block(vc-calendar-row) {
		@include commonFlex();
		@include element(item) {
			@include commonFlexCc();
			flex:1 ;
			font-size: 16px;
			span {
				@include when(selected) {
					@include commonFlexCc();
					width: 40px;
					height: 40px;
					border-radius: 20px;
					background-color: #2f75ef;
					color: #fff;
					box-shadow: 1px 2px 10px #2f8aef;
				}
			}
			@include when(prev) {
				color: lightgray;
			}
			@include when(next) {
				color: lightgray;
			}
		}
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