<template>
	<div>
		<div style="padding: 20px">
			<div @click="handleClearDate">清除日期过滤器</div>
			<div @click="handleClear">清除所有过滤器</div>
			<vc-table
				ref="filterTable"
				:data-source="dataSource"
				style="width: 100%"
				row-key="id"
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
		<vc-table
			:data-source="dataSource"
			border
			row-key="id">
			<vc-table-column
				prop="date"
				label="日期"
				min-width="180"
			/>
			<vc-table-column
				prop="name"
				label="姓名"
				width="180"/>
			<vc-table-column
				prop="address"
				label="地址"
				width="880"
			/>
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
			dataSource: [
				{
					id: 1,
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, 
				{
					id: 2,
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, 
				{
					id: 3,
					date: '2016-05-012016-05-012016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					children: [
						{
							id: 31,
							date: '2016-05-012016-05-012016-05-01',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄'
						}, 
						{
							id: 32,
							date: '2016-05-012016-05-012016-05-01',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄'
						}
					]
				},
				{
					id: 4,
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
		};
	},
	methods: {
		handleClearDate() {
			this.$refs.filterTable.clearFilter('date');
		},
		handleClear() {
			this.$refs.filterTable.clearFilter();
		},
		formatter(row, column) {
			return row.address;
		},
		handleResetFirst() {

		},
		handleResetCur() {
			
		}
	}
};
</script>