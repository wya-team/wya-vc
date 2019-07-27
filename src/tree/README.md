## [Demo Basic](https://wya-team.github.io/wya-vc/dist/tree/basic.html)
## 功能
树选择

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
data-scource | 展示数据 | array | —
empty-text | 内容为空的时候展示的文本 | String | — 
tree-props | 配置选项，具体看下表 | object | —
render-after-expand | 是否在第一次展开某个树节点后才渲染其子节点 | boolean | true 
load-data | 加载子树数据的方法，仅当 lazy 属性为true 时生效 | function(node, resolve) | —
render-content | 树节点的内容区的渲染 Function | Function(h, { it, node } | —
highlight-current | 是否高亮当前选中节点，默认值是 false。 | boolean | false 
default-expand-all | 是否默认展开所有节点 | boolean | false 
expand-on-click-node | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 | boolean | true 
check-on-click-node | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。 | boolean | false 
auto-expand-parent | 展开子节点的时候是否自动展开父节点 | boolean | true 
default-expanded-keys | 默认展开的节点的 key 的数组 | array | —
show-checkbox | 节点是否可被选择 | boolean | false 
check-strictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false | boolean | false 
default-checked-keys | 默认勾选的节点的 key 的数组 | array | —
current-node-key | 当前选中的节点 | string, number | —
filter-node | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏 | Function(value, it, node) | —
accordion | 是否每次只打开一个同级树节点展开 | boolean | false 
indent | 相邻级节点间的水平缩进，单位为像素 | number | — | 16 
icon-class-name | 自定义树节点的图标 | string | - | - 
lazy | 是否懒加载子节点，需与 load 方法结合使用 | boolean | false 
draggable | 是否开启拖拽节点功能 | boolean | false 
allow-drag | 判断节点能否被拖拽 | Function(node) | —
allow-drop | 拖拽时判定目标节点能否被放置。`type` 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后 | Function(draggingNode, dropNode, type) | —

> data -> data-source

#### tree-props

属性 | 说明 | 参数 | 返回值
---|---|---|---
label | 指定节点标签为节点对象的某个属性值 | string, function(it, node) | — 
value | 指定节点标签为节点对象的某个属性值 | string | — 
children | 指定子树为节点对象的某个属性值 | string | — 
disabled | 指定节点选择框是否禁用为节点对象的某个属性值 | boolean, function(it, node) | — 
isLeaf | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | boolean, function(it, node) | — 

#### 方法

属性 | 说明 | 参数 | 返回值
---|---|---|---
filter | 对树节点进行筛选操作 | 接收一个任意类型的参数，该参数会在 filter-node 中作为第一个参数 | - | -
updateKeyChildren | 通过 keys 设置节点子元素，使用此方法必须设置 node-key 属性 | (key, data) 接收两个参数，1. 节点 key 2. 节点数据的数组 | - | -
getCheckedNodes | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点所组成的数组 | (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 `false` 2. 是否包含半选节点，默认值为 `false` | - | -
setCheckedNodes | 设置目前勾选的节点，使用此方法必须设置 node-key 属性 | (nodes) 接收勾选节点数据的数组 | - | -
getCheckedKeys | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点的 key 所组成的数组 | (leafOnly) 接收一个 boolean 类型的参数，若为 `true` 则仅返回被选中的叶子节点的 keys，默认值为 `false` | - | -
setCheckedKeys | 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性 | (keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 `true` 则仅设置叶子节点的选中状态，默认值为 `false` | - | -
setChecked | 通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性 | (key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否选中  3. boolean 类型，是否设置子节点 ，默认为 false | - | -
getHalfCheckedNodes | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点所组成的数组 | - | - | -
getHalfCheckedKeys | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点的 key 所组成的数组 | - | - | -
getCurrentKey | 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null | — | - | -
getCurrentNode | 获取当前被选中节点的 data，若没有节点被选中则返回 null | — | - | -
setCurrentKey | 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性 | (key) 待被选节点的 key，若为 null 则取消当前高亮的节点 | - | -
setCurrentNode | 通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性 | (node) 待被选节点的 node | - | -
getNode | 根据 data 或者 key 拿到 Tree 组件中的 node | (data) 要获得 node 的 key 或者 data | - | -
remove | 删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性 | (data) 要删除的节点的 data 或者 node | - | -
append | 为 Tree 中的一个节点追加一个子节点 | (data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node | - | -
insertBefore | 为 Tree 的一个节点的前面增加一个节点 | (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node | - | -
insertAfter | 为 Tree 的一个节点的后面增加一个节点 | (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node | - | -

#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
node-click | 节点被点击时的回调 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 | - | -
node-contextmenu | 当某一节点被鼠标右键点击时会触发该事件 | 共四个参数，依次为：event、传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 | - | -
check-change | 节点选中状态发生变化时的回调 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点 | - | -
check | 当复选框被点击的时候触发 | 共两个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性 | - | -
current-change | 当前选中节点变化时触发的事件 | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象 | - | -
node-expand | 节点被展开时触发的事件 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 | - | -
node-collapse | 节点被关闭时触发的事件 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 | - | -
node-drag-start | 节点开始拖拽时触发的事件 | 共两个参数，依次为：被拖拽节点对应的 Node、event | - | -
node-drag-enter | 拖拽进入其他节点时触发的事件 | 共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event | - | -
node-drag-leave | 拖拽离开某个节点时触发的事件 | 共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event | - | -
node-drag-over | 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件） | 共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event | - | -
node-drag-end | 拖拽结束时（可能未成功）触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event | - | -
node-drop | 拖拽成功完成时触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event | - | -



## 基础用法

```jsx

```