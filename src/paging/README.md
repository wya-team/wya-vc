## [Demo Basic](https://wya-team.github.io/wya-vc/dist/paging/basic.html)
## 功能
Paging

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
show | 展示 | `bool` | true
history | url表示 | `boolean` | false
sync | 同步`vuex/vue-router`（this.$route） | `bool` | false
dataSource | 数据源 | `obj:{ str: arr }` | -
columns | item | `arr` | -
total | 总数量 | `number` | 0
reset | 刷新时候使用，当前页刷新（true）,首页刷新（false） | `boolean` | -
tableOpts | 表格额外参数 | `obj` | -
pageOpts | 分页额外参数 | `obj` | -
`current.sync` | 分页参数同步 | `str/num` | -

额外属性同`iView`的 [table](https://www.iviewui.com/components/table) 和 [page](https://www.iviewui.com/components/page)


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
@load-pending | 加载中 | `function` | -
@load-success | 加载成功 | `function` | -
@load-error | 加载失败 | `function` | -
@load-finish | 加载结束（都会触发） | `function` | -

`iView`中的 `table` 和 `page` 的事件代`on`


#### 方法

属性 | 说明 | 类型 | 默认值
---|---|---|---
`load-data` | 数据加载请求 | `function` | -

`iView`中的 `table` 和 `page` 的事件代`on`

## 基础用法

```vue
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
	/>
</template>
<script>
import { ajax } from 'wya-fetch';
import { Paging } from 'wya-vc';

const initPage = {
	total: 0,
	reset: false,
	data: {}
};

export default {
	name: "vc-paging-basic",
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

			},
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

```