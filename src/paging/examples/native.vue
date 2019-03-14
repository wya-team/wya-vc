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
		mode="native"
		class="vc-table-native"
		@page-size-change="handleResetFirst"
	>
		<list slot-scope="it" v-bind="it" />
	</vc-paging>
</template>
<script>
import { ajax } from '@wya/http';
import Paging from '../paging';
import Table from '../../table';
import List from './native/list';
import { initPage } from './utils/utils';

export default {
	name: "vc-paging-basic",
	components: {
		'vc-paging': Paging,
		'list': List,
		'vc-table-column': Table.TableColumn
	},
	data() {
		return {
			show: true,
			listInfo: {
				...initPage
			},
			page: undefined,
			table: undefined,
			columns: ['Header - 1', 'Header - 2', 'Header - 3', 'Header - 4']
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
<style lang="scss">
.vc-table-native table {
	width: 100%;
	thead {
		th {
			text-align: left;
			height: 40px;
			white-space: nowrap;
			overflow: hidden;
			background-color: #f8f8f9;

		}
	}
	tbody {
		background-color: #ffffff;
		td {
			text-align: left;
			height: 40px;
			white-space: nowrap;
			overflow: hidden;
			border: 1px solid #ccc!important
		}
		tr {
			border: 1px solid red!important
		}
	}
}
</style>