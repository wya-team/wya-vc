<template>
	<div class="vc-daterange-panel">
		<div v-if="false" style="width: 100px">
			<!-- TODO 快捷操作 -->
		</div>
		<div :class="{'is-with-seconds': showSeconds}" class="vc-daterange-panel__body">
			<div class="vc-daterange-panel__table">
				<div class="vc-daterange-panel__content is-left">
					<vc-date-header 
						:current-view="leftCurrentView"
						:panel-date="leftPanelDate"
						:show-next="splitPanels"
						title="开始时间"
						@change="handlePanelChange(...arguments, 'left')"
						@change-current-view="handleChangeLeftCurrentView"
					/>
					<vc-date-table 
						v-if="leftCurrentView === 'daterange'"
						:value="dates"
						:panel-date="leftPanelDate"
						:disabled-date="disabledDate"
						:focused-date="focusedDate"
						:range-state="rangeState"
						@pick="handlePick(...arguments, 'left')"
						@range-change="handleRangeChange"
					/>
					<!-- 年 -->
					<vc-year-table 
						v-if="leftCurrentView === 'year'"
						:value="[dates[0]]"
						:panel-date="leftPanelDate"
						:disabled-date="disabledDate"
						@pick="handleLeftYearPick"
					/>
					<!-- 月 -->
					<vc-month-table 
						v-if="leftCurrentView === 'month'"
						:value="[dates[0]]"
						:panel-date="leftPanelDate"
						:disabled-date="disabledDate"
						@pick="handleLeftMonthPick"
					/>
					<!-- time -->
					<vc-time-select 
						v-show="leftCurrentView === 'timerange'"
						:hours="timeSlots.left.hours"
						:minutes="timeSlots.left.minutes"
						:seconds="timeSlots.left.seconds"
						:show-seconds="showSeconds"
						v-bind="timePickerOptions"
						@pick="handleTimePick(...arguments, 'left')"
					/>
				</div>
				<div class="vc-daterange-panel__content is-right">
					<vc-date-header
						:current-view="rightCurrentView"
						:panel-date="rightPanelDate"
						:show-prev="splitPanels"
						title="结束时间"
						@change="handlePanelChange(...arguments, 'right')"
						@change-current-view="handleChangeRightCurrentView"
					/>
					<vc-date-table 
						v-if="rightCurrentView === 'daterange'"
						:value="dates"
						:panel-date="rightPanelDate"
						:disabled-date="disabledDate"
						:focused-date="focusedDate"
						:range-state="rangeState"
						@pick="handlePick(...arguments, 'right')"
						@range-change="handleRangeChange"
					/>
					<!-- 年 -->
					<vc-year-table 
						v-if="rightCurrentView === 'year'"
						:value="[dates[1]]"
						:panel-date="rightPanelDate"
						:disabled-date="disabledDate"
						@pick="handleRightYearPick"
					/>
					<!-- 月 -->
					<vc-month-table 
						v-if="rightCurrentView === 'month'"
						:value="[dates[1]]"
						:panel-date="rightPanelDate"
						:disabled-date="disabledDate"
						@pick="handleRightMonthPick"
					/>
					<!-- time -->
					<vc-time-select 
						v-show="rightCurrentView === 'timerange'"
						:hours="timeSlots.right.hours"
						:minutes="timeSlots.right.minutes"
						:seconds="timeSlots.right.seconds"
						:show-seconds="showSeconds"
						v-bind="timePickerOptions"
						@pick="handleTimePick(...arguments, 'right')"
					/>
				</div>
			</div>
			<vc-date-confrim 
				v-if="confirm"
				:show-time="canSelectTime"
				:current-view="[leftCurrentView, rightCurrentView]"
				@clear="handleClear"
				@ok="handleOK"
				@toggle-time="handleToggleTime"
			/>
		</div>
	</div>
</template>

