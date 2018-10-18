<template>
	<div>
		<i-input 
			v-model="keyword" 
			search 
			enter-button="搜索" 
			placeholder="请输入关键字搜索"
			style="margin: 20px; width: 300px"
			@on-search="handleSearch"
		/>
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
					:current.sync="current[item.value]"
					:history="true"
					:load-data="loadData"
					:page-opts="page"
				/>
			</i-tab-pane>
		</i-tabs>
	</div>
</template>
<script>
import { ajax } from 'wya-fetch';
import { Tabs, TabPane, Input } from 'iview';
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
		'i-tab-pane': TabPane,
		'i-input': Input
	},
	data() {
		const { query = {} } = getParseUrl();

		return {
			show: true,
			type: String(query.type || 1), // 同tabs下的value
			keyword: String(query.keyword || ''),
			listInfo: initialState,
			current: {},
			page: {
				showTotal: true
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
			// 真实场景为ajax
			return new Promise((resolve, reject) => {
				// 模拟loading
				setTimeout(() => {
					console.log(`page: ${page}-type: ${type}@success`);
					// 模拟后端的数据
					const res = {
						status: 1,
						data: {
							currentPage: page,
							total: 100,
							list: this.getFakeData(page)
						}
					};
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
					resolve();
				}, 150);
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
		 * 
		 */
		setHistory(values) {
			let { path, query } = getParseUrl();
			window.history.replaceState(null, null, getConstructUrl({
				path,
				query: {
					...query,
					...values
				}
			}));
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

			this.setHistory({
				type,
				page: this.current[type]
			});
		},
		handleSearch(keyword) {
			this.listInfo = {
				...initialState
			};

			this.setHistory({
				keyword
			});
		}
	}
};
</script>
