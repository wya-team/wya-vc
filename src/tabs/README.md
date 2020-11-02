## 标签页（Tabs）
选项卡切换组件

### 何时使用
提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

### 基础用法
基础的、简洁的标签页。

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
	}
};
</script>
```
:::

### 卡片化
设置 `type` 属性为 `card` 就可以使选项卡改变为卡片风格。

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
	}
};
</script>
```
:::

### 可关闭标签
添加`closable`可关闭某一项，仅在 `type` 为 `card` 时有效。需结合 `@tab-remove` 事件手动关闭标签页，关闭前调用 `before-remove`
，返回 Promise 可阻止标签关闭。

:::RUNTIME
```html
<template>
	<div class="v-tabs-closable">
		<vc-tabs
			v-model="value"
			type="card"
			:before-remove="handleBeforeRemove"
			closable
			@tab-remove="handleRemove"
		>
			<vc-tabs-pane v-if="tab1" label="标签一">
				<div v-for="item in list" :key="item">
					<div>标签一的内容</div>
					<div>标签一的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane v-if="tab2" label="标签二">
				<div v-for="item in list" :key="item">
					<div>标签二的内容</div>
					<div>标签二的内容</div>
				</div>
			</vc-tabs-pane>
			<vc-tabs-pane v-if="tab3" label="标签三">
				<div v-for="item in list" :key="item">
					<div>标签三的内容</div>
					<div>标签三的内容</div>
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
			list: Array.from({ length: 2 }, (_, i) => i),
			tab1: true,
			tab2: true,
			tab3: true
		}
	},
	methods: {
		handleRemove(name) {
			this['tab' + name] = false;
		},
		handleBeforeRemove(name) {
			return new Promise((resolve, reject) => {
				if (name >= 1) {
					resolve('resolve');
				} else {
					reject('reject');
				}
			});
		},
	}
};
</script>
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
					<span>我是自定义的标签</span>
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

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据 | `String`、`Number` | - | 默认为第一项的 `name`
type | 页签的基本样式 | `String` | `line`、 `card` | `line`
size | 尺寸，仅在 `type="line"` 时有效 | `String` | `default`、`small` | `default`
closable | 是否可以关闭页签，仅在 `type="card"` 时有效 | `Boolean` | - | `false`
animated | 是否使用 CSS3 动画 | `Boolean` | - | `true`
name | 当嵌套使用 Tabs，指定 name 区分层级 | `String` | - | -
average | navbar 是否均分 | `Boolean` | - | `true`
showAfloat | 是否显示下划线 | `Boolean` | - | `true`
beforeRemove | 关闭前的函数，返回 `Promise` 可阻止标签关闭, 回调参数为当前`index` | `Function` | - | -
offsetTop | top的偏移值 | `Number` | - | 0
showStep | 是否在需要滚动时展示左右切换按钮，仅支持移动端 | `Boolean` | - | false

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
click | tab 被点击时触发 | `(name: String) => void 0`| `name`：点击的选项卡绑定的`name`值
change | tab 被点击时触发 | `(name: String) => void 0`| `name`：点击的选项卡绑定的`name`值
tab-remove | tab 被移除时触发 | `(name: String) => void 0`| `name`：移除的选项卡绑定的`name`值

### Slot
属性 | 说明
---|---
extra | 附加内容
prepend | tab-bar前缀
append | tab-bar后缀

### Pane 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
name | 用于标识当前面板，对应 value，默认为其索引值 | `String` | - | -
label | 选项卡头显示文字，支持 Render 函数。 | `String`、`Function` | - | -
lazy | 标签是否延迟渲染 | 是否可以关闭页签，仅在 `type="card"` 时有效 | `Boolean` | - | `null`
closable | 是否可以关闭页签，仅在 type="card" 时有效

## TODO
1. 移动端使用touch处理滚动
2. 初始话带动画时，第一次不设置动画
