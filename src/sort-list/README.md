## 可拖拽排序列表（SortList）

## 基础用法
1. 可拖拽
2. 点击按钮可左右移动
3. 点击删除可移除元素

:::RUNTIME
```html
<template>
	<div>
		<vc-sort-list v-model="dataSource">
			<div
				slot-scope="{ it }"
				:style="{ background: `#ff33${it.id}${it.id}` }"
				style="width: 200px;line-height: 5; color: white"
			>
				{{ it.id }}
			</div>
		</vc-sort-list>
		<div style="margin-top: 50px; margin-left: 10px;">
			<vc-button @click="handleAdd">
				添加
			</vc-button>
			<vc-button @click="handleDel">
				删除第一个
			</vc-button>
			<vc-button @click="handleShuffle">
				乱序
			</vc-button>
		</div>
	</div>
</template>
<script>
import { SortList, Button } from '@wya/vc';

let count = 0;
export default {
	name: "vc-sort-list-basic",
	components: {
		'vc-sort-list': SortList,
		'vc-button': Button
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
			this.dataSource = this.dataSource.sort((a, b) => Math.random() - 0.5);
		}
	}
};
</script>
```
:::

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
dataSource | 数据源 | `array` | -
tag | 节点类型 | `string` | `div`
valueKey | 主键 | `string`、`number` | `id`
mask | 遮罩 | `boolean` | `true`
draggable | 是否可拖拽 | `boolean` | `true`


#### 事件

属性 | 说明 | 类型 | 参数
---|---|---|---
change | 数据改变 | - | `dataSource`

#### Slot

属性 | 说明
---|---
default | 默认插槽


## TODO
1. 去掉dnd事件，兼容移动端
