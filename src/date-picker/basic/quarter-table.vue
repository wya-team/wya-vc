<template>
	<div class="vc-quarter-table">
		<table 
			class="vc-quarter-table__wrapper" 
			cellspacing="0"
			cellpadding="0"
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
						@click="handleQuarterTableClick(cell)"
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
import { getDayCountOfMonth } from '../../utils/date-utils';
import { value2Array } from '../utils';
import { QUARTER_CN } from '../constants';

export default {
	name: 'vc-quarter-table',
	components: {

	},
	props: {
		value: Array,
		panelDate: Date,
		disabledDate: Function
	},
	data() {
		return {
			QUARTER_CN
		};
	},
	computed: {
		rows() {
			let rows = [[], [], [], []];
			const year = this.panelDate.getFullYear();
			const selectedQuarter = value2Array(this.value);
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 2; j++) {
					let cell = {};
					cell.quarter = i * 2 + j; // 值为：0，1，2，3
					cell.dates = this.getMonthRange(cell.quarter);
					cell.disabled = typeof this.disabledDate === 'function' && this.disabledDate(cell.quarter);
					cell.customClass = typeof cellClassName === 'function' && cellClassName(cell.quarter);
					cell.selected = selectedQuarter.some(quarter => {
						return (year === quarter[0].getFullYear()) && this.getQuarterByMonth(quarter) === cell.quarter;
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
			let months = [quarter * 3, quarter * 3 + 2];
			let endDay = getDayCountOfMonth(year, months[1]);
			return [
				new Date(year, months[0]),
				new Date(year, months[1], endDay)
			];
		},
		getQuarterByMonth(value) {
			let start = value[0].getMonth();
			let end = value[1].getMonth();
			if (start === 0 && end === 2) {
				return 0;
			} else if (start === 3 && end === 5) {
				return 1;
			} else if (start === 6 && end === 8) {
				return 2;
			} else if (start === 9 && end === 11) {
				return 3;
			}
		},
		getCellClasses(cell) {
			let classes = [];
			if (cell.selected) { classes.push('is-selected'); }
			if (cell.disabled) { classes.push('is-disabled'); }
			if (cell.empty) { classes.push('is-empty'); }

			// TODO 其他情况的样式
			return classes.join(' ');
		},
		handleQuarterTableClick(cell) {
			if (cell.disabled) return;

			this.$emit('pick', cell.dates);
		}
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
