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
		piece-class="table-container"
	>
		<div
			slot-scope="slotProps" 
			slot="piece-item" 
			:kye="slotProps.id" 
			class="piece-item">
			<div>{{ slotProps.item.name }}</div>
			<div @click="handleResetFirst">回到首页刷新</div>
			<div @click="handleResetCur">当前页刷新</div>
		</div>
	</vc-paging>
</template>
<script>
import { ajax } from 'wya-fetch';
import Paging from '../paging';

const initPage = {
	total: 0,
	reset: false,
	data: {}
};

export default {
	name: "vc-paging-combo",
	components: {
		'vc-paging': Paging
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
.table-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 0 20px;
	.piece-item {
		border: 1px solid #d4d4d4;
		padding: 20px;
		margin-bottom: 20px;
		width: calc(50% - 10px);
	}
}
</style>

