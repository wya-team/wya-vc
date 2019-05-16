## [Demo Basic](https://wya-team.github.io/wya-vc/dist/dropdown/basic.html)
## 功能
下拉菜单

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
trigger | 触发方式，可选值为 `hover`（悬停）`click`（点击）`contextMenu`（右键）`custom`（自定义），使用 custom 时，需配合 visible 一起使用 | String | hover
visible | 手动控制下拉框的显示，在 trigger = 'custom' 时使用 | Boolean | false
placement |  placement | 弹层的位置(`top` `left` `right` `bottom` `bottom-left` `bottom-right` `top-left` `top-right` `right-top` `right-bottom` `left-top` `left-bottom`) | String | bottom 
portal | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | Boolean | true
portal-class-name  | 开启 portal 时，给浮层添加额外的 class 名称 | String | -


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
click | 点击菜单项时触发 | name: String | -
visible-change | visible改变时回调 | - | - 
close | 关闭时回调 | - | - 
ready | 弹层出来时回调 | -

#### Slot

属性 | 说明
---|---
无|主体内容
list|列表内容，一般由 `DropdownMenu` 承担

#### Item 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
name | 用来标识这一项 | String | -
disabled | 禁用该项 | Boolean | false
divided | 显示分割线 | Boolean | false
selected | 标记该项为选中状态 | Boolean | false


## 基础用法

```vue
<template>
	<vc-dropdown 
		placement="bottom-end"
		@click="handleClick"
		@visible-change="handleChange"
	>
		<a href="javascript:void(0)">
			菜单(右)∨
		</a>
		<vc-dropdown-menu slot="list">
			<vc-dropdown-item name="1">驴打滚</vc-dropdown-item>
			<vc-dropdown-item name="2">炸酱面</vc-dropdown-item>
			<vc-dropdown-item name="3">豆汁儿</vc-dropdown-item>
			<vc-dropdown-item name="4">冰糖葫芦</vc-dropdown-item>
			<vc-dropdown-item name="5">北京烤鸭</vc-dropdown-item>
		</vc-dropdown-menu>
	</vc-dropdown>
</template>
<script>
import Dropdown from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-dropdown': Dropdown,
		'vc-dropdown-menu': Dropdown.Menu,
		'vc-dropdown-item': Dropdown.Item,
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick() {
			console.log('click', arguments[0]);
		},
		handleClickoutside() {
			console.log('visible-change', arguments[0]);
		},
		handleChange() {
			console.log('clickoutside', arguments[0]);
		}
	}
};
</script>

```