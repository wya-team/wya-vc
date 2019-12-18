<template>
	<div :class="{'is-with-seconds': showSeconds}" class="vc-date-panel">
		<vc-date-header 
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
		<vc-year-table 
			v-if="currentView === 'year'"
			:value="dates"
			:panel-date="panelDate"
			:disabled-date="disabledDate"
			@pick="handleYearPick"
		/>
		<vc-month-table 
			v-if="currentView === 'month'"
			:value="dates"
			:panel-date="panelDate"
			:disabled-date="disabledDate"
			@pick="handleMonthPick"
		/>
		<!-- time -->
		<vc-time-select 
			v-show="currentView === 'time'"
			:hours="timeSlots[0]"
			:minutes="timeSlots[1]"
			:seconds="timeSlots[2]"
			:show-seconds="showSeconds"
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
</template>

<script>
import { getDateOfTime } from '../../utils/date-utils';
import DateMixin from './date-mixin';
import YearTable from '../basic/year-table';
import MonthTable from '../basic/month-table';
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
		format: String,
		// 在type === 'date' 下才有效
		multiple: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			dates: this.value,
			panelDate: this.value[0] || this.startDate || new Date(),
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
		getCurrentView() {
			if (this.type === 'year') {
				return 'year';
			} else if (this.type === 'month') {
				return 'month';
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
					index > -1 ? this.dates.splice(index, 1) : (this.dates = [...this.dates, value]);
					this.$emit('pick', this.dates);
				}
			}
		},
		handleTimePick(value) {
			let newDate = getDateOfTime(this.dates[0], value);
			this.panelDate = newDate; // TODO 是不是可以去掉
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
@import '../../style/index.scss';

$block: vc-date-panel;

@include block($block) {
	@include when(with-seconds) {
		.vc-time-select__list {
			width: 72px;
			ul li {
				padding: 0 0 0 28px;
			} 
		}
	}
	.vc-time-select__list {
		width: 108px;
		ul li {
			padding: 0 0 0 46px;
		} 
	}
}
</style>
