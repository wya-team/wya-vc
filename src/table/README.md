## [Demo Basic](https://wya-team.github.io/wya-vc/dist/__tpl__/basic.html)
## 功能
表格

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
data-source | 显示的数据 | Array | - 
height | Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。 | String/Number | - 
max-height | Table 的最大高度 | String/Number | - 
stripe | 是否为斑马纹 table | Boolean | false
border | 是否带有纵向边框 | Boolean | false 
size | Table 的尺寸 | string | medium / small / mini
fit | 列的宽度是否自撑开 | Boolean | true 
show-header | 是否显示表头 | Boolean | true 
highlight-current-row | 是否要高亮当前行 | Boolean | false 
current-row-key | 当前行的 key，只写属性 | String, Number | - 
row-class-name | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。 | Function({row, rowIndex}), String | - 
row-style | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。 | Function({row, rowIndex}), Object | - 
cell-class-name | 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。 | Function({row, column, rowIndex, columnIndex}), String | - 
cell-style | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。 | Function({row, column, rowIndex, columnIndex}), Object | - 
header-row-class-name | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。 | Function({row, rowIndex}), String | - 
header-row-style | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。 | Function({row, rowIndex}), Object | - 
header-cell-class-name | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。 | Function({row, column, rowIndex, columnIndex}), String | - 
header-cell-style | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。 | Function({row, column, rowIndex, columnIndex}), Object | - 
row-key | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的。类型为 String 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | Function(row), String | - 
empty-text | 空数据时显示的文本内容，也可以通过 `slot="empty"` 设置 | String | 暂无数据 
default-expand-all | 是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效 | Boolean | false 
expand-row-keys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。 | Array | - 
show-summary | 是否在表尾显示合计行 | Boolean | false 
sum-text | 合计行第一列的文本 | String | 合计 
get-summary | 自定义的合计计算方法 | Function({ columns, data }) | - 
get-span | 合并行或列的计算方法 | Function({ row, column, rowIndex, columnIndex }) | - 
select-on-indeterminate | 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行 | Boolean | true 

> data -> data-source

#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row | -
select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection | -
selection-change | 当选择项发生变化时会触发该事件 | selection | -
cell-mouse-enter | 当单元格 hover 进入时会触发该事件 | row, column, cell, event | -
cell-mouse-leave | 当单元格 hover 退出时会触发该事件 | row, column, cell, event | -
cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event | -
cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event | -
row-click | 当某一行被点击时会触发该事件 | row, column, event | -
row-contextmenu | 当某一行被鼠标右键点击时会触发该事件 | row, column, event | -
row-dblclick | 当某一行被双击时会触发该事件 | row, column, event | -
header-click | 当某一列的表头被点击时会触发该事件 | column, event | -
header-contextmenu | 当某一列的表头被鼠标右键点击时触发该事件 | column, event | -
current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow | -
header-dragend | 当拖动表头改变了列的宽度的时候会触发该事件 | newWidth, oldWidth, column, event | -
expand-change | 当用户对某一行展开或者关闭的时候会触发该事件 | row, expandedRows | -

#### 方法

属性 | 说明 | 参数 | 返回值
---|---|---|---
clearSelection | 用于多选表格，清空用户的选择 | —
toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） | row, selected, emitChange
toggleAllSelection | 用于多选表格，切换所有行的选中状态 | -
toggleRowExpansion | 用于可展开表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开） | row, expanded
setCurrentRow | 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。 | row
refreshLayout | 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法 | —

#### Slot

属性 | 说明
---|---
append | 插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。

#### Column 属性
属性 | 说明
---|---
type | 对应列的类型。如果设置了 `selection` 则显示多选框；如果设置了 `index` 则显示该行的索引（从 1 开始计算）；如果设置了 `expand` 则显示为一个可展开的按钮 | string | selection/index/expand
index | 如果设置了 `type=index`，可以通过传递 `index` 属性来自定义索引 | number, Function(index) | -
column-key | column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 | string | — 
label | 显示的标题 | string | — 
prop | 对应列内容的字段名 | string | — 
width | 对应列的宽度 | string | — 
min-width | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | string | — 
fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean | true, left, right | —
render-header | 列标题 Label 区域渲染使用的 Function | Function(h, { column, $index }) | — 
resizable | 对应列是否可以通过拖动改变宽度（需要在 vc-table 上设置 border 属性为真） | boolean | true
formatter | 用来格式化内容 | Function({ row, column, cellValue, $index }) | — 
show-popover | 当内容过长被隐藏时显示 popover | Boolean | false
align | 对齐方式 | String | left/center/right | left
header-align | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | String | left/center/right | —
class-name | 列的 className | string | — 
labvc-class-name | 当前列标题的自定义类名 | string | — 
selectable | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | Function(row, index) | — 
reserve-selection | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 `row-key`） | Boolean | false


#### Column Slot

属性 | 说明
---|---
— | 自定义列的内容，参数为 { row, column, $index }
header | 自定义表头的内容. 参数为 { column, $index }



## 基础用法

```vue
<template>
	<div style="padding: 30px">
		<h1>Basic</h1>
		<vc-table :data-source="dataSource">
			<vc-table-item>
				<vc-table-column
					prop="date"
					label="日期"
					min-width="180"
				/>
				<vc-table-column
					prop="name"
					label="姓名"
					width="180"/>
				<vc-table-column
					prop="address"
					label="地址"
					width="880"
				/>
			</vc-table-item>
		</vc-table>
	</div>
</template>

<script>
import Table from '..';

export default {
	components: {
		'vc-table': Table,
		'vc-table-column': Table.Column,
		'vc-table-item': Table.Item
	},
	data() {
		return {
			dataSource: [
				{
					id: 1,
					date: '2016-05-02',
					name: '王小虎',
					address: '浙江省杭州市拱墅区祥符街道',
				}, 
				{
					id: 2,
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
				}, 
				{
					id: 3,
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					id: 4,
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			]
		};
	},
	methods: {}
};
</script>
```