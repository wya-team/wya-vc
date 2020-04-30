<template>
	<div class="vc-monthrange-panel">
		<div v-if="shortcuts && shortcuts.length > 0" style="width: 100px">
			<vc-shortcuts-select
				:config="shortcuts"
				@pick="handleShortcutPick"
			/>
		</div>
		<div class="vc-monthrange-panel__body">
			<div class="vc-monthrange-panel__table">
				<div class="vc-monthrange-panel__content is-left">
					<vc-date-header
						:current-view="currentView"
						:panel-date="leftPanelDate"
						:show-next="splitPanels"
						@change="handlePanelChange(...arguments, 'left')"
					/>
					<!-- 月份 -->
					<vc-month-table
						:value="dates"
						:panel-date="leftPanelDate"
						:disabled-date="disabledDate"
						:range-state="rangeState"
						@pick="handlePick(...arguments, 'left')"
						@range-change="handleRangeChange"
					/>
				</div>
				<div class="vc-monthrange-panel__content is-right">
					<vc-date-header
						:current-view="currentView"
						:panel-date="rightPanelDate"
						:show-prev="splitPanels"
						@change="handlePanelChange(...arguments, 'right')"
					/>
					<!-- 月份 -->
					<vc-month-table
						:value="dates"
						:panel-date="rightPanelDate"
						:disabled-date="disabledDate"
						:range-state="rangeState"
						@pick="handlePick(...arguments, 'right')"
						@range-change="handleRangeChange"
					/>
				</div>
			</div>
			<vc-date-confrim
				v-if="confirm"
				:show-time="false"
				:current-view="currentView"
				@clear="handleClear"
				@ok="handleOK"
			/>
		</div>
	</div>
</template>

<script>
import { clearTime, nextMonth, prevMonth, nextYear, prevYear, getDateOfTime } from '../../utils/date-utils';
import DateMixin from '../mixins/date';
import DateHeader from '../basic/date-header';
import MonthTable from '../basic/month-table';
import Confirm from '../basic/confirm';
import ShortcutsSelect from '../basic/shortcuts-select';

export default {
	name: 'vc-month-range-panel',
	components: {
		'vc-date-header': DateHeader,
		'vc-month-table': MonthTable,
		'vc-date-confrim': Confirm,
		'vc-shortcuts-select': ShortcutsSelect
	},
	mixins: [DateMixin],
	props: {
		confirm: {
			type: Boolean,
			default: false
		},
		splitPanels: {
			type: Boolean,
			default: true
		},
	},
	data() {
		const leftPanelDate = this.value[0] || this.startDate || new Date();
		const rightPanelDate = this.splitPanels && !this.isEqualYear() ? this.value[1] || nextYear(leftPanelDate) : nextYear(leftPanelDate);
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
				marker: null, // 第一次点下的季度
			},
			currentView: 'monthrange',
		};
	},
	methods: {
		isEqualYear() {
			if (!this.value[0] || !this.value[1]) { return false; }
			let startYear = this.value[0].getFullYear();
			let endYear = this.value[1].getFullYear();
			return startYear === endYear;
		},
		handlePanelChange(panelDate, type, position) {
			this[`${position}PanelDate`] = panelDate;
			if (this.splitPanels) { // 左右面板不联动
				let panelYear = panelDate.getFullYear();
				let leftPanelYear = this.leftPanelDate.getFullYear();
				let rightPanelYear = this.rightPanelDate.getFullYear();
				switch (type) {
					case 'prev-year':
					case 'next-year':
						if (position === 'left' && panelYear >= rightPanelYear) {
							this.rightPanelDate = nextYear(this.rightPanelDate);
						} else if (position === 'right' && panelYear <= leftPanelYear) {
							this.leftPanelDate = prevYear(this.leftPanelDate);
						}
						break;
					default:
						break;
				}
			} else {
				switch (type) {
					case 'prev-year':
						this.rightPanelDate = prevYear(this.rightPanelDate);
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
		handlePick(value, type) {
			console.log(value);

			let { selecting, from, to, marker } = this.rangeState;
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
					selecting: false,
					marker
				};
			}

			if (this.rangeState.from && this.rangeState.to) {
				// from && to 都已选择，对外发送事件
				let leftDate = this.rangeState.from;
				let rightDate = this.rangeState.to;
				this.dates = [leftDate, rightDate];
				this.$emit('pick', this.dates);
			}
		},
		handleRangeChange(value) {
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
		handleClear() {
			this.$emit('clear');
		},
		handleOK() {
			this.$emit('ok', this.dates);
		},
		handleShortcutPick(value) {
			if (this.disabledDate(value[0]) || this.disabledDate(value[1])) {
				return;
			}
			this.leftPanelDate = value[0];
			this.rightPanelDate = value[1];
			this.handlePick(value[0], { type: this.disabledDate(value[0]) ? 'disabled' : 'normal' }, 'left');
			this.handlePick(value[1], { type: this.disabledDate(value[1]) ? 'disabled' : 'normal' }, 'right');
			this.dates = value;
		}
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

$block: vc-monthrange-panel;

@include block($block) {
	display: flex;
	@include element(body) {
	}
	@include element(content) {
	}
	@include element(table) {
		display: flex;
	}
}
</style>
