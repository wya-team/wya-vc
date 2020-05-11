<template>
	<vc-paging
		:data-source="listInfo.data"
		:total="listInfo.total" 
		:count="listInfo.count"
		:reset="listInfo.reset"
		:page-opts="page"
		:table-opts="table"
		:history="true"
		:load-data="loadData"
		:show="show"
		mode="piece"
		class="v-paging-piece"
		@page-size-change="handleResetFirst"
	>
		<template #default="{ it }">
			<div :key="it.id" class="_item">
				<div>{{ it.name }}</div>
				<div @click="handleResetFirst">
					回到首页刷新
				</div>
				<div @click="handleResetCur">
					当前页刷新
				</div>
			</div>
		</template>
	</vc-paging>
</template>
<script>
import { ajax } from '@wya/http';
import Paging from '../paging';
import { initPage } from './utils/utils';

export default {
	name: "vc-paging-combo",
	components: {
		'vc-paging': Paging,
	},
	data() {
		return {
			show: true,
			listInfo: {
				...initPage
			},
			page: undefined,
			table: {
				"disabled-hover": true,
				"style": "margin: 20px"
			},
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
		 * 请使用vuex的commit，这里只负责实现
		 */
		handleResetFirst() {
			this.listInfo = {
				...initPage
			};
		},
		/**
		 * 当前页刷新
		 * 请使用vuex的commit，这里只负责实现
		 */
		handleResetCur() {
			this.listInfo = {
				...initPage,
				reset: true
			};
		}
	}
};
</script>

<style lang="scss">
.v-paging-piece {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 0 20px;
	._item {
		border: 1px solid #d4d4d4;
		padding: 20px;
		margin-bottom: 20px;
		width: calc(50% - 10px);
	}
}
</style>

