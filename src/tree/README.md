## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/tree/basic.html)
## 功能
tpl

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
data | 可嵌套的节点属性的数组，生成 tree 的数据 | Array | []
multiple | 是否支持多选 | Boolean | false
show-checkbox | 是否显示多选框 | Boolean | false
empty-text | 没有数据时的提示 | String | 暂无数据
load-data | 异步加载数据的方法，见示例 | Function | -
render | 自定义渲染内容，见示例 | Function | -
children-key | 定义子节点键 | String | children
check-strictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 | Boolean | false
check-directly 3.3.0 | 开启后，在 show-checkbox 模式下，select 的交互也将转为 check | Boolean | false


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
select-change | 点击树节点时触发 | `当前已选中的节点数组、当前项`| ---
check-change | 点击复选框时触发	 | `当前已勾选节点的数组、当前项`| ---
toggle-expand | 展开和收起子列表时触发	 | `当前节点的数据`| ---

#### 方法

属性 | 说明 | 参数 | 返回值
---|---|---|---
getCheckedNodes | 获取被勾选的节点	 | `-`| ---
getSelectedNodes | 获取被选中的节点		 | `-`| ---
getCheckedAndIndeterminateNodes | 获取选中及半选节点| `-`| ---

#### children

属性 | 说明 | 类型 | 默认值
---|---|---|---
title | 标题 | String  |  Element String | -
expand | 是否展开直子节点 | Boolean | false
disabled | 禁掉响应 | Boolean | false
disableCheckbox | 禁掉 checkbox | Boolean | false
selected | 是否选中子节点 | Boolean | false
checked | 是否勾选(如果勾选，子节点也会全部勾选) | Boolean | false
children | 子节点属性数组 | Array | -
render | 自定义当前节点渲染内容，见示例 | Function | -



## 基础用法

```jsx

```