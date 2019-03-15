<template>
	<div style="padding: 20px">
		<div @click="resetDateFilter">清除日期过滤器</div>
		<div @click="clearFilter">清除所有过滤器</div>
		<vc-table
			ref="filterTable"
			:data="tableData"
			style="width: 100%"
		>
			<vc-table-item>
				<vc-table-column
					prop="date"
					label="日期"
					width="180"
				/>
				<vc-table-column
					prop="name"
					label="姓名"
					width="180"
				/>
				<vc-table-column
					:formatter="formatter"
					prop="address"
					label="地址"
				>
					<div @click="handleResetFirst">回到首页刷新</div>
					<div @click="handleResetCur">当前页刷新</div>
				</vc-table-column>
			</vc-table-item>
		</vc-table>
	</div>
</template>

<script>
import Table from '..';

export default {
	components: {
		'vc-table': Table,
		'vc-table-column': Table.Column,
		'vc-table-item': Table.Item
	},
	data() {
		return {
			tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄',
				tag: '家'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄',
				tag: '公司'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄',
				tag: '家'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄',
				tag: '公司'
			}]
		};
	},
	methods: {
		resetDateFilter() {
			this.$refs.filterTable.clearFilter('date');
		},
		clearFilter() {
			this.$refs.filterTable.clearFilter();
		},
		formatter(row, column) {
			return row.address;
		},
		filterTag(value, row) {
			return row.tag === value;
		},
		filterHandler(value, row, column) {
			const property = column.property;
			return row[property] === value;
		}
	}
};
</script>