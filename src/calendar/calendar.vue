<template>
	<transition :name="slideDirect">
		<div :key="showMonth" class="vcp-calendar">
			<!-- transition组件中，当某个元素被卸载而动画还没结束，此时这个元素所绑定的数据变化不会更新到这个元素上 -->
			<div>
				<month-header :month="showMonth" :year="showYear" :month-render="monthRender" :lan="lan" />
				<week-header :week-render="weekRender" :lan="lan" />
				<div>
					<div v-for="i in 6" :key="i" class="g-flex g-pd-tb-15">
						<span 
							v-for="(item,index) in dateArr.data.slice((i-1)*7,(i-1)*7+7)" 
							:class="'g-flex g-flex-cc g-flex-ac _date-item '+'_date-'+item.type" 
							:key="index">
							<date-item :date="item" :date-render="dateRender" />
						</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import DateItem from "./date-item";
import MonthHeader from "./month-header";
import WeeKHeader from './week-header';


const curDate = new Date();
export default {
	name: "vc-calendar",
	components: {
		"date-item": DateItem,
		"month-header": MonthHeader,
		"week-header": WeeKHeader
	},
	props: {
		dateRender: Function,
		monthRender: Function,
		weekRender: Function,
		lan: String
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
			console.log(this.getCurrentInfo(this.showYear, this.showMonth + 1));
			return this.getCurrentInfo(this.showYear, this.showMonth + 1);
		},

		
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
			let firstWeek = this.getWeek(`${year}-${this.formatNum(month)}-1`); // 本月第一天是星期几
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
				item.date = `${year}-${this.formatNum(month)}-${this.formatNum(i + 1)}`;
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

		// 小于10的数字前面加0
		formatNum(num) {
			if (num < 10) {
				return "0" + num;
			}
			return num;
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
.vcp-calendar {
  display: inline-block;
  width: 100%;
  transition: all 1s;
  position: relative;

  ._date-item {
    width: 14.28%;
    font-size: 16px;
    &._date-prev,
    &._date-next {
      color: lightgray;
    }
  }
  ._title {
    display: flex;
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
}
.right-leave-active,
.left-leave-active {
  position: absolute;
}
.right-leave-to,
.left-enter {
  transform: translateX(100%);
}
.right-enter,
.left-leave-to {
  transform: translateX(-100%);
}

// mock sass库 加入sass库后可以删除
.g-flex {
  display: flex;
}
.g-flex-cc {
  justify-content: center;
}
.g-lh-60 {
  line-height: 60px;
}
.g-fs-24 {
  font-size: 24px;
}
.g-bg-gray-mid {
  background-color: #f5f6f7;
}
.g-c-black-dark {
  color: #2e3136;
}
.g-flex-ac {
  align-items: center;
}
.g-pd-tb-15 {
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>