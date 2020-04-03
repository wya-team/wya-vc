## 带分页的表格（Paging）
Paging

### 基础用法
:::RUNTIME
```html
<template>
	<vc-paging
		:data-source="listInfo.data"
		:load-data="loadData"
		:total="listInfo.total"
		:count="listInfo.count"
		:reset="listInfo.reset"
		:page-opts="page"
		:table-opts="table"
		:history="true"
		:show="show"
		style="width: 100%"
		@page-size-change="handleResetFirst"
	>
		<vc-table-item>
			<vc-table-column
				prop="date"
				label="日期"
				width="180"
			/>
			<vc-table-column
				prop="name"
				label="姓名"
				width="180"
			/>
			<vc-table-column
				prop="address"
				label="地址"
			/>
		</vc-table-item>
		<template #loading>
			<div>loading</div>
		</template>
	</vc-paging>
</template>
<script>
import { ajax } from '@wya/http';
import { Table, Paging } from '@wya/vc';

const initPage = {
	reset: false,
	current: 0,
	total: 0,
	count: 0,
	data: {

	}
};
export default {
	name: "vc-paging-basic",
	components: {
		'vc-paging': Paging,
		'vc-table-item': Table.Item,
		'vc-table-column': Table.Column,
	},
	data() {
		return {
			show: true,
			listInfo: {
				...initPage
			},
			page: undefined,
			table: undefined,
		};
	},
	methods: {
		loadData(page, pageSize) {
			return new Promise((reslove, reject) => {
				setTimeout(() => {
					reslove();
				}, 1000);
			}).then(() => {
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
			});
		},
		getFakeData(page, pageSize) {
			let fakeData = [];
			for (let i = 0; i < pageSize; i++) {
				fakeData.push({
					id: `${page}_${i}`,
					name: page + '-Business' + Math.floor(Math.random() * 100 + 1),
					status: Math.floor(Math.random() * 3 + 1),
					opt: Math.floor(Math.random() * 3 + 1),
					date: '2016-05-02',
					address: '上海市普陀区金沙江路 1518 弄'
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

```
:::

### tab内使用

:::RUNTIME
```html
<template>
	<div>
		<vc-input 
			v-model="keyword" 
			search 
			enter-button="搜索" 
			placeholder="请输入关键字搜索"
			style="margin: 20px; width: 300px"
			@enter="handleSearch"
		/>
		<vc-tabs 
			:value="type" 
			:animated="true" 
			type="card"
			@click="handleChange"
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
import { Tabs, Input, Paging, Table, Message } from '@wya/vc';
const initPage = {
	reset: false,
	current: 0,
	total: 0,
	count: 0,
	data: {

	}
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
		},
	}
};
</script>

```
:::


### piece模式
:::RUNTIME
```html
<template>
	<vc-paging
		:data-source="listInfo.data"
		:total="100" 
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
import { Paging } from '@wya/vc';
const initPage = {
	reset: false,
	current: 0,
	total: 0,
	count: 0,
	data: {

	}
};

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

```
:::


### 表格展开
:::RUNTIME
```html
<template>
	<vc-paging
		:data-source="listInfo.data"
		:load-data="loadData"
		:total="listInfo.total"
		:count="listInfo.count"
		:reset="listInfo.reset"
		:page-opts="page"
		:table-opts="table"
		:history="true"
		:show="show"
		row-key="id"
		style="width: 100%"
		@page-size-change="handleResetFirst"
		@selection-change="handleSeleChange"
	>
		<vc-table-item>
			<vc-table-column
				type="selection"
				width="55"
			/>
			<vc-table-column
				prop="date"
				label="日期"
				width="180"
			/>
			<vc-table-column
				prop="name"
				label="姓名"
				width="180"
			/>
			<vc-table-column
				prop="address"
				label="地址"
			/>
			<vc-table-column
				label="操作"
			>
				<template #default="{ it }">
					<div>
						<div @click="handleResetFirst">
							回到首页刷新
						</div>
						<div @click="handleResetCur">
							当前页刷新
						</div>
					</div>
				</template>
			</vc-table-column>
		</vc-table-item>
	</vc-paging>
</template>
<script>
import { ajax } from '@wya/http';
import { Paging, Table } from '@wya/vc';
const initPage = {
	reset: false,
	current: 0,
	total: 0,
	count: 0,
	data: {

	}
};

export default {
	name: "vc-paging-basic",
	components: {
		'vc-paging': Paging,
		'vc-table-item': Table.Item,
		'vc-table-column': Table.Column,
	},
	data() {
		return {
			show: true,
			listInfo: {
				...initPage
			},
			page: undefined,
			table: {
				lazy: true,
				rowKey: 'id',
				loadExpand: this.loadExpand
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
					opt: Math.floor(Math.random() * 3 + 1),
					date: '2016-05-02',
					address: '上海市普陀区金沙江路 1518 弄',
					hasChildren: true
				});
			}
			return fakeData;
		},
		handleSeleChange(selection, curSelection) {
			console.log('selection :', selection, curSelection, 1);
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
		},

		loadExpand(tree, treeNode) {
			console.log(tree, treeNode, /loadExpand/);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([
						{
							id: Math.random(),
							date: '2016-05-01',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄',
							children: []
						}, 
						{
							id: Math.random(),
							date: '2016-05-01',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄',
							hasChildren: []
						}
					]);
				}, 1000);
			});
			
		}
	}
};
</script>
```
:::

## API

#### 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
show | 展示 | `boolean` | - | true
history | url表示,是否从url中获取page | `boolean` | - | false
sync | 同步`vuex/vue-router`（this.$route） | `boolean` | - | false
mode | 表格模式 | `string` | `native`、 `piece`、 `table` | `table` 
loadData | 数据加载 | `function` | - | -
dataSource | 数据源 | `obj:{ str: arr }` | - | -
columns | item, mode为`native`时生效 | `arr` | - | -
total | 总页数 | `number` | - | 0
count | 总条数 | `number` | - | 0
reset | 刷新时候使用，当前页刷新（true）,首页刷新（false） | `boolean` | - | -
tableOpts | 表格额外参数, 参考table组件 | `object` | - | -
pageOpts | 分页额外参数, 参考page组件 | `object` | - | -
loadingOpts | 加载额外参数,加载暂时不用 | - | - | 
rowKey | 行数据的 Key，在使用翻页多选时必填 | `string` | - | -
`current.sync` | 分页参数同步 | `string`、`number` | - | -
footer | 是否显示分页 | `boolean` | - | true

#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
@load-pending | 加载中 | - | -
@load-success | 加载成功 | - | -
@load-error | 加载失败 | - | -
@load-finish | 加载结束（都会触发） | - | -
@selection-change | 所有页选中的数据 | - | selection(全部选中的数据), curPageSelection(当前页选中的数据)
@page-size-change | 分页size改变 | - | 改变后的分页size
@page-change | 页码改变 | - | 改变后的页码

#### 方法

属性 | 说明 | 参数 | 返回值
---|---|---|---
`load-data` | 数据加载请求 | `page, PageSize` | `Promise`