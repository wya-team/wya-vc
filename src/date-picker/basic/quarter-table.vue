<template>
	<div class="vc-quarter-table">
		<table 
			class="vc-quarter-table__wrapper" 
			cellspacing="0"
			cellpadding="0"
			@click="handleClick"
			@mousemove="handleMouseMove"
		>
			<tbody>
				<tr
					v-for="(row, key) in rows"
					:key="key"
					class="vc-quarter-table__row"
				>
					<td
						v-for="(cell, key) in row"
						:key="key"
						:class="getCellClasses(cell)"
						class="vc-quarter-table__cell"
					>
						<div>
							<span>
								第{{ QUARTER_CN[cell.quarter + 1] }}季度
							</span>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { getDayCountOfMonth, getDateTimestamp } from '../helper/date-utils';
import { value2Array, isEmpty } from '../utils';
import { QUARTER_CN } from '../constants';

export default {
	name: 'vc-quarter-table',
	components: {

	},
	props: {
		value: Array,
		panelDate: Date,
		disabledDate: Function,
		rangeState: {
			type: Object,
			default: () => ({
				from: null,
				to: null,
				selecting: false,
				marker: null
			})
		},
	},
	data() {
		return {
			QUARTER_CN
		};
	},
	computed: {
		rows() {
			let rows = [[], []];
			const year = this.panelDate.getFullYear();
			const selectedQuarter = value2Array(this.value);
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 2; j++) {
					let cell = {};
					cell.quarter = i * 2 + j; // 值为：0，1，2，3
					cell.dates = this.getMonthRange(cell.quarter);
					const rangeFromTime = getDateTimestamp(this.rangeState.from);
					const rangeToTime = getDateTimestamp(this.rangeState.to);
					const time = [getDateTimestamp(cell.dates[0]), getDateTimestamp(cell.dates[1])];

					cell.inRange = time[0] > rangeFromTime && time[1] < rangeToTime;
					cell.start = this.rangeState.from && time[0] === rangeFromTime;
					cell.end = this.rangeState.to && time[1] === rangeToTime;
					cell.disabled = typeof this.disabledDate === 'function' && this.disabledDate(cell.quarter);
					cell.customClass = typeof this.cellClassName === 'function' && this.cellClassName(cell.quarter);
					cell.selected = !isEmpty(selectedQuarter) && selectedQuarter.some(quarter => {
						return (year === quarter.getFullYear()) && this.getQuarterRangeByMonth(quarter) === cell.quarter;
					});
					rows[i][j] = cell;
				}
			}
			return rows;
		}
	},
	watch: {
		
	},
	created() {
		
	},
	methods: {
		/**
		 * 获取季度对应的月份范围
		 */
		getMonthRange(quarter) {
			let year = this.panelDate.getFullYear();
			let [startMonth, endMonth] = [quarter * 3, quarter * 3 + 2];
			let endDay = getDayCountOfMonth(year, endMonth);
			return [
				new Date(year, startMonth),
				new Date(year, endMonth, endDay)
			];
		},
		getQuarterRangeByMonth(value) {
			let month = value.getMonth();
			switch (month) {
				case 0:
				case 2:
					return 0;
				case 3:
				case 5:
					return 1;
				case 6:
				case 8:
					return 2;
				case 9:
				case 11:
					return 3;
				default:
					return false;
			}
		},
		getCellClasses(cell) {
			let classes = [];
			if (cell.selected || cell.start || cell.end) { classes.push('is-selected'); }
			if (cell.disabled) { classes.push('is-disabled'); }
			if (cell.empty) { classes.push('is-empty'); }
			if (cell.inRange) { classes.push('is-range'); }

			// TODO 其他情况的样式
			return classes.join(' ');
		},
		getCell(event) {
			let target = event.target;
			if (target.tagName === 'SPAN') {
				target = target.parentNode.parentNode;
			}
			if (target.tagName === 'DIV') {
				target = target.parentNode;
			}
			if (target.tagName !== 'TD') return {};
			const row = target.parentNode.rowIndex;
			const column = target.cellIndex;
			return {
				cell: this.rows[row][column],
				row,
				column
			};
		},
		handleClick(event) {
			let { cell, row, column } = this.getCell(event);
			if (!cell) return;
			if (cell.disabled) return;

			this.$emit('pick', cell.dates);
		},
		handleMouseMove(event) {
			let { cell, row, column } = this.getCell(event);
			if (!cell) return;

			if (!this.rangeState.selecting || cell.disabled) return;

			this.$emit('range-change', cell.dates);
		},
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

$block: vc-quarter-table;

@include block($block) {
	overflow: auto;
	@include element(wrapper) {
		margin: 10px;
		white-space: normal;
	}
	@include element(cell) {
		div {
			position: relative;
			width: 60px;
			height: 28px;
			line-height: 28px;
			margin: 8px 9px;
			border-radius: 3px;
			cursor: pointer;
			span {
				display: inline-block;
				width: 60px;
				height: 28px;
				line-height: 28px;
				margin: 0;
				border-radius: 3px;
				text-align: center;
				transition: background .2s ease-in-out;
			}
			&:hover {
				background: #e1f0fe;
			}
		}
		@include when(selected) {
			div {
				background: #2d8cf0;
				color: #fff;
			}
		}
		@include when(range) {
			div {
				&:before {
					content: "";
					display: block;
					background: #e1f0fe;
					border-radius: 0;
					border: 0;
					position: absolute;
					top: 0px;
					bottom: 0px;
					left: -9px;
					right: -9px;
				}
				span {
					position: relative;
					z-index: 1;
				}
			}
		}
		@include when(disabled) {
			div {
				cursor: not-allowed;
				color: #c5c8ce;
				background: #f7f7f7;
				&:hover {
					background: #f7f7f7;
				}
			}
		}
	}
}
</style>
