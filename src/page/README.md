## 分页 (Page)
当数据量较多时，使用分页可以快速进行数据切换。每次只加载一个页面。

### 何时使用
- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

### 基础用法
基本的分页，页数过多时会自动折叠。默认显示总共多少条数据，可以通过设置属性show-count=false来隐藏它。

:::RUNTIME
```html
<template>
	<div class="v-page-basic">
		<div>页数较少时效果</div>	
		<vc-page
			class="page"
			:count="50" 
		/>
		<div>大于5页时效果</div>	
		<vc-page
			class="page"
			:count="60" 
		/>
	</div>
</template>
<script>
import { Page } from '@wya/vc';

export default {
	components: {
		"vc-page": Page
	},
};
</script>
<style>
.v-page-basic .page, .v-page-basic div {
	margin-bottom: 10px;
}
</style>
```
:::

### 每页数量
可以切换每页显示的数量。

:::RUNTIME
```html
<template>
	<div class="v-page-size">
		<vc-page
			class="page"
			:count="100"
			:show-count="false"
			show-sizer
		/>
		<div>改变每页显示条目数。</div>
	</div>
</template>
<script>
import { Page } from '@wya/vc';
export default {
	components: {
		"vc-page": Page
	},
};
</script>
<style>
.v-page-size .page {
	margin-bottom: 10px;
}
</style>
```
:::

### 电梯
快速跳转到某一页。

:::RUNTIME
```html
<template>
	<div class="v-page-elevator">
		<vc-page
			class="page"
			:count="100"
			show-elevator
		/>
		<div>快速跳转到某一页。</div>
	</div>
</template>
<script>
import { Page } from '@wya/vc';

export default {
	components: {
		"vc-page": Page
	},
};
</script>
<style>
.v-page-elevator .page {
	margin-bottom: 10px;
}
</style>
```
:::

### 调用方法翻页
调用组件方法实现翻页。

:::RUNTIME
```html
<template>
	<div class="v-page-elevator">
		<vc-page
			ref="page"
			class="page"
			:count="100"
			show-elevator
		/>
		<vc-button @click="handlePrev">上一页</vc-button>
		<vc-button @click="handleNext">下一页</vc-button>
		<vc-button @click="handlePage">跳转到第三页</vc-button>
	</div>
</template>
<script>
import { Page, Button } from '@wya/vc';

export default {
	components: {
		"vc-page": Page,
		"vc-button": Button
	},
	methods: {
		handlePrev() {
			this.$refs.page.prev();
		},
		handleNext() {
			this.$refs.page.next();
		},
		handlePage() {
			this.$refs.page.resetPage(3);
		}
	}
};
</script>
<style>
.v-page-elevator .page {
	margin-bottom: 10px;
}
</style>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|--- | ---
current | 当前页码，支持 .sync 修饰符 | `Number` | - | 1
count | 数据总数 | `Number` | - | 0
page-size | 每页条数 | `Number` | -| 10
page-size-opts | 每页条数切换的配置 | `Array` | - | [10, 20, 30, 40]
placement | 条数切换弹窗的展开方向 | `String` | `bottom`、`top` | `bottom`
show-count | 显示总数 | `Boolean` | - | `true`
show-elevator | 显示电梯，可以快速切换到某一页 | `Boolean` | - | `false`
show-sizer | 显示分页，用来改变`page-size` | `Boolean` | - | `false`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---|--- 
change | 页码改变的回调 | `(page: Number) => void 0` | `page`：改变后的页码
page-size-change | 切换每页条数时的回调 | `(pageSiz: Number) => void 0` | `pageSize`：切换后的每页条数

### 方法
方法名 | 说明 | 参数
---|---|---
prev | 向上翻一页 | -
next | 向下翻一页 | -
resetPage | 跳转到指定页 | `page`：页码

### Slot
属性 | 说明
---|---
无 | 自定义显示总数的内容