<template>
	<div style="padding: 20px">
		<h1>Tree</h1>
		<vc-table
			ref="table"
			:data-source="dataSource"
			:load-expand="loadExpand"
			lazy
			style="width: 100%"
			row-key="id"
		>
			<vc-table-item>
				<vc-table-column
					type="selection"
					width="55"
				/>
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
				/>
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
			dataSource: [
				{
					id: 1,
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					hasChildren: true
				}, 
				{
					id: 2,
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					hasChildren: true
				}, 
				{
					id: 3,
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					children: [
						{
							id: 31,
							date: '2016-05-01',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄'
						}, 
						{
							id: 32,
							date: '2016-05-01',
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
				}
			]
		};
	},
	methods: {
		loadExpand(tree, treeNode) {
			console.log(tree, treeNode, /loadExpand/);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([
						{
							id: Math.random(),
							date: '2016-05-01',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄',
							hasChildren: true
						}, 
						{
							id: Math.random(),
							date: '2016-05-01',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄',
							hasChildren: true
						}
					]);
				}, 1000);
			});
		},
		formatter(row, column, cellValue, index) {
			return row.address;
		}
	}
};
</script>