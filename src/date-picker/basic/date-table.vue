<template>
	<div class="vc-date-table">
		<table
			cellspacing="0"
			cellpadding="0"
			class="vc-date-table__wrapper"
			@click="handleClick"
			@mousemove="handleMouseMove"
		>
			<tbody>
				<tr class="vc-date-table__header">
					<th v-for="(week, key) in WEEKS" :key="key">{{ week }}</th>
				</tr>
				<tr
					v-for="(row, key) in rows"
					:key="key"
					class="vc-date-table__row"
				>
					<td
						v-for="(cell, key) in row"
						:key="key"
						:class="getCellClasses(cell)"
						class="vc-date-table__cell"
					>
						<div>
							<span>
								{{ cell.text }}
							</span>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { 
	getFirstDayOfMonth, getStartDateOfMonth, getDayCountOfMonth, 
	getDateTimestamp, nextDate, clearTime 
} from '../../utils/date-utils';
import { value2Array } from '../utils';
import { WEEKS } from '../constants';

export default {
	name: 'vc-date-table',
	components: {

	},
	props: {
		value: Array,
		firstDayOfWeek: {
			default: 7,
			type: Number,
			validator: val => val >= 1 && val <= 7
		},
		disabledDate: Function,
		cellClassName: Function,
		panelDate: {
			type: Date,
			required: true,
		},
		focusedDate: {
			type: Date,
			required: true,
		},
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
			tableRows: [[], [], [], [], [], []]
		};
	},
	computed: {
		offsetDay() {
			const week = this.firstDayOfWeek;
			// 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
			return week > 3 ? 7 - week : -week;
		},
		WEEKS() {
			const week = this.firstDayOfWeek;
			return WEEKS.concat(WEEKS).slice(week, week + 7);
		},
		year() {
			return this.panelDate.getFullYear();
		},
		month() {
			return this.panelDate.getMonth();
		},
		startDate() {
			return getStartDateOfMonth(this.year, this.month);
		},
		// 生成日期数据
		rows() {
			const date = new Date(this.year, this.month, 1);
			let day = getFirstDayOfMonth(date); // 一个月的第一天
			const dateCountOfMonth = getDayCountOfMonth(this.year, this.month);
			const dateCountOfLastMonth = getDayCountOfMonth(this.month === 0 ? this.year - 1 : this.year, (this.month === 0 ? 11 : this.month - 1));

			let count = 1;
		
			const rows = this.tableRows;
			// const selectedDate = this.selectionMode === 'dates' ? value2Array(this.value) : [];
			const selectedDate = value2Array(this.value);
			const focusedDate = value2Array(clearTime(this.focusedDate));
			const now = getDateTimestamp(new Date());

			for (let i = 0; i < 6; i++) {
				const row = this.tableRows[i];
				for (let j = 0; j < 7; j++) {
					let cell = row[j];
					if (!cell) {
						cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
					}
					cell.type = 'normal';
					const index = i * 7 + j;
					const time = nextDate(this.startDate, index - this.offsetDay).getTime();
					cell.inRange = time > getDateTimestamp(this.rangeState.from) && time < getDateTimestamp(this.rangeState.to);
					cell.start = this.rangeState.from && time === getDateTimestamp(this.rangeState.from);
					cell.end = this.rangeState.to && time === getDateTimestamp(this.rangeState.to);
					cell.today = time === now;

					if (i >= 0 && i <= 1) {
						const prevDay = day + this.offsetDay < 0 ? 7 + day + this.offsetDay : day + this.offsetDay;
						if (j + i * 7 >= prevDay) {
							cell.text = count++;
						} else {
							cell.text = dateCountOfLastMonth - (prevDay - (j % 7)) + 1 + i * 7;
							cell.type = 'prev-month';
						}
					} else if (count <= dateCountOfMonth) {
						cell.text = count++;
					} else {
						cell.text = count++ - dateCountOfMonth;
						cell.type = 'next-month';
					}

					let cellDate = new Date(time);
					cell.disabled = typeof this.disabledDate === 'function' && this.disabledDate(cellDate);
					cell.customClass = typeof cellClassName === 'function' && cellClassName(cellDate);
					// 选中的date在进行比较时需要清除 时分秒
					cell.selected = selectedDate.some(date => {
						if (cell.type === 'normal') {
							return date && clearTime(date).getTime() === cellDate.getTime();
						}
						return false;
					});
					cell.focused = focusedDate.some(date => date.getTime() === cellDate.getTime());

					rows[i][j] = cell;
				}
			}
			return rows;
		}
	},
	methods: {
		getCellClasses(cell) {
			let classes = [];

			classes.push(`is-${cell.type}`);
			if (cell.today) classes.push('is-today');
			if ((cell.selected || cell.start || cell.end) && cell.type === 'normal') {
				classes.push('is-selected');
			}
			if (cell.disabled) { classes.push('is-disabled'); }
			if (cell.focused) { classes.push('is-focused'); }
			if (cell.inRange && cell.type === 'normal') {
				classes.push('is-range');
			}


			// TODO 其他情况的样式
			return classes.join(' ');
		},
		getDateOfCell(row, column) {
			const offsetFromStart = row * 7 + column - this.offsetDay;
			return nextDate(this.startDate, offsetFromStart);
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
			const row = target.parentNode.rowIndex - 1;
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

			if (cell.disabled || cell.type === 'week') return;

			const newDate = this.getDateOfCell(row, column);
			this.$emit('pick', newDate, cell);
		},
		handleMouseMove(event) {
			let { cell, row, column } = this.getCell(event);
			if (!cell) return;

			if (!this.rangeState.selecting || cell.disabled) return;

			const newDate = this.getDateOfCell(row, column);
			this.$emit('range-change', newDate, cell);
		},
	},
};
</script>

<style lang="scss">
@import '../../style/index.scss';

$block: vc-date-table;

@include block($block) {
	overflow: auto;
	@include element(wrapper) {
		width: 196px;
		margin: 10px;
		white-space: normal;
		font-size: 12px;
		user-select: none;
	}
	@include element(header) {
		line-height: 24px;
		text-align: center;
		margin: 2px;
		color: #c5c8ce;
	}
	@include element(cell) {
		width: 28px;
		height: 28px;
		cursor: pointer;
		div {
			position: relative;
			line-height: 24px;
			margin: 2px;
			font-style: normal;
			border-radius: 3px;
			text-align: center;
			transition: all .2s ease-in-out;
			&:hover {
				background: #e1f0fe;
			}
			span {
				display: inline-block;
				width: 24px;
				height: 24px;
			}
		}
		@include when(today) {
			span:after {
				content: "";
				display: block;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background: #2d8cf0;
				position: absolute;
				top: 1px;
				right: 1px;
				z-index: 1
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
					left: -2px;
					right: -2px;
				}
				span {
					position: relative;
					z-index: 1;
				}
			}
		}
		@include when(focused) {
			div { box-shadow: inset 0 0 0 1px #2d8cf0; }
		}
		@include when(selected) {
			div {
				background: #2d8cf0;
				color: #fff;
			}
		}
		@include when(disabled) {
			cursor: not-allowed;
			color: #c5c8ce;
			background: #f7f7f7;
			div:hover {
				background: #f7f7f7;
			}
		}
		@include when(next-month) {
			div { color: #c5c8ce; }
		}
		@include when(prev-month) {
			div { color: #c5c8ce; }
		}
	}
}
</style>
