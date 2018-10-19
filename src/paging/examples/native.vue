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
	>
		<vc-fragment slot-scope="it" :key="it.id">
			<tr>
				<td colspan="4">
					{{ it.name }}
				</td>
			</tr>
			<tr>
				<td>
					<div class="_table-cell">
						111
					</div>
				</td>
				<td rowspan="2">
					<div class="_table-cell">
						222
					</div>
				</td>
				<td>
					<div class="_table-cell">
						333
					</div>
				</td>
				<td rowspan="2">
					<div class="_table-cell">
						444
					</div>
				</td>
			</tr>
			<tr >
				<td>
					<div class="_table-cell" @click="handleResetFirst">
						回到首页刷新
					</div>
				</td>
				<td>
					<div class="_table-cell" @click="handleResetCur">
						当前页刷新
					</div>
				</td>
			</tr>
		</vc-fragment>
	</vc-paging>
</template>
<script>
import { ajax } from 'wya-fetch';
import Paging from '../paging';
import { initPage } from './utils/utils';
import Fragment from '../../fragment/index';

export default {
	name: "vc-paging-basic",
	components: {
		'vc-paging': Paging,
		'vc-fragment': Fragment
	},
	data() {
		return {
			show: true,
			listInfo: {
				...initPage
			},
			page: {
				showTotal: true
			},
			table: {

			},
			columns: ['Header - 1', 'Header - 2', 'Header - 3', 'Header - 4']
		};
	},
	computed: {
		
	},
	methods: {
		loadData(page) {
			return ajax({
				url: 'test.json',
				localData: {
					status: 1,
					data: {
						currentPage: page,
						total: 100,
						list: this.getFakeData(page)
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
		getFakeData(page) {
			let fakeData = [];
			for (let i = 0; i < 10; i++) {
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