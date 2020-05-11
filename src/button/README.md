## 按钮（Button）
各种样式的操作按钮

### 何时使用
标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### 基础用法
通过`type`、`circle`控制按钮的样式。

:::RUNTIME
```html
<template>
	<div class="v-button-basic">
		<vc-button>默认按钮</vc-button>
		<vc-button type="primary">常规按钮</vc-button>
		<vc-button type="error">错误按钮</vc-button>
		<vc-button type="success">成功按钮</vc-button>
		<vc-button type="warning">警告按钮</vc-button>
		<vc-button type="text">文字按钮</vc-button>
		<br>
		<vc-button circle>默认按钮</vc-button>
		<vc-button circle type="primary">常规按钮</vc-button>
		<vc-button circle type="error">错误按钮</vc-button>
		<vc-button circle type="success">成功按钮</vc-button>
		<vc-button circle type="warning">警告按钮</vc-button>
	</div>
</template>
<script>
import { Button } from '@wya/vc';
export default {
	components: {
		"vc-button": Button
	},
};
</script>
<style>
.v-button-basic > button {
	margin-bottom: 10px;
}
</style>
```
:::

### 禁用状态
按钮不可用状态，通过添加`disabled`属性可将按钮设置为不可用状态。

:::RUNTIME
```html
<template>
	<vc-button disabled type="primary">常规按钮</vc-button>
</template>
<script>
import { Button } from '@wya/vc';
export default {
	components: {
		"vc-button": Button
	},
};
</script>
```
:::

### 不同尺寸
通过设置`size`为`large`、`small`来设置尺寸为大、小的按钮，不设置或者设置`medium`，则尺寸为中。

:::RUNTIME
```html
<template>
	<div class="v-button-size">
		<vc-button size="large">大按钮</vc-button>
		<vc-button>默认按钮</vc-button>
		<vc-button size="small">小按钮</vc-button>
		<br>
		<vc-button circle size="large">大按钮</vc-button>
		<vc-button circle>默认按钮</vc-button>
		<vc-button circle size="small">小按钮</vc-button>
	</div>
</template>
<script>
import { Button } from '@wya/vc';
export default {
	components: {
		"vc-button": Button
	},
};
</script>
<style>
.v-button-size > button {
	margin-bottom: 10px;
}
</style>
```
:::

### 图标按钮

:::RUNTIME
```html
<template>
	<div class="v-button-icon">
		<vc-button icon="success" type="primary"></vc-button>
		<vc-button icon="search" type="primary">搜索</vc-button>
		<vc-button type="primary">搜索 <vc-icon type="search"/></vc-button>
	</div>
</template>
<script>
import { Button, Icon } from '@wya/vc';
export default {
	components: {
		"vc-button": Button,
		"vc-icon": Icon
	},
};
</script>
<style>
.v-button-icon > button {
	margin-bottom: 10px;
}
</style>
```
:::

### 长按钮
按钮长度跟随父元素长度。

:::RUNTIME
```html
<template>
	<div class="v-button-long">
		<div><vc-button type="primary" long>常规按钮</vc-button></div>
		<div style="width: 80%"><vc-button type="success" long>常规按钮</vc-button></div>
		<div style="width: 40%"><vc-button type="warning" long>常规按钮</vc-button></div>
	</div>
</template>
<script>
import { Button } from '@wya/vc';
export default {
	components: {
		"vc-button": Button
	},
	methods: {
		handlePromise1(e, callback) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve();
				}, 300000); 
			});
		},
	}
};
</script>
<style>
.v-button-long > div {
	margin-bottom: 10px;
}
</style>
```
:::

### 点击按钮出现加载图标
点击事件返回一个`promise`

:::RUNTIME
```html
<template>
	<vc-button type="primary" @click="handlePromise1">点击加载</vc-button>
</template>
<script>
import { Button } from '@wya/vc';
export default {
	components: {
		"vc-button": Button
	},
	methods: {
		handlePromise1(e, callback) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve();
				}, 300000); 
			});
		},
	}
};
</script>
```
:::

### 按钮组合
需要用`vc-button-group`包裹，根据`vertical`控制按钮组是水平还是垂直

:::RUNTIME
```html
<template>
	<div>
		<vc-button-group>
			<vc-button>左</vc-button>
			<vc-button>右</vc-button>
		</vc-button-group>
		<vc-button-group vertical>
			<vc-button type="primary" icon="up" />
			<vc-button type="primary" icon="down" />
		</vc-button-group>
	</div>
</template>
<script>
import { Button } from '@wya/vc';
export default {
	components: {
		"vc-button": Button,
		"vc-button-group": Button.Group,
	},
};
</script>
```
:::

### 不同尺寸的按钮组合
需要用`vc-button-group`包裹，并在`vc-button-group`上通过设置`size`为`large` `small`来设置尺寸为大、小的按钮，不设置或者设置`medium`，则尺寸为中

:::RUNTIME
```html
<template>
	<div>
		<vc-button-group size="large">
			<vc-button>大按钮</vc-button>
			<vc-button>大按钮</vc-button>
			<vc-button>大按钮</vc-button>
		</vc-button-group>
		<br>
		<vc-button-group>
			<vc-button>常规按钮</vc-button>
			<vc-button>常规按钮</vc-button>
			<vc-button>常规按钮</vc-button>
		</vc-button-group>
		<br>
		<vc-button-group size="small">
			<vc-button>小按钮</vc-button>
			<vc-button>小按钮</vc-button>
			<vc-button>小按钮</vc-button>
		</vc-button-group>
	</div>
</template>
<script>
import { Button } from '@wya/vc';
export default {
	components: {
		"vc-button": Button,
		"vc-button-group": Button.Group,
	},
};
</script>
```
:::

## API

### 基础属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
type | 按钮的样式选择 |`String` | `default`、`primary`、`text`、`success`、`error`、`warning` | `default`
disabled | 禁止点击 | `Boolean` | - | `false`
circle | 按钮是否圆角 | `Boolean` | - |`false`
size | 按钮大小 | `String` | `large`、`medium`、`small` |`medium`
icon | 按钮内的图标 | `String` | -
long | 长按钮 | `Boolean` | `false`
wait | 阻止重复点击 | `Number` | 250
html-type | 按钮的类型 | `String` | `button`、 `submit`、`reset` [描述](https://www.w3school.com.cn/tags/att_button_type.asp)  | `button`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---|---
click | 点击事件 | `() => Promise?` | -

### Group 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
size | 调节按钮组件的大小 | `String` | `large`、`medium`、`small` | `medium`
circle | 按钮是否圆角 | `Boolean` | - | `false`
vertical | 按钮纵向排列 | `Boolean` | - | `false`
