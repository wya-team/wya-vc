## 组件中文名称（ComponentName）
介绍组件的用途

### 何时使用
标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
- 第一个功能点
- 第二个功能点

### 基础用法
介绍如何使用组件，通过设置属性`attr`、`attr1`来达到什么效果。

:::RUNTIME
```html
<template>
	<div class="v-component-name">
		<vc-component 
			ref="component" 
            :attr="attr"
            @eventName="handleTrigger"
		/>	
		<div style="margin-top: 20px;">
			<vc-button @click="handleClick">
				调用组件方法
			</vc-button>
		</div>
	</div>
</template>
<script>
import { Component } from '@wya/vc';

export default {
	name: 'v-component',
	components: {
		'vc-component': Component,
	},
	data() {
		return {
            attr: ''
		};
	},
	methods: {
		handleTrigger(res) {
            this.attr = res;
        }，
        handleClick() {
            this.$refs.component.componentMethods();
        }
	},
};
</script>
<style lang="scss">
.v-component {
}
</style>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
attr | attr属性说明 | `String` | - | -
attr | 属性多种类型 | `String`、`Number` | - | -
attr | 带有可选值的属性 | `String` | `default`、`primary` | `default`
tag | 外层标签 | `String`| - | `div`
placement |  菜单弹出位置 | `String` | 弹层的位置(`top` `left` `right` `bottom` `bottom-left` `bottom-right` `top-left` `top-right` `right-top` `right-bottom` `left-top` `left-bottom`) | `bottom` 

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---|---
eventName | 事件说明 | - | -
eventName | 事件说明 | `(param: String) => void 0` | `param`：param中文说明
eventName | 事件说明 | `(param1: String, param2: Boolean) => void 0` | `param1`：param1中文说明；`param2`：param2中文说明

### 方法
方法名 | 说明 | 参数
---|---|---
methodsName | 方法说明 | `param`：参数说明

### slot
名称 | 说明 
---|---
slot名称 | slot说明 
