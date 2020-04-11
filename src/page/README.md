## 分页 (Page)
当数据量较多时，使用分页可以快速进行数据切换。每次只加载一个页面。

### 何时使用
- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

### 基础用法

:::RUNTIME
```html
<template>
	<div class="v-page-basic">
		<vc-page
			class="page"
			:count="100" 
		/>
		<div>基本的分页，页数过多时会自动折叠。默认显示总共多少条数据，可以通过设置属性show-count=false来隐藏它；</div>
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
.v-page-basic .page {
	margin-bottom: 10px;
}
</style>
```
:::

### 每页数量

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
## API

#### Page props

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
portal | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | `Boolean` | - | `true`

#### Prop events

事件名 | 说明 | 类型 | 参数 | 返回值
---|---|---|--- | --- 
change | 页码改变的回调，参数是改变后的页码 | `Function(page)` | `page: Number`| -
page-size-change | 切换每页条数时的回调，参数是切换后的每页条数 | `Function(pageSiz)` | `pageSize: String`| -

#### Page Slot

属性 | 说明
---|---
无 | 自定义显示总数的内容