<template>
	<div class="vc-month-table">
		<table 
			class="vc-month-table__wrapper" 
			cellspacing="0"
			cellpadding="0"
		>
			<tbody>
				<tr
					v-for="(row, key) in rows"
					:key="key"
					class="vc-month-table__row"
				>
					<td
						v-for="(cell, key) in row"
						:key="key"
						:class="getCellClasses(cell)"
						class="vc-month-table__cell"
						@click="handleMonthTableClick(cell)"
					>
						<div>
							<span>
								{{ cell.month + 1 }}月
							</span>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { value2Array } from '../utils';

export default {
	name: 'vc-month-table',
	components: {

	},
	props: {
		value: Array,
		panelDate: Date,
		disabledDate: Function
	},
	data() {
		return {
		};
	},
	computed: {
		rows() {
			let rows = [[], [], [], []];
			const year = this.panelDate.getFullYear();
			const selectedMonth = value2Array(this.value);
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 3; j++) {
					let cell = {};
					cell.month = i * 3 + j;
					cell.date = new Date(year, cell.month, 1);
					cell.disabled = typeof this.disabledDate === 'function' && this.disabledDate(cell.month);
					cell.customClass = typeof cellClassName === 'function' && cellClassName(cell.month);
					cell.selected = selectedMonth.some(month => {
						return month && (year === month.getFullYear()) && (cell.month === month.getMonth());
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
		getCellClasses(cell) {
			let classes = [];
			if (cell.selected) { classes.push('is-selected'); }
			if (cell.disabled) { classes.push('is-disabled'); }

			// TODO 其他情况的样式
			return classes.join(' ');
		},
		handleMonthTableClick(cell) {
			if (cell.disabled) return;

			this.$emit('pick', cell.date);
		}
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

$block: vc-month-table;

@include block($block) {
	overflow: auto;
	@include element(wrapper) {
		margin: 10px;
		white-space: normal;
	}
	@include element(cell) {
		div {
			width: 40px;
			height: 28px;
			line-height: 28px;
			margin: 8px 9px;
			border-radius: 3px;
			cursor: pointer;
			span {
				display: inline-block;
				width: 40px;
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
