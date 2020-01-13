<template>
	<vc-paging
		:data-source="listInfo.data"
		:load-data="loadData"
		:total="listInfo.total"
		:count="listInfo.count"
		:reset="listInfo.reset"
		:page-opts="page"
		:table-opts="table"
		:history="true"
		:show="show"
		row-key="id"
		style="width: 100%"
		@page-size-change="handleResetFirst"
		@selection-change="handleSeleChange"
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
				prop="address"
				label="地址"
			/>
			<vc-table-column
				label="操作"
			>
				<template #default="{ it }">
					<div>
						<div @click="handleResetFirst">
							回到首页刷新
						</div>
						<div @click="handleResetCur">
							当前页刷新
						</div>
					</div>
				</template>
			</vc-table-column>
		</vc-table-item>
	</vc-paging>
</template>
<script>
import { ajax } from '@wya/http';
import Paging from '../paging';
import Table from '../../table';
import { initPage } from './utils/utils';

export default {
	name: "vc-paging-basic",
	components: {
		'vc-paging': Paging,
		'vc-table-item': Table.Item,
		'vc-table-column': Table.Column,
	},
	data() {
		return {
			show: true,
			listInfo: {
				...initPage
			},
			page: undefined,
			table: {
				lazy: true,
				rowKey: 'id',
				loadExpand: this.loadExpand
			},
		};
	},
	computed: {
		
	},
	methods: {
		handleSeleChange(allSelection) {
			console.log('allSelection :', allSelection);
		},
		loadData(page, pageSize) {
			return ajax({
				url: 'test.json',
				localData: {
					status: 1,
					data: {
						page: {
							current: page,
							total: 100,
							count: pageSize * 100,
						},
						list: this.getFakeData(page, pageSize)
					}

				}
			}).then((res) => {
				console.log(`page: ${page}@success`);
				this.listInfo = {
					...this.listInfo,
					...res.data.page,
					data: {
						...this.listInfo.data,
						[page]: res.data.list
					}
				};
			}).catch((e) => {
				console.log(e);
			});
		},
		getFakeData(page, pageSize) {
			let fakeData = [];
			for (let i = 0; i < pageSize; i++) {
				fakeData.push({
					id: `${page}_${i}`,
					name: page + '-Business' + Math.floor(Math.random() * 100 + 1),
					status: Math.floor(Math.random() * 3 + 1),
					opt: Math.floor(Math.random() * 3 + 1),
					date: '2016-05-02',
					address: '上海市普陀区金沙江路 1518 弄',
					hasChildren: true
				});
			}
			return fakeData;
		},
		/**
		 * 回到首页刷新
		 */
		handleResetFirst() {
			this.listInfo = {
				...initPage
			};
		},
		/**
		 * 当前页刷新
		 */
		handleResetCur() {
			this.listInfo = {
				...initPage,
				reset: true,
			};
		},

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
							children: []
						}, 
						{
							id: Math.random(),
							date: '2016-05-01',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄',
							hasChildren: []
						}
					]);
				}, 1000);
			});
			
		}
	}
};
</script>
