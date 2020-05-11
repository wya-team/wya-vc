## 下拉菜单（Dropdown）
将菜单折叠到下拉菜单里

### 何时使用
当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

### 基础用法
移动到菜单上，展开。

:::RUNTIME
```html
<template>
	<div class="v-dropdown-basic">
		<vc-dropdown
			v-model="visible"
			placement="bottom-left"
		>
			<div class="link">下拉菜单</div>
			<template #list>
				<vc-dropdown-menu>
					<vc-dropdown-item name="1">
						驴打滚
					</vc-dropdown-item>
					<vc-dropdown-item name="2">
						炸酱面
					</vc-dropdown-item>
					<vc-dropdown-item name="3">
						豆汁儿
					</vc-dropdown-item>
					<vc-dropdown-item name="4">
						臭豆腐
					</vc-dropdown-item>
				</vc-dropdown-menu>
			</template>
		</vc-dropdown>
	</div>
</template>
<script>
import { Dropdown } from '@wya/vc';

export default {
	components: {
		"vc-dropdown": Dropdown
	},
};
</script>
<style>
.v-dropdown-basic .link {
	cursor: pointer;
}
.v-dropdown-basic .link:hover {
	color: #409EFF;
}
</style>
```
:::

### 触发方式
配置`trigger`参数为`hover`触发或者`click`触发。

:::RUNTIME
```html
<template>
	<div class="v-dropdown-basic">
		<h2>默认hover触发</h2>
		<vc-dropdown
			v-model="visible"
			placement="bottom-left"
		>
			<div class="link">下拉菜单</div>
			<template #list>
				<vc-dropdown-menu>
					<vc-dropdown-item name="1">
						驴打滚
					</vc-dropdown-item>
					<vc-dropdown-item name="2">
						炸酱面
					</vc-dropdown-item>
					<vc-dropdown-item name="3">
						豆汁儿
					</vc-dropdown-item>
					<vc-dropdown-item name="4">
						臭豆腐
					</vc-dropdown-item>
				</vc-dropdown-menu>
			</template>
		</vc-dropdown>
		<h2>click触发</h2>
		<vc-dropdown
			v-model="visible2"
			placement="bottom-left"
			trigger="click"
		>
			<div class="link">下拉菜单</div>
			<template #list>
				<vc-dropdown-menu>
					<vc-dropdown-item name="1">
						驴打滚
					</vc-dropdown-item>
					<vc-dropdown-item name="2">
						炸酱面
					</vc-dropdown-item>
					<vc-dropdown-item name="3">
						豆汁儿
					</vc-dropdown-item>
					<vc-dropdown-item name="4">
						臭豆腐
					</vc-dropdown-item>
				</vc-dropdown-menu>
			</template>
		</vc-dropdown>
	</div>
</template>
<script>
import { Dropdown } from '@wya/vc';

export default {
	components: {
		"vc-dropdown": Dropdown
	},
	data() {
		return {
			visible: false,
			visible2: false
		}
	},
};
</script>
<style>
.v-dropdown-basic .link {
	cursor: pointer;
}
.v-dropdown-basic .link:hover {
	color: #409EFF;
}
</style>
```
:::

### 下拉菜单出现位置
配置placement。

