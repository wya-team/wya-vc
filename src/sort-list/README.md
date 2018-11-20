## [Demo Basic](https://wya-team.github.io/wya-vc/dist/sort-list/basic.html)
## 功能
1. 使元素可拖拽
2. 点击按钮可左右移动
3. 点击删除可移除元素

## 待开发
- 去掉dnd事件，兼容移动端

## API

#### 属性

属性         | 说明        | 类型        | 默认值  |
---------- | --------- | --------- | ---- |
v-model | 必填，数据源    | `array`   |      |
mask      | 容器样式      | `object`  |      |

属性 | 说明 | 类型 | 默认值
---|---|---|---
v-model  | 数据源 | `array` | []
mask  | 是否显示遮罩层 | `bool` | true
primaryKey  | 数据源唯一key值 | `string,number` | true

#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
`@change` | 数据改变后的回调 | `func` | -



## 基础用法

```vue
<template>
	<div>
		<vc-sort-list v-model="dataSource">
			<div 
				slot-scope="it" 
				:style="{ background: `#ff33${it.id}${it.id}` }"
				style="width: 200px;line-height: 5; color: white"
			>
				{{ it.id }}
			</div>
		</vc-sort-list>
		<button @click="handleAdd">添加</button>
		<button @click="handleDel">删除第一个</button>
		<button @click="handleShuffle">乱序</button>
	</div>
</template>
<script>
import _ from 'lodash';
import { SortList } from 'wya-vc';

let count = 0;
export default {
	name: "vc-sort-list-basic",
	components: {
		'vc-sort-list': SortList
	},
	data() {
		return {
			dataSource: Array.from({ length: 5 }, () => ({ id: `${count++}` }))
		};
	},
	computed: {
		
	},
	methods: {
		handleAdd() {
			this.dataSource.push({ id: `${count++}` });
		},
		handleDel() {
			this.dataSource.shift();
		},
		handleShuffle() {
			this.dataSource = _.shuffle(this.dataSource);
		}
	}
};
</script>

```