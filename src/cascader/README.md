## 级联选择器（Cascader）
当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

### 何时使用
- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

### 基础用法
有两种触发子菜单的方式

:::RUNTIME
```html
<template>
	<div class="v-cascader">
		<div style="margin-right: 50px;">
			<p style="text-align: center;">默认click触发子菜单</p>	
			<vc-cascader 
				v-model="value" 
				:data-source="dataSource" />
		</div>
		<div>
			<p style="text-align: center;">hover 触发子菜单</p>	
			<vc-cascader 
				v-model="value" 
				:data-source="dataSource"
				trigger="hover" />
		</div>	
	</div>
</template>
<script>
import { Cascader } from '@wya/vc';

export default {
	name: "vc-cascader-basic",
	components: {
		"vc-cascader": Cascader,
	},
	data() {
		return {
			value: [],
			dataSource: [
				{
					value: 'beijing',
					label: '北京',
					children: [
						{
							value: 'gugong',
							label: '故宫'
						},
						{
							value: 'tiantan',
							label: '天坛'
						},
						{
							value: 'wangfujing',
							label: '王府井'
						}
					]
				}, 
				{
					value: 'jiangsu',
					label: '江苏',
					children: [
						{
							value: 'nanjing',
							label: '南京',
							children: [
								{
									value: 'fuzimiao',
									label: '夫子庙',
								}
							]
						},
						{
							value: 'suzhou',
							label: '苏州'
						}
					],
				}
			],
		};
	},
};
</script>
<style>
.v-cascader {
	margin: 10px; 
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
```
:::

### 动态加载
当选中某一级时，动态加载该级下的选项。

:::RUNTIME
```html
<template>
	<div>
		<vc-cascader 
			style="width: 200px;"
			v-model="value" 
			:data-source="dataSource" 
			:load-data="loadData"/>
	</div>
</template>
<script>
import { Cascader } from '@wya/vc';

export default {
	name: "vc-cascader-basic",
	components: {
		"vc-cascader": Cascader,
	},
	data() {
		return {
			value: [],
			dataSource: [
				{
					value: 'beijing',
					label: '北京',
					children: []
				}
			],
		};
	},
	methods: {
		loadData() {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve([
						{
							value: 'gugong',
							label: '故宫'
						},
						{
							value: 'tiantan',
							label: '天坛'
						},
						{
							value: 'wangfujing',
							label: '王府井'
						}
					]);
				}, 2000);
			});
		},
	}
};
</script>
```
:::

### 可清空
通过 `clearable` 设置输入框可清空

:::RUNTIME
```html
<template>
	<div>
		<vc-cascader 
			style="width: 200px;"
			v-model="value" 
			:data-source="dataSource"
			clearable />
	</div>
</template>
<script>
import { Cascader } from '@wya/vc';
import bigData from './examples/basic/big-data';

export default {
	name: "vc-cascader-basic",
	components: {
		"vc-cascader": Cascader,
	},
	data() {
		return {
			value: [],
			dataSource: [
				{
					value: 'beijing',
					label: '北京',
					children: [
						{
							value: 'gugong',
							label: '故宫'
						},
						{
							value: 'tiantan',
							label: '天坛'
						},
						{
							value: 'wangfujing',
							label: '王府井'
						}
					]
				}, 
				{
					value: 'jiangsu',
					label: '江苏',
					children: [
						{
							value: 'nanjing',
							label: '南京',
							children: [
								{
									value: 'fuzimiao',
									label: '夫子庙',
								}
							]
						},
						{
							value: 'suzhou',
							label: '苏州'
						}
					],
				}
			],
		};
	},
};
</script>
<style>
```
:::

### 自定义显示
通过 `formatter`自定义输入框中显示选中项

