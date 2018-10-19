<template>
	<vc-paging
		:data-source="listInfo.data"
		:total="listInfo.total" 
		:reset="listInfo.reset"
		:page-opts="page"
		:table-opts="table"
		:history="true"
		:load-data="loadData"
		:show="show"
		mode="piece"
		class="v-paging-piece"
	>
		<!-- 
		<item 
			slot-scope="it"
			v-bind="it"
			class="_item"
		/> 
		-->
		<div slot-scope="it" :key="it.id" class="_item">
			<div>{{ it.name }}</div>
			<div @click="handleResetFirst">回到首页刷新</div>
			<div @click="handleResetCur">当前页刷新</div>
		</div>
	</vc-paging>
</template>
<script>
import { ajax } from 'wya-fetch';
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
			page: {
				'show-total': false
			},
			table: {
				"disabled-hover": true,
				"style": "margin: 20px"
			},
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