<script>
import { clearTime, nextMonth, prevMonth, nextYear, prevYear, getDateOfTime, changeYearMonthAndClampDate } from '../../utils/date-utils';
import DateMixin from '../mixins/date';
import YearTable from '../basic/year-table';
import MonthTable from '../basic/month-table';
import DateTable from '../basic/date-table';
import DateHeader from '../basic/date-header';
import Confirm from '../basic/confirm';
import TimeSelect from '../basic/time-select';

export default {
	name: 'vc-date-range-panel',
	components: {
		'vc-date-header': DateHeader,
		'vc-year-table': YearTable,
		'vc-month-table': MonthTable,
		'vc-date-table': DateTable,
		'vc-date-confrim': Confirm,
		'vc-time-select': TimeSelect
	},
	mixins: [DateMixin],
	props: {
		confirm: {
			type: Boolean,
			default: false
		},
		splitPanels: {
			type: Boolean,
			default: false
		},
	},
	data() {
		const leftPanelDate = this.value[0] || this.startDate || new Date();
		const rightPanelDate = this.splitPanels && !this.isEqualYearAndMonth() ? this.value[1] || nextMonth(leftPanelDate) : nextMonth(leftPanelDate);
		const minDate = this.value[0] || '';
		const maxDate = this.value[1] || '';
		return {
			dates: this.value,
			leftPanelDate,
			rightPanelDate,
			rangeState: {
				from: minDate,
				to: maxDate,
				selecting: false,
				marker: null, // 第一次点下的日期
			},
			currentView: 'daterange',
			rightCurrentView: 'daterange',
			leftCurrentView: 'daterange',
		};
	},
	computed: {
		canSelectTime() {
			let { from, to, selecting } = this.rangeState;
			return this.showTime && !!from && !!to && !selecting;
		},
		showSeconds() {
			return !(this.format || '').match(/mm$/);
		},
		timeSlots() {
			let leftDate = this.dates[0];
			let rightDate = this.dates[1];
			if (!leftDate || !rightDate || this.currentView !== 'timerange') {
				return {
					left: {},
					right: {}
				};
			}
			return {
				left: {
					hours: leftDate.getHours(), 
					minutes: leftDate.getMinutes(), 
					seconds: leftDate.getSeconds()
				},
				right: {
					hours: rightDate.getHours(), 
					minutes: rightDate.getMinutes(), 
					seconds: rightDate.getSeconds()
				},
			};
		},
		leftMonth() {
			return this.leftPanelDate.getMonth();
		},
		leftYear() {
			return this.leftPanelDate.getFullYear();
		},
		rightMonth() {
			return this.rightPanelDate.getMonth();
		},
		rightYear() {
			return this.rightPanelDate.getFullYear();
		},
	},
	methods: {
		handleChangeLeftCurrentView(currentView) {
			if (this.leftCurrentView === currentView) {
				this.leftCurrentView = 'daterange';
			} else {
				this.leftCurrentView = currentView;
			}
		},
		handleLeftYearPick(value) {
			const leftDate = changeYearMonthAndClampDate(this.dates[0] || this.leftPanelDate, value.getFullYear(), this.leftMonth);
			this.leftPanelDate = leftDate;
			this.leftCurrentView = 'month';
			if (!this.splitPanels) {
				const rightDate = changeYearMonthAndClampDate(this.dates[1] || this.rightPanelDate, value.getFullYear(), this.rightMonth);
				this.rightPanelDate = rightDate;
			}
		},
		handleLeftMonthPick(value) {
			const leftDate = changeYearMonthAndClampDate(this.dates[0] || this.leftPanelDate, this.leftYear, value.getMonth());
			this.leftPanelDate = leftDate;
			this.leftCurrentView = 'daterange';
			if (!this.splitPanels) {
				const rightDate = changeYearMonthAndClampDate(this.dates[1] || this.rightPanelDate, this.leftYear, this.leftMonth + 1);
				this.rightPanelDate = rightDate;
			}
		},
		handleChangeRightCurrentView(currentView) {
			if (this.rightCurrentView === currentView) {
				this.rightCurrentView = 'daterange';
			} else {
				this.rightCurrentView = currentView;
			}
		},
		handleRightYearPick(value) {
			const rightDate = changeYearMonthAndClampDate(this.dates[1] || this.rightPanelDate, value.getFullYear(), this.rightMonth);
			this.rightPanelDate = rightDate;
			this.rightCurrentView = 'month';
			if (!this.splitPanels) {
				const leftDate = changeYearMonthAndClampDate(this.dates[0] || this.leftPanelDate, value.getFullYear(), this.leftMonth);
				this.leftPanelDate = leftDate;
			}
		},
		handleRightMonthPick(value) {
			const newDate = changeYearMonthAndClampDate(this.dates[1] || this.rightPanelDate, this.rightYear, value.getMonth());
			this.rightPanelDate = newDate;
			this.rightCurrentView = 'daterange';
			if (!this.splitPanels) {
				const leftDate = changeYearMonthAndClampDate(this.dates[1] || this.leftPanelDate, this.rightYear, this.rightMonth - 1);
				this.leftPanelDate = leftDate;
			}
		},
		setRightHeaderDate() {
			if (!this.splitPanels) {
				this.rightPanelDate = newDate;
			}
		},
		isEqualYearAndMonth() {
			if (!this.value[0] || !this.value[1]) { return false; }
			let startYear = this.value[0].getFullYear();
			let startMonth = this.value[0].getMonth();
			let endYear = this.value[1].getFullYear();
			let endMonth = this.value[1].getMonth();
			return startYear === endYear && startMonth === endMonth;
		},
		// 判断当前点击的cell是否在当前面板内
		getDateIsInRange(value, type) {
			let month = value.getMonth();
			let year = value.getFullYear();
			let leftMonth = this.leftPanelDate.getMonth();
			let leftYear = this.leftPanelDate.getFullYear();
			let rightMonth = this.rightPanelDate.getMonth();
			let rightYear = this.rightPanelDate.getFullYear();
			if (type === 'right' && (year > rightYear || month > rightMonth)) {
				return false;
			} else if (type === 'left' && (year < leftYear || month < leftMonth)) {
				return false;	
			}
			return true;
		},
		isOverRightPanel(panelDate) {
			let panelYear = panelDate.getFullYear();
			let panelMonth = panelDate.getMonth();
			let rightPanelYear = this.rightPanelDate.getFullYear();
			let rightPanelMonth = this.rightPanelDate.getMonth();
			return panelYear > rightPanelYear || (panelYear === rightPanelYear && panelMonth >= rightPanelMonth);
		},
		isOverLeftPanel(panelDate) {
			let panelYear = panelDate.getFullYear();
			let panelMonth = panelDate.getMonth();
			let leftPanelYear = this.leftPanelDate.getFullYear();
			let leftPanelMonth = this.leftPanelDate.getMonth();
			return panelYear < leftPanelYear || (panelYear === leftPanelYear && panelMonth <= leftPanelMonth);
		},
		handlePanelChange(panelDate, type, position) {
			this[`${position}PanelDate`] = panelDate;
			if (this.splitPanels) { // 左右面板不联动
				let isOverRightPanel = this.isOverRightPanel(panelDate);
				let isOverLeftPanel = this.isOverLeftPanel(panelDate);

				switch (type) {
					case 'prev-month':
					case 'next-month':
						if (position === 'left' && isOverRightPanel) {
							this.rightPanelDate = nextMonth(this.rightPanelDate);
						} else if (position === 'right' && isOverLeftPanel) {
							this.leftPanelDate = prevMonth(this.leftPanelDate);
						}
						break;
					case 'prev-year':
					case 'next-year':
						if (position === 'left' && isOverRightPanel) {
							this.rightPanelDate = nextYear(this.rightPanelDate);
						} else if (position === 'right' && isOverLeftPanel) {
							this.leftPanelDate = prevYear(this.leftPanelDate);
						}
						break;
					default:
						break;
				}
			} else {
				switch (type) {
					case 'prev-month':
						this.rightPanelDate = prevMonth(this.rightPanelDate);
						break;
					case 'prev-year':
						this.rightPanelDate = prevYear(this.rightPanelDate);
						break;
					case 'next-month':
						this.leftPanelDate = nextMonth(this.leftPanelDate);
						break;
					case 'next-year':
						this.leftPanelDate = nextYear(this.leftPanelDate);
						break;
					default:
						break;
				}
			}
		},
		/**
		 * 重新选择日期范围后需要重新选择时间范围
		 */
		handlePick(value, cell, type) {
			let { selecting, from, to, marker } = this.rangeState;
			let isInRange = this.getDateIsInRange(value, type);
			if (!selecting) {
				this.dates = [];
				this.rangeState = {
					from: value,
					to: '',
					selecting: true,
					marker: value
				};
			} else {
				this.rangeState = {
					from: value < marker ? value : from,
					to: value < marker ? marker : value,
					selecting: cell.type !== 'normal',
					marker: cell.type !== 'normal' ? marker : null
				};
				
			}
			if (!isInRange) {
				let changeType = type === 'left' ? 'prev-month' : 'next-month';
				let panelDate = type === 'left' ? prevMonth(this.leftPanelDate) : nextMonth(this.rightPanelDate);
				this.handlePanelChange(panelDate, changeType, type);
			} else if (this.rangeState.from && this.rangeState.to) {
				// from && to 都已选择，对外发送事件
				let leftDate = this.rangeState.from;
				let rightDate = this.rangeState.to;
				this.dates = [leftDate, rightDate];
				this.$emit('pick', this.dates);
			}
		},
		handleRangeChange(value, cell) {
			let { selecting, from, to, marker } = this.rangeState;
			if (this.rangeState.selecting && value.getTime() != from.getTime()) {
				this.rangeState = {
					from: value < marker ? value : marker,
					to: value < marker ? marker : value,
					selecting: true,
					marker
				};
			}
		},
		handleTimePick(value, type) {
			let date = type === 'left' ? this.dates[0] : this.dates[1];
			let leftNewDate = this.dates[0]; 
			let rightNewDate = this.dates[1];
			type === 'left' && (leftNewDate = getDateOfTime(date, value));
			type === 'right' && (rightNewDate = getDateOfTime(date, value));
			if (leftNewDate && rightNewDate) {
				this.dates = [leftNewDate, rightNewDate];
				this.$emit('pick', this.dates);
			}
		},
		handleToggleTime(view) {
			this.leftCurrentView = view[0];
			this.rightCurrentView = view[1];
		},
		handleClear() {
			this.$emit('clear');
		},
		handleOK() {
			this.$emit('ok', this.dates);
		}
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

$block: vc-daterange-panel;

@include block($block) {
	display: flex;
	@include element(body) {
		@include when(with-seconds) {
			.vc-time-select__list {
				width: 72px;
				ul li {
					padding: 0 0 0 28px;
				} 
			}
		}
	}
	@include element(content) {
		// position: relative;
		.vc-time-select {
			position: relative;
			&:after {
				content: "";
				display: block;
				width: 2px;
				position: absolute;
				top: 0;
				bottom: 0;
				right: -2px;
				background: #e8eaec;
				z-index: 1;
			}
		}
		@include when(left) {
			.vc-time-select:after {
				left: auto;
				right: -2px;
			}
		}
		@include when(right) {
			.vc-time-select:after {
				right: auto;
				left: -2px
			}
		}
	}
	@include element(table) {
		display: flex;
	}
	.vc-time-select__list {
		width: 108px;
		max-height: 224px;
		ul li {
			padding: 0 0 0 46px;
		} 
	}
}
</style>
