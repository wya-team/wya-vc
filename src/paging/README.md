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
total | 总页数 | `number` | 0
count | **总条数** | `number` | 0
reset | 刷新时候使用，当前页刷新（true）,首页刷新（false） | `boolean` | -
tableOpts | 表格额外参数, 参考table组件 | `obj` | -
pageOpts | 分页额外参数, 参考page组件 | `obj` | -
rowKey | 行数据的 Key，在使用翻页多选时必填 | `str` | -
`current.sync` | 分页参数同步 | `str/num` | -

#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
@load-pending | 加载中 | - | -
@load-success | 加载成功 | - | -
@load-error | 加载失败 | - | -
@load-finish | 加载结束（都会触发） | - | -
@all-selection-change | 所有页选中的数据 | - | allSelection

#### 方法

属性 | 说明 | 参数 | 返回值
---|---|---|---
`load-data` | 数据加载请求 | `page, PageSize` | `Promise`

## 基础用法

```vue
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
	</vc-paging>
</template>
```