:::RUNTIME
```html
<template>
	<div>
		<vc-cascader 
			style="width: 200px;"
			v-model="value" 
			:data-source="dataSource"
			:formatter="formatter" />
	</div>
</template>
<script>
import { Cascader } from '@wya/vc';

export default {
	name: "vc-cascader-basic",
	components: {
		"vc-cascader": Cascader,
	},
	data() {
		return {
			value: [],
			dataSource: [
				{
					value: 'beijing',
					label: '北京',
					children: [
						{
							value: 'gugong',
							label: '故宫'
						},
						{
							value: 'tiantan',
							label: '天坛'
						},
						{
							value: 'wangfujing',
							label: '王府井'
						}
					]
				}, 
				{
					value: 'jiangsu',
					label: '江苏',
					children: [
						{
							value: 'nanjing',
							label: '南京',
							children: [
								{
									value: 'fuzimiao',
									label: '夫子庙',
								}
							]
						},
						{
							value: 'suzhou',
							label: '苏州'
						}
					],
				}
			],
		};
	},
	methods: {
		formatter(v) {
			return v[v.length - 1];
		}
	}
};
</script>
```
:::

### 选择任意一级选项
通过 `changeOnSelect`你可以在任意一级选择

:::RUNTIME
```html
<template>
	<div>
		<vc-cascader 
			style="width: 200px;"
			v-model="value" 
			:data-source="dataSource"
			changeOnSelect />
	</div>
</template>
<script>
import { Cascader } from '@wya/vc';

export default {
	name: "vc-cascader-basic",
	components: {
		"vc-cascader": Cascader,
	},
	data() {
		return {
			value: [],
			dataSource: [
				{
					value: 'beijing',
					label: '北京',
					children: [
						{
							value: 'gugong',
							label: '故宫'
						},
						{
							value: 'tiantan',
							label: '天坛'
						},
						{
							value: 'wangfujing',
							label: '王府井'
						}
					]
				}, 
				{
					value: 'jiangsu',
					label: '江苏',
					children: [
						{
							value: 'nanjing',
							label: '南京',
							children: [
								{
									value: 'fuzimiao',
									label: '夫子庙',
								}
							]
						},
						{
							value: 'suzhou',
							label: '苏州'
						}
					],
				}
			],
		};
	},
	methods: {
		formatter(v) {
			return v[v.length - 1];
		}
	}
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
data-source | 可选项的数据源，格式参照示例说明 | `Array` | - | `[]`
value | 当前已选项的数据，格式参照示例说明 | `Array` | - | `[]`
formatter | 选择后展示的函数，用于自定义显示格式 | `Function` | - | `(label: String) => label.join(' / ')`
disabled | 是否禁用选择器 | `Boolean` | - | `false`
clearable | 是否支持清除 | `Boolean` | - | `true`
placeholder | 输入框占位符 | `String` | - | 请选择
trigger | 次级菜单展开方式 | `String` | `click`、`hover` | `click`
load-data | 动态获取数据，数据源需标识 loading | `Function` | - | -
element-id | 给表单元素设置 id，详见`vc-form`用法 | `String` | - | -
extra | 占位符 | `String` | - | -
changeOnSelect | 每次都触发change事件还是最后一次 | `Boolean` | - | `false`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
change | 选择完成后的回调 | `(value: Array, label: Array) => void 0` | `value`: 选择的数据; `label`: 当前选择数据的文本值
clear | 点击清空按钮时触发 | - | -
visible-change | visible改变时回调 | - | - 
close | 关闭时回调 | - | - 
ready | 弹层出来时回调 | - | - 


### TODO
属性 | 说明 | 类型 | 默认值
---|---|---|--- 
size | 输入框大小，可选值为large和small或者不填 | `String` | -
search | 是否支持搜索 | `Boolean` | `false`
not-found | 当搜索列表为空时显示的内容 | `String`; `Function` | 无匹配数据

## TODO
1. 第一次选中，第二次hover, 第三次hover直接修改了value（同步了，未触发sync函数，待排查）