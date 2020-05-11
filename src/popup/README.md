## 功能（Popup）
移动端弹出层

### 何时使用
抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。
- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。

### 基础用法
通过v-model控制弹出层是否展示。

:::RUNTIME
```html
<template>
	<div>
		<vcm-popup v-model="show">
			<div style="height: 200px;" >默认弹层</div>
		</vcm-popup>
		<vcm-button @click="handleClick">点击弹出</vcm-button>
	</div>
</template>
<script>
import { MPopup, Button } from '@wya/vc';

export default {
	name: "vc-popup-basic",
	components: {
		'vcm-popup': MPopup,
		'vcm-button': Button,
	},
	data() {
		return {
			show: false
		};
	},
	methods: {
		handleClick() {
			this.show = true;
		},
	}
};
</script>
```
:::

### 布局
通过`fixed`控制弹出层是否采用fixed布局

:::RUNTIME
```html
<template>
	<div>
		<vcm-popup v-model="show" fixed>
			<div style="height: 200px;" >fixed布局</div>
		</vcm-popup>
		<vcm-popup v-model="show1">
			<div style="height: 200px;" >非fixed布局</div>
		</vcm-popup>
		<vcm-button @click="handleClick">fixed布局</vcm-button>
		<vcm-button @click="handleClickOne">非fixed布局</vcm-button>
	</div>
</template>
<script>
import { MPopup, Button } from '@wya/vc';

export default {
	name: "vc-popup-basic",
	components: {
		'vcm-popup': MPopup,
		'vcm-button': Button,
	},
	data() {
		return {
			show: false,
			show1: false,
		};
	},
	methods: {
		handleClick() {
			this.show = true;
		},
		handleClickOne() {
			this.show1 = true;
		},
	}
};
</script>
```
:::

### 弹出位置
通过`placement`属性设置弹出位置，默认底部弹出，可以设置为`top`、`bottom`、`left`、`right`、`center`。

:::RUNTIME
```html
<template>
	<div>
		<vcm-popup v-model="show1" >
			<div style="height: 200px;">
				默认弹出（底部）
			</div>
		</vcm-popup>
		<vcm-popup v-model="show2" placement="top">
			<div style="height: 200px;" >
				顶部弹出
			</div>
		</vcm-popup>
		<vcm-popup v-model="show3" placement="left">
			<div style="min-width: 100px;">
				左侧弹出
			</div>
		</vcm-popup>
		<vcm-popup v-model="show4" placement="right">
			<div style="">
				右侧弹出
			</div>
		</vcm-popup>
		<vcm-popup v-model="show5" placement="center">
			<div style="min-height: 200px; min-width: 200px;">
				居中弹出
			</div>
		</vcm-popup>
		<vcm-button @click="handleClick(1)">默认弹出（底部）</vcm-button>
		<vcm-button @click="handleClick(2)">顶部弹出</vcm-button>
		<vcm-button @click="handleClick(3)">左侧弹出</vcm-button>
		<vcm-button @click="handleClick(4)">右侧弹出</vcm-button>
		<vcm-button @click="handleClick(5)">居中弹出</vcm-button>
	</div>
</template>
<script>
import { MPopup, Button } from '@wya/vc';

export default {
	name: "vc-popup-basic",
	components: {
		'vcm-popup': MPopup,
		'vcm-button': Button,
	},
	data() {
		return {
			show1: false,
			show2: false,
			show3: false,
			show4: false,
			show5: false,
		};
	},
	methods: {
		handleClick(index) {
			switch(index){
				case 2:
					this.show2 = true;
					break;
				case 3:
					this.show3 = true;
					break;
				case 4:
					this.show4 = true;
					break;
				case 5:
					this.show5 = true;
					break;
				default:
					this.show1 = true;
					break;
			}
		},
	}
};
</script>
```
:::

### 主题
通过theme属性设置弹层主题，默认`light`，可以设置为`dark`、`light`、`none`。

:::RUNTIME
```html
<template>
	<div>
		<vcm-popup v-model="show1" theme="light">
			<div style="height: 200px;">
				默认弹层
			</div>
		</vcm-popup>
		<vcm-popup v-model="show2" theme="dark">
			<div style="height: 200px;" >
				黑色主题
			</div>
		</vcm-popup>
		<vcm-popup v-model="show3" theme="none">
			<div style="height: 200px;">
				不设置主题
			</div>
		</vcm-popup>
		<vcm-button @click="handleClick(1)">默认主题</vcm-button>
		<vcm-button @click="handleClick(2)">黑色主题</vcm-button>
		<vcm-button @click="handleClick(3)">不设置主题</vcm-button>
	</div>
</template>
<script>
import { MPopup, Button } from '@wya/vc';

export default {
	name: "vc-popup-basic",
	components: {
		'vcm-popup': MPopup,
		'vcm-button': Button,
	},
	data() {
		return {
			show1: false,
			show2: false,
			show3: false,
		};
	},
	methods: {
		handleClick(index) {
			switch(index){
				case 2:
					this.show2 = true;
					break;
				case 3:
					this.show3 = true;
					break;
				default:
					this.show1 = true;
					break;
			}
		},
	}
};
</script>
```
:::

