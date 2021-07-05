<template>
	<div class="vc-year-table">
		<table 
			class="vc-year-table__wrapper" 
			cellspacing="0"
			cellpadding="0"
		>
			<tbody>
				<tr
					v-for="(row, key) in rows"
					:key="key"
					class="vc-year-table__row"
				>
					<td
						v-for="(cell, key) in row"
						:key="key"
						:class="getCellClasses(cell)"
						class="vc-year-table__cell"
						@click="handleYearTableClick(cell)"
					>
						<div>
							<span>
								{{ cell.year }}
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
	name: 'vc-year-table',
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
		startYear() {
			return Math.floor(this.panelDate.getFullYear() / 10) * 10;
		},
		rows() {
			let rows = [[], [], [], []];
			const selectedYear = value2Array(this.value);
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 3; j++) {
					let cell = {};
					if (i < 3 || j === 0) {
						cell.year = this.startYear + i * 3 + j;
					}
					cell.date = new Date(cell.year, 0, 1);
					cell.disabled = typeof this.disabledDate === 'function' && this.disabledDate(cell.year);
					cell.customClass = typeof this.cellClassName === 'function' && this.cellClassName(cell.year);
					cell.selected = selectedYear.some(year => {
						return year && cell.year === year.getFullYear();
					});
					cell.empty = !cell.year;
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
			if (cell.empty) { classes.push('is-empty'); }

			// TODO 其他情况的样式
			return classes.join(' ');
		},
		handleYearTableClick(cell) {
			if (cell.disabled || cell.empty) return;

			this.$emit('pick', cell.date);
		}
	},
};
</script>

<style lang="scss">
@import '../../style/vars.scss';

$block: vc-year-table;

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
		@include when(empty) {
			div {
				cursor: default;
				&:hover {
					background: unset;
				}
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
