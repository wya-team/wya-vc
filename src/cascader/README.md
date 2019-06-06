## [Demo Basic](https://wya-team.github.io/wya-vc/dist/cascader/basic.html)
## 功能
级联选择

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
data-source | 可选项的数据源，格式参照示例说明 | Array | []
value | 当前已选项的数据，格式参照示例说明 | Array | []
formatter | 选择后展示的函数，用于自定义显示格式 | Function | label => label.join(' / ')
disabled | 是否禁用选择器 | Boolean | false
clearable | 是否支持清除 | Boolean | true
placeholder | 输入框占位符 | String | 请选择
trigger | 次级菜单展开方式，可选值为 click 或 hover | String | click
load-data | 动态获取数据，数据源需标识 loading | Function | -
element-id | 给表单元素设置 id，详见`vc-form`用法 | String | -
extra | 占位符 | `String` | -
changeOnSelect | 每次都触发change事件还是最后一次 | `Boolean` | false

#### TODO

属性 | 说明 | 类型 | 默认值
---|---|---|---
size | 输入框大小，可选值为large和small或者不填 | String | -
search | 是否支持搜索 | Boolean | false
not-found | 当搜索列表为空时显示的内容 | `String,Function` | 无匹配数据

#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
change | 选择完成后的回调 | (value: Array, label: Array) | -
clear | 点击清空按钮时触发	 | - | -
visible-change | visible改变时回调 | - | - 
close | 关闭时回调 | - | - 
ready | 弹层出来时回调 | -

## 基础用法

```vue
<template>
	<vc-cascader :data-source="data" v-model="value1"/>
</template>
```

## TODO

1. 第一次选中，第二次hover, 第三次hover直接修改了value（同步了，未触发sync函数，待排查）