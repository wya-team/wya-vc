## 抽屉（Drawer）
展示较长数据的内容时可以使用Drawer

### 基础用法
通过 `placement` 控制抽屉出现的位置 `top` `right` `bottom` `left`
:::RUNTIME
```html
<template>
	<div class="v-drawer-basic">
		<vc-button @click="handleDrawer('top')">
			从上到下
        </vc-button>
        <vc-button @click="handleDrawer('left')">
			从左到右
        </vc-button>
        <vc-button @click="handleDrawer('bottom')">
			从下到上
        </vc-button>
        <vc-button @click="handleDrawer('right')">
			从右到左
        </vc-button>
        <vc-drawer
			v-model="visible"
			:placement="placement"
		>
			我是content1
		</vc-drawer>
	</div>
</template>

<script>
import { Button, Drawer } from '@wya/vc';
export default {
	components: {
        "vc-button": Button,
        "vc-drawer": Drawer
    },
    data() {
		return {
            visible: false,
            placement: 'top'
		};
	},
	mounted() {
	},
	methods: {
        handleDrawer(res) {
            this.visible = true;
            this.placement = res
		},
	}
};
</script>
<style>
</style>
```
:::

### 是否显示蒙层
:::RUNTIME
```html
<template>
	<div>
		<vc-button @click="handleDrawer(true)">
			有蒙层
        </vc-button>
        <vc-button @click="handleDrawer(false)">
			无蒙层
        </vc-button>
        <vc-drawer
            v-model="visible"
            :mask="mask"
		>
			只能点击关闭按钮关闭
		</vc-drawer>
	</div>
</template>

<script>
import { Button, Drawer } from '@wya/vc';
export default {
	components: {
        "vc-button": Button,
        "vc-drawer": Drawer
    },
    data() {
		return {
            visible: false,
            mask: true
		};
	},
	mounted() {
	},
	methods: {
        handleDrawer(res) {
            this.visible = true;
            this.mask=res
		},
	}
};
</script>
<style>
</style>
```
:::

### 关闭抽屉
:::RUNTIME
```html
<template>
	<div>
		<vc-button @click="handleDrawer">
			点击阴影蒙版不能关闭抽屉
        </vc-button>
        <vc-drawer
            v-model="visible"
            :maskClosable="false"
		>
			只能点击关闭按钮关闭
		</vc-drawer>
	</div>
</template>

<script>
import { Button, Drawer } from '@wya/vc';
export default {
	components: {
        "vc-button": Button,
        "vc-drawer": Drawer
    },
    data() {
		return {
            visible: false,
		};
	},
	mounted() {
	},
	methods: {
        handleDrawer() {
            this.visible = true;
		},
	}
};
</script>
<style>
</style>
```
:::
### API

### 基础属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
visable | 抽屉是否显示，可使用 v-model 双向绑定数据 | `Boolean` | - |false
title | 抽屉的标题 | `String` | -
width | 抽屉的宽度（placement为`left`和`right`可设置）| `Number` | - | 300
height | 抽屉的高度(placement为`top`和`bottom`可设置) | `Number` | - | 300
mask | 遮罩是否显示 | `Boolean` |  - |true 
mask-style | 遮罩的样式 | `Object` | - | -
mask-closable | 点击遮罩关闭 | `Boolean` | - | true
scrollable | 页面是否可以滚动 | `Boolean` | - | false
placement | 抽屉的方向 | `String` | `top` `right` `bottom` `left` | right


### 事件/方法

事件名 | 说明 | 类型 | 参数
---|---|---|---
close | 关闭时的回调 | - | -
visable-change | 关闭时的回调 | - | -

### Drawer slot

名称 | 说明
--- | ---|
header | 自定义页头内容