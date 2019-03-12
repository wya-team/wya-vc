<template>
	<div>
		<vc-input 
			v-model="keyword" 
			search 
			enter-button="搜索" 
			placeholder="请输入关键字搜索"
			style="margin: 20px; width: 300px"
			@on-search="handleSearch"
		/>
		<vc-tabs 
			:value="type" 
			:animated="false" 
			@on-click="handleChange"
		>
			<vc-tab-pane 
				v-for="(item) in tabs"
				:key="item.value"
				:label="item.label" 
				:name="item.value"
			>
				<vc-paging
					:ref="item.value"
					:key="item.value"
					:show="item.value == type" 
					:type="item.value"
					:columns="columns" 
					:data-source="listInfo[item.value].data"
					:total="listInfo[item.value].total"
					:reset="listInfo[item.value].reset"
					:current.sync="current[item.value]"
					:history="true"
					:load-data="loadData"
					:load-expand-data="loadExpandData"
					:page-opts="page"
					:expand-opts="expand"
					@page-size-change="handleResetFirst"
					@selection-change="handleSelect"
					@expand="handleExpand"
				/>
			</vc-tab-pane>
		</vc-tabs>
	</div>
</template>
<script>
import { ajax } from '@wya/fetch';
import Tabs from '../../tabs';
import Input from '../../input';
import Message from '../../message';

import Paging from '../paging';
import { initPage } from './utils/utils';
import { getConstructUrl, getParseUrl } from '../../utils/utils';

let count = 0;
const initialState = {
	1: { ...initPage },
	2: { ...initPage },
	3: { ...initPage }
};

export default {
	name: "vc-paging-basic",
	components: {
		'vc-paging': Paging,
		'vc-tabs': Tabs,
		'vc-tab-pane': Tab.Pane,
		'vc-input': Input
	},
	data() {
		const { query = {} } = getParseUrl();

		return {
			show: true,
			loading: null,
			type: String(query.type || 1), // 同tabs下的value
			keyword: String(query.keyword || ''),
			listInfo: initialState,
			current: {},
			page: undefined,
			table: undefined,
			expand: {
				all: false,
				key: 'id', 
				keys: []
			},
			tabs: [
				{ label: '标签一', value: '1' }, 
				{ label: '标签二', value: '2' }, 
				{ label: '标签三', value: '3' }
			],
			columns: [
				{
					type: 'selection',
					width: 60
				},
				{
					title: '22',
					width: 60,
					render: (h, params) => {
						const { row: { __level__, __expand__, children }, index } = params;

						// 点击展开事件
						const handleClick = (e) => {
							this.$refs[this.type][0].expand({ index });
						};

						return h('div', {
							style: {
								marginLeft: `${(__level__ - 1) * 20}px`,
								width: `20px`,
								boxSizing: `content-box`
							},
							on: {
								click: handleClick 
							}
						}, children ? !__expand__ ? this.loading === index ? '...' : '+' : '-' : '');
						
					}
				},
				{
					title: 'Name',
					key: 'name',
				},
				{
					title: 'Id',
					key: 'id',
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
						}, `回到首页刷新${this.type}`);
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
							list: this.getFakeData(page, pageSize, 3)
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
		getFakeData(page, pageSize, totalLevel) {
			let fn = (level, parent) => {
				if (level > totalLevel) {
					return;
				} else {
					level++;
				}
				let length = level === 1 ? pageSize : Math.floor(Math.random() * 4 + 1);
				let fakeData = [];
				for (let i = 0; i < length; i++) {
					fakeData.push({
						// id: Math.random(),
						id: `${this.type}_${count++}`,
						name: `level: ${level} page: ${page} type: ${this.type}`,
						status: Math.floor(Math.random() * 3 + 1),
						opt: Math.floor(Math.random() * 3 + 1),
						// __level__: level,
						children: Math.floor(Math.random() * 2) ? fn(level) : []
						// children: fn(level)
					});
				}
				return fakeData;
			};
			return fn(0, 0);
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
				type
			});
		},
		handleSearch(keyword) {
			this.listInfo = {
				...initialState
			};

			this.setHistory({
				keyword
			});
		},
		loadExpandData(opts = {}) {
			const { index } = opts; 
			this.loading = index;
			return new Promise((resolve, reject) => {
				const { type, current } = this;
				const page = current[type];

				let children = this.getFakeData(current[type], 3, 5);
				setTimeout(() => {
					resolve(children);
					this.loading = null;
				}, 2000);
			});
		},
		handleExpand({ maxLevel, children, }) {
			this.columns[1].width = 60 + (maxLevel - 1) * 20;
		},
		handleSelect(row) {
			console.log(row);
		}
	}
};
</script>
