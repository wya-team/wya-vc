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
					width="180"
				/>
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
import { random } from 'lodash';
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
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				}, 
				{
					id: 2,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				}, 
				{
					id: 3,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				},
				{
					id: 4,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				}
			]
		};
	},
	methods: {}
};
</script>