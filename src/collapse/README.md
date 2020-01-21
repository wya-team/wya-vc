## 折叠板（collapse）
### 基础用法

:::RUNTIME
```html
<template>
	<div class="v-collapse-basic">
		<vc-collapse class="v-collapse" v-model="value" accordion>
			<vc-collapse-item name="2" class="item">
				<div class="_title">
					{{ value.includes('2') ? '点我收起' : '点我展开' }}
				</div>
				<div slot="content" class="_content">
					内容
				</div>
			</vc-collapse-item>
		</vc-collapse>
	</div>
</template>

<script>
import { Collapse } from '@wya/vc';
export default {
	components: {
		"vc-collapse": Collapse,
		"vc-collapse-item": Collapse.Item
	},
	data() {
		return {
			value: '1'
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>

</style>
```
:::

### 展开
展开方式

:::RUNTIME
```html
<template>
	<div class="v-collapse-accordion">
		<vc-collapse class="v-collapse" v-model="value1" accordion>
			<vc-collapse-item name="2" class="item">
				<div class="_title">
					{{ value1.includes('2') ? '点我收起' : '点我展开' }}
				</div>
				<div slot="content" class="_content">
					内容2
				</div>
			</vc-collapse-item>
			<vc-collapse-item name="3" class="item">
				<div class="_title">
					{{ value1.includes('3') ? '点我收起' : '点我展开' }}
				</div>
				<div slot="content" class="_content">
					内容3
				</div>
			</vc-collapse-item>
		</vc-collapse>
		<br/>
		<br/>
		<vc-collapse class="v-collapse" v-model="value2">
			<vc-collapse-item name="2" class="item">
				<div class="_title">
					{{ value2.includes('2') ? '点我收起' : '点我展开' }}
				</div>
				<div slot="content" class="_content">
					内容4
				</div>
			</vc-collapse-item>
			<vc-collapse-item name="3 " class="item">
				<div class="_title">
					{{ value2.includes('3') ? '点我收起' : '点我展开' }}
				</div>
				<div slot="content" class="_content">
					内容5
				</div>
			</vc-collapse-item>
		</vc-collapse>
	</div>
</template>

<script>
import { Collapse } from '@wya/vc';
export default {
	components: {
		"vc-collapse": Collapse,
		"vc-collapse-item": Collapse.Item
	},
	data() {
		return {
			value1: '1',
			value2: '1'
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>

</style>
```
:::

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
