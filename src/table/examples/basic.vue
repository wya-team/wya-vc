<template>
	<div style="padding: 30px">
		<h1>Basic</h1>
		<vc-table 
			:data-source="dataSource"
			:default-sort="defaultSort"
			@sort-change="handleSort"
		>
			<vc-table-item>
				<vc-table-column
					prop="date"
					label="日期"
					sortable
					:filters="filters"
					:filtered-value="filteredValue"
					:filter-multiple="true"
					:filter="handleFilter"
					min-width="180"
				/>
				<vc-table-column
					prop="name"
					label="姓名"
					width="180"
					sortable
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
			defaultSort: { prop: 'date', order: 'descending' },
			filters: [
				{ label: '代理升级', value: 1 },
				{ label: '代理加入', value: 2, disabled: true }
			],
			filteredValue: [],
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
	methods: {
		handleSort(sortInfo) {
			this.defaultSort = sortInfo;
		},
		handleFilter(value) {
			this.filteredValue = value;
		}
	}
};
</script>