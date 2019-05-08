<template>
	<div>
		<vc-input 
			v-model="keyword" 
			search 
			enter-button="搜索" 
			placeholder="请输入关键字搜索"
			style="margin: 20px; width: 300px"
			@search="handleSearch"
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
					:data-source="listInfo[item.value].data"
					:total="listInfo[item.value].total"
					:count="listInfo[item.value].count"
					:reset="listInfo[item.value].reset"
					:current.sync="current[item.value]"
					:page-opts="page"
					:history="true"
					:load-data="loadData"
					style="width: 100%"
					@page-size-change="handleResetFirst"
				>
					<vc-table-column
						prop="id"
						label="ID"
						width="180"
					/>
					<vc-table-column
						prop="name"
						label="姓名"
						width="180"
					/>
					<vc-table-column
						prop="status"
						label="状态"
					/>
				</vc-paging>
			</vc-tab-pane>
		</vc-tabs>
	</div>
</template>
<script>
import { ajax } from '@wya/http';
import { URL } from '@wya/utils';
import Tabs from '../../tabs';
import Input from '../../input';
import Message from '../../message';
import Paging from '../paging';
import Table from '../../table';
import { initPage } from './utils/utils';

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
		'vc-tab-pane': Tabs.Pane,
		'vc-input': Input,
		'vc-table-column': Table.Column
	},
	data() {
		const { query = {} } = URL.parse();

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
			]
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
							page: {
								current: page,
								total: 100,
								count: pageSize * 100,
							},
							list: this.getFakeData(page, pageSize)
						}
					};
					this.listInfo = {
						...this.listInfo,
						[type]: {
							...res.data.page,
							data: {
								...this.listInfo[type].data,
								[page]: res.data.list
							}
						}
						
					};
					resolve();
				}, 150);
			});
		},
		getFakeData(page, pageSize) {
			let fakeData = [];
			for (let i = 0; i < pageSize; i++) {
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
			let { path, query } = URL.parse();
			window.history.replaceState(null, null, URL.merge({
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
		}
	}
};
</script>
