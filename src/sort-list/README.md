## 可拖拽排序列表（SortList）
拖拽排序

### 何时使用
一组内容需要进行无序的顺序调换时使用。
- 可拖拽
- 点击按钮可左右移动
- 点击删除可移除元素

## 基础用法

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

## 隐藏操作区域
通过设置`mask`隐藏操作区域。

:::RUNTIME
```html
<template>
	<div>
		<vc-sort-list v-model="dataSource" :mask="false">
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

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
dataSource | 数据源 | `Array` | - | -
tag | 外层标签 | `String` | | - `div`
valueKey | 主键 | `String`、`Number` | - | `id`
mask | 遮罩 | `Boolean` | - | `true`
draggable | 是否可拖拽 | `Boolean` | - | `true`
draggableKey | 拖拽的目标key | `String` | - | -

### 事件
事件名 | 说明 | 类型 | 参数
---|---|---|---
change | 数据改变 | `(value: Array) => void 0` | `value`：排序后的新数组值

### Slot
属性 | 说明
---|---
default | 默认插槽

## TODO
1. 去掉dnd事件，兼容移动端
