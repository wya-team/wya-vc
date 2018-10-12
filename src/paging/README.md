## [Demo Basic](https://wya-team.github.io/wya-vc/dist/paging/basic.html)
## 功能
Paging

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
data | 表格数据`是一个以page为key， 当前页数据为value的对象` | `object` | {}
table-size | 表格尺寸(与`table`的size相同)，可选值为 `large`、`small`、`default` 或者不填 | `string` | -

其他的属性同`iView`的 [table](https://www.iviewui.com/components/table) 和 [page](https://www.iviewui.com/components/page)


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
page-change | 切换页面时的回调 | `function` | -


## 基础用法

```html
<template>
	<vc-paging
		:data="data"
		:columns="columns" 
		:total="total"
		:cur-page="curPage"
		:history="true"
		v-bind="page"
		@page-change="loadData"
	/>
</template>
<script>
import Paging from '../paging';
import { getConstructUrl, getParseUrl } from '../../utils/utils';

export default {
	name: "vc-paging-basic",
	components: {
		'vc-paging': Paging
	},
	data() {
		return {
			data: {},
			page: {
				'show-total': false
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
								click: () => {
									this.curPage = 1;
									this.data = {};
								}
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
								click: () => {
									let { query: { page = 1 } } = getParseUrl();

									this.curPage = page;
									this.data = {
										...this.data,
										[page]: []
									};
								}
							}
						}, '当前页刷新');
					}
				}
			],
			curPage: 1,
			total: 100
		};
	},
	computed: {
		
	},
	created() {
		let { query: { page = 1 } } = getParseUrl();
		this.loadData(page);
	},
	methods: {
		loadData(page) {
			let data = [];
			for (let i = 0; i < 10; i++) {
				data.push({
					name: 'Business' + Math.floor(Math.random() * 100 + 1),
					status: Math.floor(Math.random() * 3 + 1),
					opt: Math.floor(Math.random() * 3 + 1),
				});
			}
			this.curPage = page;
			if (!this.data[page] || this.data[page].length === 0) {
				this.data[page] = data;
			}
		},
	}
};
</script>
```