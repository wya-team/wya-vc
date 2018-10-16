<template>
	<div>
		<div @click="handleSearch">搜索</div>
		<i-tabs 
			:value="type" 
			:animated="false" 
			@on-click="handleChange"
		>
			<i-tab-pane 
				v-for="(item) in tabs"
				:key="item.value"
				:label="item.label" 
				:name="item.value"
			>
				<vc-paging
					:show="item.value == type" 
					:type="item.value"
					:columns="columns" 
					:data-source="listInfo[item.value].data"
					:total="listInfo[item.value].total"
					:reset="listInfo[item.value].reset"
					:history="true"
					:load-data="loadData"
				/>
			</i-tab-pane>
		</i-tabs>
	</div>
</template>
<script>
import { ajax } from 'wya-fetch';
import { Tabs, TabPane } from 'iview';
import Paging from '../paging';
import { getConstructUrl, getParseUrl } from '../../utils/utils';

const initPage = {
	total: 0,
	reset: false,
	data: {}
};
const initialState = {
	1: { ...initPage },
	2: { ...initPage },
	3: { ...initPage }
};

export default {
	name: "vc-paging-basic",
	components: {
		'vc-paging': Paging,
		'i-tabs': Tabs,
		'i-tab-pane': TabPane
	},
	data() {
		const { query = {} } = getParseUrl();
		return {
			show: true,
			type: String(query.type) || '1',
			listInfo: initialState,
			page: {
				'show-total': false
			},
			table: {

			},
			tabs: [
				{ label: '标签一', value: '1' }, 
				{ label: '标签二', value: '2' }, 
				{ label: '标签三', value: '3' }
			],
			columns: [
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
		loadData(page) {
			const { type } = this;
			return ajax({
				url: 'test.json',
				param: {
					page,
					type
				},
				localData: {
					status: 1,
					data: {
						currentPage: page,
						total: 100,
						list: this.getFakeData(page)
					}

				}
			}).then((res) => {
				console.log(`page: ${page}-type: ${type}@success`);
				const { currentPage, total, list } = res.data;
				this.listInfo = {
					...this.listInfo,
					[type]: {
						total,
						data: {
							...this.listInfo[type].data,
							[currentPage]: list
						}
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
					name: `page: ${page}, type: ${this.type}, sort: ${i}`,
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
				...initialState
			};
		},
		/**
		 * 当前页刷新
		 */
		handleResetCur() {
			const { type } = this;
			this.listInfo = {
				...initialState,
				[type]: {
					...initialState[type],
					reset: true
				}
			};
		},
		handleChange(type) {
			this.type = type;

			// let { path, query } = getParseUrl();
			// console.log(query.page);
			// window.history.replaceState(null, null, getConstructUrl({
			// 	path,
			// 	query: {
			// 		...query,
			// 		type
			// 	}
			// }));
		},
		handleSearch() {
			this.listInfo = {
				...initialState
			};
		}
	}
};
</script>
