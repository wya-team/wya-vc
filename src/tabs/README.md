## 标签页（tabs）

### 基础用法

:::RUNTIME
```html
<template>
	<div class="v-tabs-basic">
		<vc-tabs
			v-model="value"
		>
			<vc-tabs-pane label="标签一">
				<div v-for="item in list" :key="item">
					<div>标签一的内容</div>
					<div>标签一的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane label="标签二">
				<div v-for="item in list" :key="item">
					<div>标签二的内容</div>
					<div>标签二的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane label="标签三">
				<div v-for="item in list" :key="item">
					<div>标签三的内容</div>
					<div>标签三的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane label="标签四">
				<div v-for="item in list" :key="item">
					<div>标签四的内容</div>
					<div>标签四的内容</div>
				</div>
			</vc-tabs-pane>
		</vc-tabs>
	</div>
</template>

<script>
import { Tabs } from '@wya/vc';
export default {
	components: {
		"vc-tabs": Tabs,
		"vc-tabs-pane": Tabs.Pane
	},
	data() {
		return {
			value: 0,
			list: Array.from({ length: 2 }, (_, i) => i)
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

### 卡片化

:::RUNTIME
```html
<template>
	<div class="v-tabs-card">
		<vc-tabs
			v-model="value"
			type="card"
		>
			<vc-tabs-pane label="标签一">
				<div v-for="item in list" :key="item">
					<div>标签一的内容</div>
					<div>标签一的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane label="标签二">
				<div v-for="item in list" :key="item">
					<div>标签二的内容</div>
					<div>标签二的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane label="标签三">
				<div v-for="item in list" :key="item">
					<div>标签三的内容</div>
					<div>标签三的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane label="标签四">
				<div v-for="item in list" :key="item">
					<div>标签四的内容</div>
					<div>标签四的内容</div>
				</div>
			</vc-tabs-pane>
		</vc-tabs>
	</div>
</template>

<script>
import { Tabs } from '@wya/vc';
export default {
	components: {
		"vc-tabs": Tabs,
		"vc-tabs-pane": Tabs.Pane
	},
	data() {
		return {
			value: 0,
			list: Array.from({ length: 2 }, (_, i) => i)
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

### 可关闭标签
目前存在bug

:::RUNTIME
```html
<template>
	<div class="v-tabs-closable">
		<vc-tabs
			v-model="value"
			type="card"
			closable
		>
			<vc-tabs-pane label="标签一">
				<div v-for="item in list" :key="item">
					<div>标签一的内容</div>
					<div>标签一的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane label="标签二">
				<div v-for="item in list" :key="item">
					<div>标签二的内容</div>
					<div>标签二的内容</div>
				</div>
			</vc-tabs-pane>
		</vc-tabs>
	</div>
</template>

<script>
import { Tabs, Icon } from '@wya/vc';
export default {
	components: {
		"vc-tabs": Tabs,
		"vc-tabs-pane": Tabs.Pane,
		"vc-icon": Icon
	},
	data() {
		return {
			value: 0,
			list: Array.from({ length: 2 }, (_, i) => i)
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


### 自定义标签页

:::RUNTIME
```html
<template>
	<div class="v-tabs-render">
		<vc-tabs
			v-model="value"
			type="card"
			closable
		>
			<vc-tabs-pane :label="renderLabel">
				<div v-for="item in list" :key="item">
					<div>标签一的内容</div>
					<div>标签一的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane label="标签二">
				<div v-for="item in list" :key="item">
					<div>标签二的内容</div>
					<div>标签二的内容</div>
				</div>
			</vc-tabs-pane>
		</vc-tabs>
	</div>
</template>

<script>
import { Tabs, Icon } from '@wya/vc';
export default {
	components: {
		"vc-tabs": Tabs,
		"vc-tabs-pane": Tabs.Pane,
		"vc-icon": Icon
	},
	data() {
		return {
			value: 1,
			list: Array.from({ length: 2 }, (_, i) => i)
		}
	},
	mounted() {
	},
	methods: {
		renderLabel() {
			return (
				<div>
					<vc-icon
						type="success"
						class="_render-icon"
						style={
							{
								color: this.value === 0 ? '#5495f6' : '#666',
								'font-size': '12px',
								'margin-right': '5px'
							}
						}
					/>
					<span>标签一</span>
				</div>
			)
		}
	}
};
</script>
<style>
.v-tabs-render .vc-tabs__item:hover ._render-icon{
	color: #5495f6 !important;
}
</style>
```
:::

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据 | `string` | 默认为第一项的 name
type | 页签的基本样式，可选值为 `line` 和 `card` | `string` | line
size | 尺寸，可选值为 `default` 和 `small`，仅在 `type="line"` 时有效 | `string` | default
closable | 是否可以关闭页签，仅在 `type="card"` 时有效 | `boolean` | false
animated | 是否使用 CSS3 动画 | `boolean` | true
name | 当嵌套使用 Tabs，指定 name 区分层级 | `string` | -
average | navbar 是否均分 | `boolean` | true
showAfloat | 是否显示下划线 | `boolean` | true


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
click | tab 被点击时触发	 | `name`|---

#### Slot

属性 | 说明
---|---
extra | 附加内容

#### Pane 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
name | 用于标识当前面板，对应 value，默认为其索引值 | `string` | -
label | 选项卡头显示文字，支持 Render 函数。 | `string`、`function` | 空
icon | 选项卡图标 | `string` | -
disabled | 是否禁用该选项卡 | `boolean` | false
closable | 是否可以关闭页签，仅在 `type="card"` 时有效 | `boolean` | null
tab | 当嵌套使用 Tabs，设置该属性指向对应 Tabs 的 name 字段 | `string` | -
index | 在 TabPane 使用 v-if 时，并不会按照预先的顺序渲染，这时可设置 index，并从小到大排序(需大于 0) | `number` | -


## TODO

1. 移动端使用touch处理滚动
2. 初始话带动画时，第一次不设置动画
