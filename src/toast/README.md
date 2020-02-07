## h5弹出层
弹出层适用于h5

### 基础用法
:::RUNTIME
```html
<template>
	<div class="v-toast-basic">
		<vc-button @click="handleClick">点击出现提示语</vc-button>
	</div>
</template>

<script>
import { MToast, Button } from '@wya/vc';
export default {
	components: {
        "vc-button": Button
    },
	mounted() {
	},
	methods: {
		handleClick() {
			MToast.info('提示语', 1)
		}
	}
};
</script>
<style>
</style>
```
:::

### 有loading的弹出层
弹出窗5秒后消失，可以点击遮罩层提前关闭
:::RUNTIME
```html
<template>
	<div class="v-toast-basic">
		<vc-button @click="handleClick">点击加载中</vc-button>
	</div>
</template>

<script>
import { MToast, Button } from '@wya/vc';
export default {
	components: {
        "vc-button": Button
    },
	mounted() {
	},
	methods: {
		handleClick() {
			MToast.loading({
				contentL: '提示语',
				duration:  5,
				maskClosable: true
			})
		}
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
content | 弹出层内容 | `Function` `String` | - |-
maskClosable | 点击遮罩层关闭 | `Boolean` | - | true
duration | 弹出层显示时间 | `Number` | - | 3
mode | 弹出层类型 | `String` | `info` `loading` | info