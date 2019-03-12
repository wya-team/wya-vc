<template>
	<div style="-webkit-user-select: none">
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
					@page-size-change="handleResetFirst"
				/>
			</vc-tab-pane>
		</vc-tabs>
	</div>
</template>
<script>
import { ajax } from '@wya/fetch';
import Tabs from '../../tabs';
import Input from '../../input';

import Paging from '../paging';
import { initPage } from './utils/utils';
import { getConstructUrl, getParseUrl } from '../../utils/utils';

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
			type: String(query.type || 1), // 同tabs下的value
			keyword: String(query.keyword || ''),
			listInfo: initialState,
			current: {},
			page: undefined,
			table: undefined,
			tabs: [
				{ label: '标签一', value: '1' }, 
				{ label: '标签二', value: '2' }, 
				{ label: '标签三', value: '3' }
			],
			columns: [
				{
					title: 'Name',
					key: 'name',
					render: (h, params) => {
						const { row: { __level__, __expand__, name }, index } = params;

						const { type } = this;
						const page = this.current[type];
						const data = this.listInfo[type].data[page];
						const { __children__ } = data[index] || {}; // 不拿row中children; row会被深度拷贝

						return h('div', {
							style: {
								paddingLeft: `${__level__ * 20}px`
							},
							on: {
								click: __children__ ? () => this.handleExpand(index) : () => {}
							}
						}, `${__children__ ? !__expand__ ? '+' : '-' : ''} ${name} index: ${index + 1}`);
					}
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
							list: this.getFakeData(page, pageSize, 4)
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
			let fn = (__level__, parent) => {
				if (__level__ > totalLevel) {
					return;
				} else {
					__level__++;
				}

				let length = __level__ == 1 ? pageSize : 5;
				let fakeData = [];
				for (let i = 0; i < length; i++) {
					fakeData.push({
						id: Math.random(),
						// name: `page: ${page}, type: ${this.type}, sort: ${i}, __level__: ${__level__}`,
						name: `__level__: ${__level__}`,
						status: Math.floor(Math.random() * 3 + 1),
						opt: Math.floor(Math.random() * 3 + 1),
						__level__,
						__expand__: false,
						__children__: fn(__level__)
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
		handleExpand(index) {
			const { type } = this;
			const page = this.current[type];
			const data = this.listInfo[type].data[page];
			const { __children__, __level__, __expand__ } = data[index] || {};

			// 没有扩展功能
			if (!__children__ || !__level__) return;
			this.$nextTick(() => {
				if (__expand__) {
					data[index].__expand__ = false;

					// 计算要移除的元素数量
					let count = 0;
					for (let i = index + 1; i < data.length; i++) {
						if (__level__ == data[i].__level__ || __level__ > data[i].__level__) {
							break;
						}
						count++;
					}

					data.splice(index + 1, count);
				} else {
					data[index].__expand__ = true;

					// 展开
					let fn = (pre, cur) => {
						pre = [...pre, cur];
						if (cur.__children__ && cur.__expand__ === true) {
							pre = [...pre, ...cur.__children__.reduce(fn, [])];
						}
						return pre;
					};
					let result = __children__.reduce(fn, []);

					data.splice(index + 1, 0, ...result);
				}
			});
		}
	}
};
</script>
