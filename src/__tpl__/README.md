## 组件中文名称（ComponentName）

介绍组件的用途

### 基础用法
介绍如何使用组件，通过设置属性 `attr` 来达到什么效果。

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

#### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
attr | attr属性说明 | `String` | - | -
attr | 属性多种类型 | `String`、`Number` | - | -
attr | 带有可选值的属性 | `String` | `default`、`primary` | `default`

#### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---|---
eventName | 触发时机说明 | `(param: String) => void 0` | `param`：param中文说明
eventName | 触发时机说明 | `(param1: String, param2: Boolean) => void 0` | `param1`：param1中文说明；`param2`：param2中文说明

#### 方法
方法名 | 说明 | 参数
---|---|---
methodsName | 方法说明 | -

#### slot
名称 | 说明 
---|---
slot名称 | slot说明 
