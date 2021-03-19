## 组件中文名称（ComponentName）
评价组件

### 何时使用
用于对事物进行评级操作。

### 基础用法
用例
:::RUNTIME
```html
<template>
	<div style="padding: 20px">
		<vc-rate
			v-model="value"
			half
			clearable
			color="#ff0000"
			:tooltips="tooltips"
		/>
	</div>
</template>
<script>
import Rate from '..';

export default {
	name: "vc-rate-basic",
	components: {
		'vc-rate': Rate,
	},
	data() {
		return {
			value: 3.5,
			tooltips: ['极差', '差', '一般', '好', '极好']
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
<style lang="scss">
</style>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 当前star数，可以使用 v-model 双向绑定数据 | `Number` | - | 0
count | star 总数	 | `Number` | - | 5
color | 选中的颜色 | `String` | - | `#16a3ff`
icon | 图标的icon | `String`| - | `star`
character | 自定义的字符 | `String` | - | - 
half | 是否允许半选 | `Boolean` | - | `false`
clearable | 是否可以取消选择 | `Boolean` | - | `false`
disabled | 是否只读，无法进行交互 | `Boolean` | - | `false`
tooltips | 自定义每项的提示信息 | `String[]` | - | -
iconStyle | icon的样式 | `Object` | - | -

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---|---
change | 评分改变时触发 | - | -

### slot
名称 | 说明 
---|---
tip | 提示内容自定义

## 移动端

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---

