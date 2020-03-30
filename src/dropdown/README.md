## 下拉菜单（dropdown）
将菜单折叠到下拉菜单里

### 基础用法
移动到菜单上，展开

:::RUNTIME
```html
<template>
	<div class="v-dropdown-basic">
		<h2>默认hover触发</h2>
		<vc-dropdown
			v-model="visible"
			:portal="true"
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
			:portal="true"
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
	mounted() {
	},
	methods: {
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
</style>
```
:::

### 触发方式
配置hover触发或者click触发

:::RUNTIME
```html
<template>
	<div class="v-dropdown-basic">
		<vc-dropdown
			v-model="visible"
			:portal="true"
			:trigger="trigger"
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
	mounted() {
	},
	methods: {
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
</style>
```
:::

### 下拉菜单出现位置
配置placement

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
			:portal="true"
			:trigger="trigger"
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
	mounted() {
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

:::RUNTIME
```html
<template>
	<div class="v-dropdown-basic">
		<vc-dropdown
			v-model="visible"
			:portal="true"
			:trigger="trigger"
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
	mounted() {
	},
	methods: {
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
</style>
```
:::
### API

### vc-dropdown属性

属性 | 说明 | 类型 | 可选值 |默认值
---|---|---|---|---
trigger | 触发方式 | String | 可选值为 `hover`（悬停）`click`（点击）`contextMenu`（右键）`custom`（自定义），使用 custom 时，需配合 visible 一起使用 | hover
arrow | 是否带三角指向 | Boolean | - | false
visible | 手动控制下拉框的显示，在 trigger = 'custom' 时使用 | Boolean | - |false
placement |  控制菜单显示方式 | String | 弹层的位置(`top` `left` `right` `bottom` `bottom-left` `bottom-right` `top-left` `top-right` `right-top` `right-bottom` `left-top` `left-bottom`) | bottom 
portal | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | Boolean | - |true
portal-class-name  | 开启 portal 时，给浮层添加额外的 class 名称 | String | - |-

### vc-dropdown-item属性

属性 | 说明 | 类型 | 可选值 |默认值
disabled | 是否禁止选择 | Boolean | - | false
selected | 是否选中 | Boolean | - | false
closable | 是否点击后隐藏 | Boolean | - | true
divided | 是否需要分割线 | Boolean | - | false


### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
click | 点击菜单项时触发 | name: String | -
visible-change | visible改变时回调 | - | - 
close | 关闭时回调 | - | - 
ready | 弹层出来时回调 | -

### Slot

属性 | 说明
---|---
无 | 触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件
list | 列表内容，一般由 `DropdownMenu` 承担

### Item 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
name | 用来标识这一项 | String | -
disabled | 禁用该项 | Boolean | false
divided | 显示分割线 | Boolean | false
selected | 标记该项为选中状态 | Boolean | false