### 遮罩层
通过mask控制遮罩层层是否展示，通过maskClosable控制是否能通过点击遮罩层来关闭整个弹出层，默认均为true。

:::RUNTIME
```html
<template>
	<div>
		<vcm-popup v-model="show">
			<div style="height: 200px;" >默认弹层</div>
		</vcm-popup>
		<vcm-popup v-model="show1" :mask="false">
			<div style="height: 200px;" @click="handleCloseOne">无遮罩层</div>
		</vcm-popup>
		<vcm-popup v-model="show2" :maskClosable="false">
			<div style="height: 200px;" @click="handleCloseTwo">点击遮罩层不能关闭弹层</div>
		</vcm-popup>
		<vcm-button @click="handleClick">默认弹层</vcm-button>
		<vcm-button @click="handleClickOne">无遮罩层</vcm-button>
		<vcm-button @click="handleClickTwo">点击遮罩层不能关闭弹层</vcm-button>
	</div>
</template>
<script>
import { MPopup, Button } from '@wya/vc';

export default {
	name: "vc-popup-basic",
	components: {
		'vcm-popup': MPopup,
		'vcm-button': Button,
	},
	data() {
		return {
			show: false,
			show1: false,
			show2: false,
		};
	},
	methods: {
		handleClick() {
			this.show = true;
		},
		handleClickOne() {
			this.show1 = true;
		},
		handleClickTwo() {
			this.show2 = true;
		},
		handleCloseOne() {
			this.show1 = false;
		},
		handleCloseTwo() {
			this.show2 = false;
		},

	}
};
</script>
```
:::

### 自定义外层容器样式
通过`wrapperClassName`属性设置外层容器样式名，通过`wrapperStyle`属性设置外层容器行内样式。

:::RUNTIME
```html
<template>
	<div>
		<vcm-popup v-model="show1" :wrapper-class-name="classes" >
			<div style="height: 200px;" >
				样式一
			</div>
		</vcm-popup>
		<vcm-popup v-model="show2" :wrapper-style="wrapperStyle" >
			<div style="height: 200px;" >
				样式二
			</div>
		</vcm-popup>
		<vcm-popup v-model="show3" :wrapper-class-name="classes" :wrapper-style="wrapperStyle">
			<div style="height: 200px;">
				样式三
			</div>
		</vcm-popup>

		<vcm-button @click="handleClick(1)">样式一</vcm-button>
		<vcm-button @click="handleClick(2)">样式二</vcm-button>
		<vcm-button @click="handleClick(3)">样式三</vcm-button>
	</div>
</template>
<script>
import { MPopup, Button } from '@wya/vc';

export default {
	name: "vc-popup-basic",
	components: {
		'vcm-popup': MPopup,
		'vcm-button': Button,
	},
	data() {
		return {
			show1: false,
			show2: false,
			show3: false,
			classes: { 'is-red': true },
			wrapperStyle: {
				"background": "orange"
			}
		};
	},
	methods: {
		handleClick(index) {
			switch(index){
				case 2:
					this.show2 = true;
					break;
				case 3:
					this.show3 = true;
					break;
				default:
					this.show1 = true;
					break;
			}
		},
	}
};
</script>
<style>
.is-red {
	color: red;
}
</style>
```
:::

## API

### 基础属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
visible | 显示popop | `Boolean` | - | `false`
fixed | 是否使用fixed布局 | `Boolean` | - | `false`
show | 是否显示 | `Boolean` | - | `false`
placement | 从哪个方向弹出 | `String` | `top`、`bottom`、`left`、`right`、`center` | `bottom`
theme | 主题 | `String` | `dark`、`light`、`none` | `light`
mask | 是否显示遮罩（只有在position为bottom的时候才有用） | `Boolean` | - | `true`
maskClosable | 是否允许通过点击遮罩关闭弹窗 | `Boolean` | - | `true`
wrapperClassName | 外层容器的Class名 | `Object`、`Array`、`String` | - | -
wrapperStyle | 外层容器的样式 | `Object`、`Array`、`String` | - | -
scrollRegExp | 判断滑动是否在滚动容器内，防止滚动穿透弹层 | `Function` | `void: function(v) { return /g-scroll-container/.test(v); }` | - | -

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
close | 弹层关闭回调 | - | -
visible-change | 显示状态改变 | `(visible: Boolean) => void 0` | `visible`：显示状态
