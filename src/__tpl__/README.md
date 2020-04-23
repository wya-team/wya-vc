## 组件中文名称（ComponentName）

简单介绍组件的作用

### 基础用法
介绍如何使用组件

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

#### 事件

事件名 | 说明 | 参数 | 返回值
---|---|---|---|---
eventName | 触发时机说明 | param | 返回值说明

#### 方法

方法名 | 说明 | 参数 | 返回值
---|---|---|---
componentMethods | 方法说明 | param | 方法的返回值

#### slot

名称 | 说明 
---|---
slot名称 | slot说明 
