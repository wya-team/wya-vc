## 折叠板（Collapse）
可以折叠/展开的内容区域。

### 何时使用
- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴`是一种特殊的折叠面板，只允许单个内容区域展开。

### 基础用法
可同时展开多个面板，面板之间不影响。

:::RUNTIME
```html
<template>
	<div class="v-collapse-basic">
		<vc-collapse class="v-collapse" v-model="value">
			<vc-collapse-item name="1" class="item">
				<div class="_title">
					{{ value.includes('1') ? '点我收起' : '点我展开' }}
				</div>
				<div slot="content" class="_content">
					连续7年专注为企业提供软件、培训、咨询等社交新零售解决方案的标杆品牌
				</div>
			</vc-collapse-item>
			<vc-collapse-item name="2" class="item">
				<div class="_title">
					{{ value.includes('2') ? '点我收起' : '点我展开' }}
				</div>
				<div slot="content" class="_content">
					经典的层级差价方案，多级代理结构,以层级差价为增长源动力
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
	}
};
</script>
<style>
.v-collapse-basic ._title {
	height: 38px;
    line-height: 38px;
    color: #666;
    cursor: pointer;
    position: relative;
	border-top: 1px solid #dcdee2;
    border-bottom: 1px solid transparent;
    transition: all .2s ease-in-out;
}
.v-collapse-basic ._content {
	padding-bottom: 12px;
}
</style>
```
:::

### 手风琴
通过设置`accordion`，每次只能展开一个面板。

:::RUNTIME
```html
<template>
	<div class="v-collapse-accordion">
		<vc-collapse class="v-collapse" v-model="value" accordion @change="handleChange">
			<vc-collapse-item name="1" class="item">
				<div class="_title">
					{{ value.includes('1') ? '点我收起' : '点我展开' }}
				</div>
				<div slot="content" class="_content">
					连续7年专注为企业提供软件、培训、咨询等社交新零售解决方案的标杆品牌
				</div>
			</vc-collapse-item>
			<vc-collapse-item name="2" class="item">
				<div class="_title">
					{{ value.includes('2') ? '点我收起' : '点我展开' }}
				</div>
				<div slot="content" class="_content">
					经典的层级差价方案，多级代理结构,以层级差价为增长源动力
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
			value: '1',
		}
	},
	methods: {
		handleChange(val) {
			console.log(val);
		}
	}
};
</script>
<style>
.v-collapse-accordion ._title {
	height: 38px;
    line-height: 38px;
    color: #666;
    cursor: pointer;
    position: relative;
	border-top: 1px solid #dcdee2;
    border-bottom: 1px solid transparent;
    transition: all .2s ease-in-out;
}
.v-collapse-accordion ._content {
	padding-bottom: 12px;
}
</style>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
accordion | 是否开启手风琴模式，开启后每次至多展开一个面板 | `Boolean` | - | `false`
value | 当前激活的面板(如果是手风琴模式，绑定值类型需要为`String`，否则为`Array`) | `Array`、`String` | - | -
tag | 外层标签 | `String`| - | `div`
remove | 收起后是否移除DOM节点 | `Boolean` | - | `false`

### collapse-item属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
name | 当前面板的 `name`，与 `Collapse` 的 `value` 对应，不填为索引值 | `String` | - | -
tag | 外层标签 | `String`| - | `div`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
change | 切换面板时触发，返回当前已展开的面板的 key，格式为数组 | `(value: Array) => void 0` | `value`：当前展开的面板`name`数组
