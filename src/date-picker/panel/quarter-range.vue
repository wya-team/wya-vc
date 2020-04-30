<template>
	<div class="vc-quarterrange-panel">
		<div v-if="shortcuts && shortcuts.length > 0" style="width: 100px">
			<vc-shortcuts-select
				:panel-date="leftPanelDate"
				:config="shortcuts"
				@pick="handleShortcutPick"
				@click="handleShortcutClick"
			/>
		</div>
		<div class="vc-quarterrange-panel__body">
			<div class="vc-quarterrange-panel__table">
				<div class="vc-quarterrange-panel__content is-left">
					<vc-date-header
						:current-view="currentView"
						:panel-date="leftPanelDate"
						:show-next="splitPanels"
						@change="handlePanelChange(...arguments, 'left')"
					/>
					<!-- 季度 -->
					<vc-quarter-table
						:value="dates"
						:panel-date="leftPanelDate"
						:disabled-date="disabledDate"
						:range-state="rangeState"
						@pick="handlePick(...arguments, 'left')"
						@range-change="handleRangeChange"
					/>
				</div>
				<div class="vc-quarterrange-panel__content is-right">
					<vc-date-header
						:current-view="currentView"
						:panel-date="rightPanelDate"
						:show-prev="splitPanels"
						@change="handlePanelChange(...arguments, 'right')"
					/>
					<!-- 季度 -->
					<vc-quarter-table
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
import { clearTime, nextMonth, prevMonth, nextYear, prevYear, getDateOfTime } from '../helper/date-utils';
import DateMixin from '../mixins/date';
import DateHeader from '../basic/date-header';
import QuarterTable from '../basic/quarter-table';
import Confirm from '../basic/confirm';
import ShortcutsSelect from '../basic/shortcuts-select';

export default {
	name: 'vc-quarter-range-panel',
	components: {
		'vc-date-header': DateHeader,
		'vc-quarter-table': QuarterTable,
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
			currentView: 'quarterrange',
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
			let { selecting, from, to, marker } = this.rangeState;
			if (!selecting) {
				this.dates = [];
				this.rangeState = {
					from: value[0],
					to: '',
					selecting: true,
					marker: value
				};
			} else {
				this.rangeState = {
					from: value[0] < marker[0] ? value[0] : from,
					to: value[1] < marker[1] ? marker[1] : value[1],
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
			if (this.rangeState.selecting && value[0].getTime() != from.getTime()) {
				this.rangeState = {
					from: value[0] < marker[0] ? value[0] : marker[0],
					to: value[1] < marker[1] ? marker[1] : value[1],
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
			this.leftPanelDate = value[0];
			this.rightPanelDate = value[1];
			this.dates = value;
			this.rangeState = {
				from: value[0],
				marker: value,
				selecting: true,
				to: value[1]
			};
			this.handlePick(value, 'left');
			this.handleRangeChange(value);
		}
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

$block: vc-quarterrange-panel;

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
