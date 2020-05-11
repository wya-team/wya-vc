<template>
	<div ref="target" class="vc-calendar">
		<slot
			:data="{ month: monthNames[currentMonth][lang], year: currentYear }" 
			name="month" 
		>
			<vc-customer
				:month="currentMonth"
				:year="currentYear"
				:month-names="monthNames"
				:render="renderMonth"
				:lang="lang"
			/>
		</slot>
		<transition-group :name="`vc-calendar__${slideMode}`">
			<div :key="currentMonth" class="vc-calendar__content">
				<slot
					:date="weekNames.map((item) => item[lang])" 
					name="week" 
				>
					<vc-customer
						:render="renderWeek"
						:week-names="weekNames"
						:lang="lang"
					/>
				</slot>
				<div>
					<div v-for="i in 6" :key="i" class="vc-calendar-row">
						<span
							v-for="(item, index) in dateArr.data.slice((i - 1) * 7, (i - 1) * 7 + 7)"
							:key="index"
							:class="`vc-calendar-row__item is-${item.type}`"
						>
							<slot
								:date="item" 
								:formatter-date="formatterDate"
								:holiday="date2holiday(item.date)"
							>
								<vc-customer
									:date="item"
									:formatter-date="formatterDate"
									:holiday="date2holiday(item.date)"
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
import { Utils } from "@wya/utils";
import Customer from "../customer";
import date2holiday from "./date2holiday";
import { monthNames, weekNames } from './constants';
import { defaultRenderDate, defaultRenderMonth, defaultRenderWeek } from './components';

export default {
	name: "vc-calendar",
	components: {
		'vc-customer': Customer,
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
		let now = new Date();
		return {
			currentDate: now,
			currentMonth: now.getMonth(), // 要展示的月份 0-11
			currentYear: now.getFullYear(), // 要展示的年份,
			slideMode: "left",
			toggle: true,
		};
	},
	computed: {
		dateArr() {
			return this.getCurrentInfo(this.currentYear, this.currentMonth + 1);
		},
		formatterDate() {
			return `${this.currentDate.getFullYear()}-${Utils.preZero(this.currentDate.getMonth() + 1)}-${Utils.preZero(
				this.currentDate.getDate()
			)}`;
		}
	},
	watch: {
		
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
			let firstWeek = this.getWeek(`${year}-${Utils.preZero(month)}-1`); // 本月第一天是星期几
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
				item.date = `${year}-${Utils.preZero(month)}-${Utils.preZero(i + 1)}`;
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
			this.slideMode = "left";
			this.toggle = !this.toggle;
			if (this.currentMonth === 11) {
				this.currentMonth = 0;
				this.currentYear++;
			} else {
				this.currentMonth++;
			}
		},
		prev() {
			this.slideMode = "right";
			this.toggle = !this.toggle;
			if (this.currentMonth === 0) {
				this.currentMonth = 11;
				this.currentYear--;
			} else {
				this.currentMonth--;
			}
		}
	}
};
</script>
<style lang="scss">
@import '../style/vars.scss';
$block: vc-calendar;

@include block($block) {
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

.vc-calendar__right-leave-active,
.vc-calendar__left-leave-active {
	position: absolute !important;
}
.vc-calendar__right-leave-to,
.vc-calendar__left-enter {
	transform: translateX(100%);
}
.vc-calendar__right-enter,
.vc-calendar__left-leave-to {
	transform: translateX(-100%);
}
</style>