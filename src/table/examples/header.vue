
<template>
	<vc-table
		:data-source="dataSource"
		style="width: 100%"
	>
		<vc-table-column
			prop="date"
			label="日期"
			width="150"
		/>
		<vc-table-column v-if="true" label="配送信息">
			<vc-table-column
				prop="name"
				label="姓名"
				width="120"
			/>
			<vc-table-column label="地址">
				<vc-table-column
					prop="address"
					label="省份"
					width="120"
				/>
				<vc-table-column
					prop="city"
					label="市区"
					width="120"
				/>
				<vc-table-column
					prop="address"
					label="地址"
				/>
				<vc-table-column
					prop="id"
					label="邮编"
					width="120"
				/>
			</vc-table-column>
		</vc-table-column>
	</vc-table>
</template>

<script>
import { random } from 'lodash';
import Table from '..';

export default {
	components: {
		'vc-table': Table,
		'vc-table-column': Table.Column
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
				},
				{
					id: 5,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				}, 
				{
					id: 6,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				}, 
				{
					id: 7,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				},
				{
					id: 8,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				},
				{
					id: 9,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				}, 
				{
					id: 10,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				}, 
				{
					id: 11,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				},
				{
					id: 12,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
				}
			]
		};
	}
};
</script>
