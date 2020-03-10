<template>
	<div class="vc-date-panel">
		<div v-if="false" style="width: 100px">
			<!-- TODO 快捷操作 -->
		</div>
		<div :class="{'is-with-seconds': showSeconds}" class="vc-date-panel__body">
			<vc-date-header 
				v-if="currentView !== 'time'"
				v-model="panelDate"
				:current-view="currentView"
			/>
			<!-- 日历 -->
			<vc-date-table 
				v-if="currentView === 'date'"
				:value="dates"
				:panel-date="panelDate"
				:disabled-date="disabledDate"
				:focused-date="focusedDate"
				@pick="handlePick"
			/>
			<!-- 年 -->
			<vc-year-table 
				v-if="currentView === 'year'"
				:value="dates"
				:panel-date="panelDate"
				:disabled-date="disabledDate"
				@pick="handleYearPick"
			/>
			<!-- 月 -->
			<vc-month-table 
				v-if="currentView === 'month'"
				:value="dates"
				:panel-date="panelDate"
				:disabled-date="disabledDate"
				@pick="handleMonthPick"
			/>
			<!-- 季度 -->
			<vc-quarter-table 
				v-if="currentView === 'quarter'"
				:value="dates"
				:panel-date="panelDate"
				:disabled-date="disabledDate"
				@pick="handleQuarterPick"
			/>
			<!-- time -->
			<vc-time-select 
				v-show="currentView === 'time'"
				:value="dates"
				:hours="timeSlots[0]"
				:minutes="timeSlots[1]"
				:seconds="timeSlots[2]"
				:show-seconds="showSeconds"
				v-bind="timePickerOptions"
				:disabled-time="disabledTime"
				:focused-date="focusedDate"
				@pick="handleTimePick"
			/>
			<vc-date-confrim 
				v-if="confirm"
				:show-time="showTime && !multiple"
				:current-view="currentView"
				@clear="handleClear"
				@ok="handleOK"
				@toggle-time="handleToggleTime"
			/>
		</div>
	</div>
</template>

<script>
import { getDateOfTime } from '../../utils/date-utils';
import DateMixin from '../mixins/date';
import YearTable from '../basic/year-table';
import MonthTable from '../basic/month-table';
import QuarterTable from '../basic/quarter-table';
import DateTable from '../basic/date-table';
import DateHeader from '../basic/date-header';
import Confirm from '../basic/confirm';
import TimeSelect from '../basic/time-select';

export default {
	name: 'vc-date-panel',
	components: {
		'vc-date-header': DateHeader,
		'vc-year-table': YearTable,
		'vc-month-table': MonthTable,
		'vc-quarter-table': QuarterTable,
		'vc-date-table': DateTable,
		'vc-date-confrim': Confirm,
		'vc-time-select': TimeSelect
	},
	mixins: [DateMixin],
	props: {
		type: String,
		confirm: {
			type: Boolean,
			default: false
		},
		// 在type === 'date' 下才有效
		multiple: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			dates: this.value,
			panelDate: this.getPanelDate(),
			currentView: this.getCurrentView(),
		};
	},
	computed: {
		showSeconds() {
			return !(this.format || '').match(/mm$/);
		},
		timeSlots() {
			/**
			 * this.currentView !== 'time' 由于time-select是用v-show控制显示隐藏，
			 * 所以在面板为time时，才去更改timeSlots, time-select才会触发watch
			 */
			let date = this.dates[0];
			if (!date || this.currentView !== 'time') return [];
			return [date.getHours(), date.getMinutes(), date.getSeconds()];
		}
	},
	watch: {
		
	},
	created() {
		
	},
	methods: {
		getPanelDate() {
			let value = this.value[0];
			if (this.type === 'quarter' && value) {
				value = value[0];
			}
			return value || this.startDate || new Date();
		},
		getCurrentView() {
			if (this.type === 'year') {
				return 'year';
			} else if (this.type === 'month') {
				return 'month';
			} else if (this.type === 'quarter') {
				return 'quarter';
			}
			return 'date';
		},
		handlePick(value, cell) {
			if (!this.multiple) {
				let date = this.dates[0];
				let time = {
					hours: (date || value).getHours(),
					minutes: (date || value).getMinutes(),
					seconds: (date || value).getSeconds(),
				};
				let newDate = getDateOfTime(value, time);
				this.panelDate = newDate;
				this.dates = [newDate];
				this.$emit('pick', this.dates);
			} else {
				let index = this.dates.findIndex((date) => date.getTime() === value.getTime());
				this.panelDate = value;
				if (cell.type === 'normal') {
					let prevDate = []; // 不要的date
					index > -1 ? (prevDate = this.dates.splice(index, 1)) : (this.dates = [...this.dates, value]);
					this.$emit('pick', this.dates, prevDate[0]);
				}
			}
		},
		handleTimePick(value) {
			let newDate = getDateOfTime(this.dates[0] || this.panelDate, value);
			this.dates = [newDate];
			this.$emit('pick', this.dates);
		},
		handleYearPick(value) {
			let newYear = [value];
			this.dates = newYear;
			this.$emit('pick', newYear);
		},
		handleMonthPick(value) {
			let newMonth = [value];
			this.dates = newMonth;
			this.$emit('pick', newMonth);
		},
		// 季度选择value => 月份的范围
		handleQuarterPick(value) {
			let newQuarter = value;
			this.dates = newQuarter;
			this.$emit('pick', newQuarter);
		},
		handleToggleTime(view) {
			this.currentView = view;
		},
		handleClear() {
			this.$emit('clear');
		},
		handleOK() {
			this.$emit('ok', this.dates);
		},
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

$block: vc-date-panel;

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
	.vc-time-select__list {
		width: 108px;
		max-height: 224px;
		ul li {
			padding: 0 0 0 46px;
		} 
	}
}
</style>
