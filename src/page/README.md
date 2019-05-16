## [Demo Basic](https://wya-team.github.io/wya-vc/dist/page/basic.html)
## 功能
分页

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
current | 当前页码，支持 .sync 修饰符 | Number | 1
total | 数据总页数 | Number | 0
count | 数据总数 | Number | 0
page-size | 每页条数 | Number | 10
page-size-opts | 每页条数切换的配置 | Array | [10, 20, 30, 40]
placement | 条数切换弹窗的展开方向，可选值为 `bottom` 和 `top` | String | bottom
show-count | 显示总数 | Boolean | false
show-elevator | 显示电梯，可以快速切换到某一页 | Boolean | false
show-sizer | 显示分页，用来改变`page-size` | Boolean | false
portal | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | Boolean | true

#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
change | 页码改变的回调，返回改变后的页码	 | `page: String`| -
page-size-change | 切换每页条数时的回调，返回切换后的每页条数		 | `pageSize: String`| -

#### Slot

属性 | 说明
---|---
无 | 自定义显示总数的内容


## 基础用法

```vue
<template>
	<vc-page
		:current.sync="current"
		:count="100" 
		:total="100" 
		show-count 
		show-elevator 
		show-sizer 
	/>
</template>
<script>
import Page from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-page': Page
	},
	data() {
		return {
			current: 3,
		};
	},
	computed: {
		
	},
	updated() {
		console.log(this.current);
	},
	methods: {
	}
};
</script>

```