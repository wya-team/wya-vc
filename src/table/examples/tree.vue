<template>
	<div style="padding: 20px">
		<h1>Tree</h1>
		<vc-button @click="expandSelectable = !expandSelectable">expandSelectable: {{ expandSelectable }}</vc-button>
		<br>
		<br>
		<vc-table
			ref="table"
			:key="expandSelectable"
			:data-source="dataSource"
			:load-expand="loadExpand"
			:expand-selectable="expandSelectable"
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
					resizable
				/>
				<vc-table-column
					prop="name"
					label="姓名"
					min-width="180"
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
import { random } from 'lodash';
import Table from '..';
import Button from '../../button';

export default {
	components: {
		'vc-table': Table,
		'vc-table-column': Table.Column,
		'vc-table-item': Table.Item,
		'vc-button': Button
	},
	data() {
		return {
			expandSelectable: true,
			dataSource: [
				{
					id: 1,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
					hasChildren: true
				}, 
				{
					id: 2,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
					hasChildren: true
				}, 
				{
					id: 3,
					date: `${new Date().getTime()}`,
					name: `代号 - ${random(0, 10000)}`,
					address: `祥园路${random(0, 10000)}号`,
					children: [
						{
							id: 31,
							date: `${new Date().getTime()}`,
							name: `代号 - ${random(0, 10000)}`,
							address: `祥园路${random(0, 10000)}号`,
						}, 
						{
							id: 32,
							date: `${new Date().getTime()}`,
							name: `代号 - ${random(0, 10000)}`,
							address: `祥园路${random(0, 10000)}号`,
						}
					]
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
	mounted() {
		window.store = this.$refs.table.store;
	},
	methods: {
		loadExpand(tree, treeNode) {
			console.log(tree, treeNode, /loadExpand/);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([
						{
							id: random(0, Number.MAX_SAFE_INTEGER),
							date: `${new Date().getTime()}`,
							name: `代号 - ${random(0, 10000)}`,
							address: `祥园路${random(0, 10000)}号`,
							hasChildren: true
						}, 
						{
							id: random(0, Number.MAX_SAFE_INTEGER),
							date: `${new Date().getTime()}`,
							name: `代号 - ${random(0, 10000)}`,
							address: `祥园路${random(0, 10000)}号`,
							hasChildren: true
						}
					]);
				}, 1000);
			});
		},
		formatter({ row, column, cellValue, index }) {
			return row.address;
		}
	}
};
</script>