## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/collapse/basic.html)
## 功能
折叠板

## API

#### 属性

#### collapse
属性 | 说明 | 类型 | 默认值
---|---|---|---
accordion | 是否开启手风琴模式，开启后每次至多展开一个面板 | `Boolean` | `false`
value | 当前激活的面板的 `name`，可以使用 `v-model` 双向绑定 | `Array | string` | -


#### collapse-item
属性 | 说明 | 类型 | 默认值
---|---|---|---
name | 当前面板的 `name`，与 `Collapse` 的 `value` 对应，不填为索引值 | `string` | -


#### 事件

#### collapse
属性 | 说明 | 类型 | 默认值
---|---|---|---
@change | 切换面板时触发，返回当前已展开的面板的 key，格式为数组 | (valye: Array) | -



## 基础用法

```html
<template>
	<vc-collapse class="v-collapse" value="1" accordion>
		<vc-collapse-item name="1" class="item">
			<div class="_title">
				title
			</div>
			<span slot="icon" slot-scope="it" class="_icon">
				{{ it.isExpend }}
			</span>
			<div slot="content" class="_content">
				content
			</div>
		</vc-collapse-item>
		<vc-collapse-item name="2" class="item">
			<div class="_title">
				title
			</div>
			<div slot="content" class="_content">
				content
			</div>
		</vc-collapse-item>
	</vc-collapse>
</template>

<script>
import Collapse from '..';

export default {
	name: "vc-collapse-basic",
	components: {
		"vc-collapse": Collapse,
		"vc-collapse-item": Collapse.Item
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleShow() {

		}
	}
};
</script>

<style lang="scss" scoped>
.v-collapse {
	.item {
		._title {
			height: 36px; 
			line-height: 36px; 
			background: #e4e4e4;
			font-size: 18px;
			padding: 0 10px
		}
		._icon {
			position: absolute;
			right: 10px;
			top: 0;
			bottom: 0;
			margin: auto 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		._content {
			height: 100px;
			padding: 20px;
			background: #e98252
		} 
	}
}
</style>
```