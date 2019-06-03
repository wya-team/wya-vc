<template>
	<div style="padding: 30px">
		<h1>Basic</h1>
		<vc-table :data-source="dataSource">
			<vc-table-item>
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
					address: '浙江省杭州市拱墅区祥符街道',
				}, 
				{
					id: 2,
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
				}, 
				{
					id: 3,
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
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
	methods: {}
};
</script>