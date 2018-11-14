<template>
	<vc-paging
		:data-source="listInfo.data"
		:columns="columns" 
		:total="listInfo.total"
		:reset="listInfo.reset"
		:page-opts="page"
		:table-opts="table"
		:history="true"
		:load-data="loadData"
		:show="show"
		@page-size-change="handleResetFirst"
	/>
</template>
<script>
import { ajax } from 'wya-fetch';
import Paging from '../paging';
import { initPage } from './utils/utils';

export default {
	name: "vc-paging-basic",
	components: {
		'vc-paging': Paging
	},
	data() {
		return {
			show: true,
			listInfo: {
				...initPage
			},
			page: undefined,
			table: undefined,
			columns: [
				{
					type: 'selection',
					width: 60
				},
				{
					title: 'Name',
					key: 'name'
				},
				{
					title: 'Status',
					key: 'status',
					render: (h, params) => {
						return h('div', {
							style: {
								marginRight: '5px'
							},
							on: {
								click: this.handleResetFirst
							}
						}, '回到首页刷新');
					}
				},
				{
					title: 'Opt',
					key: 'opt',
					render: (h, params) => {
						return h('div', {
							style: {
								marginRight: '5px'
							},
							on: {
								click: this.handleResetCur
							}
						}, '当前页刷新');
					}
				}
			],
		};
	},
	computed: {
		
	},
	methods: {
		loadData(page, pageSize) {
			return ajax({
				url: 'test.json',
				localData: {
					status: 1,
					data: {
						currentPage: page,
						total: 100,
						list: this.getFakeData(page, pageSize)
					}

				}
			}).then((res) => {
				console.log(`page: ${page}@success`);
				const { currentPage, total, list } = res.data;
				this.listInfo = {
					...this.listInfo,
					total,
					data: {
						...this.listInfo.data,
						[currentPage]: list
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
					opt: Math.floor(Math.random() * 3 + 1)
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
		}
	}
};
</script>