:::RUNTIME
```html
<template>
	<div class="v-dropdown-basic">
		<div style="margin-bottom: 10px">
			<vc-button @click="handlePlacement('top')">top</vc-button>
			<vc-button @click="handlePlacement('left')">left</vc-button>
			<vc-button @click="handlePlacement('right')">right</vc-button>
			<vc-button @click="handlePlacement('bottom')">bottom</vc-button>
			<vc-button @click="handlePlacement('bottom-left')">bottom-left</vc-button>
			<vc-button @click="handlePlacement('bottom-right')">bottom-right</vc-button>
			<vc-button @click="handlePlacement('top-left')">top-left</vc-button>
			<vc-button @click="handlePlacement('top-right')">top-right</vc-button>
			<vc-button @click="handlePlacement('right-top')">right-top</vc-button>
			<vc-button @click="handlePlacement('right-bottom')">right-bottom</vc-button>
			<vc-button @click="handlePlacement('left-top')">left-top</vc-button>
			<vc-button @click="handlePlacement('left-bottom')">left-bottom</vc-button>
		</div>
		<vc-dropdown
			v-model="visible"
			:placement="palcement"
		>
			<div class="link">下拉菜单</div>
			<template #list>
				<vc-dropdown-menu>
					<vc-dropdown-item name="1">
						驴打滚
					</vc-dropdown-item>
					<vc-dropdown-item name="2">
						炸酱面
					</vc-dropdown-item>
					<vc-dropdown-item name="3">
						豆汁儿
					</vc-dropdown-item>
					<vc-dropdown-item name="4">
						臭豆腐
					</vc-dropdown-item>
				</vc-dropdown-menu>
			</template>
		</vc-dropdown>
	</div>
</template>
<script>
import { Dropdown, Button } from '@wya/vc';

export default {
	components: {
		"vc-dropdown": Dropdown,
		"vc-button": Button
	},
	data() {
		return {
			palcement: 'bottom'
		}
	},
	methods: {
		handlePlacement(val) {
			this.palcement = val;
		}
	}
};
</script>
<style>
.v-dropdown-basic .link {
	cursor: pointer;
}
.v-dropdown-basic .link:hover {
	color: #409EFF;
}
.v-dropdown-basic .vc-btn {
	margin-bottom: 10px;
}
</style>
```
:::

### 带三角指向的菜单
通过设置`arrow`添加三角指向。

:::RUNTIME
```html
<template>
	<div class="v-dropdown-basic">
		<vc-dropdown
			v-model="visible"
			placement="bottom-left"
			arrow
		>
			<div class="link">下拉菜单</div>
			<template #list>
				<vc-dropdown-menu>
					<vc-dropdown-item name="1" disabled>
						驴打滚（不可点击）
					</vc-dropdown-item>
					<vc-dropdown-item name="2" :closable="false">
						炸酱面（点击菜单不消失）
					</vc-dropdown-item>
					<vc-dropdown-item name="3" divided>
						豆汁儿（添加分割线）
					</vc-dropdown-item>
					<vc-dropdown-item name="4">
						臭豆腐
					</vc-dropdown-item>
				</vc-dropdown-menu>
			</template>
		</vc-dropdown>
	</div>
</template>
<script>
import { Dropdown } from '@wya/vc';

export default {
	components: {
		"vc-dropdown": Dropdown,
		"vc-dropdown-menu": Dropdown.Menu,
		"vc-dropdown-item": Dropdown.Item
	},
};
</script>
<style>
.v-dropdown-basic .link {
	cursor: pointer;
}
.v-dropdown-basic .link:hover {
	color: #409EFF;
}
</style>
```
:::

### API

### vc-dropdown属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
trigger | 触发方式 | `String` | 可选值为 `hover`（悬停）`click`（点击）`contextMenu`（右键）`custom`（自定义），使用 custom 时，需配合 `visible` 一起使用 | `hover`
arrow | 是否带三角指向 | `Boolean` | - | `false`
visible | 手动控制下拉框的显示，在 trigger = 'custom' 时使用 | `Boolean` | - |`false`
placement | 菜单弹出位置 | `String` | `top`、`left`、`right`、`bottom`、`bottom-left`、`bottom-right`、`top-left`、`top-right`、`right-top`、`right-bottom`、`left-top`、`left-bottom` | `bottom` 
portal-class-name  | 开启 portal 时，给浮层添加额外的 class 名称 | `String` | - |-

### vc-dropdown-item属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
name | 用来标识这一项 | `String` | - | -
disabled | 是否禁止选择 | `Boolean` | - | `false`
selected | 是否选中 | `Boolean` | - | `false`
closable | 是否点击后隐藏 | `Boolean` | - | `true`
divided | 是否需要分割线 | `Boolean` | - | `false`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
click | 点击菜单项时触发 | `(name: String) => void 0` | `name`：item的name
visible-change | visible改变时回调 | - | - 
close | 关闭时回调 | - | - 
ready | 弹层出来时回调 | - | - 

### Slot
属性 | 说明
---|---
\- | 触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件
list | 列表内容，一般由 `DropdownMenu` 承担

