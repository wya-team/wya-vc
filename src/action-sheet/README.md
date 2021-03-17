## 组件中文名称（ComponentName）
动作面板

### 何时使用
从底部弹出的模态框，提供和当前场景相关的 2 个以上的操作动作，也支持提供描述。内置固定的展示样式、不支持特别灵活的修改。


### 基础用法
函数式调用

:::RUNTIME
```html
<!-- 开发使用的版本，如各种操作改变属性值 -->
<template>
	<div style="padding: 20px; display: flex; flex-direction: column-reverse;">
		<div @click="handleClick">
			唤起ActionSheet
		</div>
	</div>
</template>
<script>
import MActionSheet from '..';

export default {
	name: "vc-tpl-basic",
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick() {
			MActionSheet.open({
				title: '我是标题',
				description: '我是描述我是描述我是描述我是描述',
				cancelText: '取消',
				actions: [
					{
						name: '选项一',
						onClick: this.handlePress
					},
					{
						name: '选项二',
						disabled: true,
						onClick: this.handlePress
					},
					{ 
						name: 'DELETE', 
						className: 'test',
						style: { color: '#ff0000' }, 
						onClick: this.handlePress 
					}
				]
			}).then((res) => {
				console.log('sure', res);
			}).catch(() => {
				console.log('close');
			});
		},
		handlePress(action, cb) {
			return new Promise((r, j) => {
				setTimeout(() => {
					r();
				}, 2000);
			});
		}
	}
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
mask | 是否显示遮罩（只有在position为bottom的时候才有用） | `Boolean` | true
maskClosable | 是否允许通过点击遮罩关闭弹窗 | `Boolean` | true
wrapperClassName | - | `Object,Array,String` | -
wrapperStyle | - | `Object,Array,String` | -
scrollRegExp | 判断滑动是否在滚动容器内，防止滚动穿透弹层 | `Function` | `void: function(v) { return /g-scroll-container/.test(v); }`
actions | 面板选项列表 | `Array` | -
description | 选项上方的描述信息 | `String` | -
cancelText | 取消按钮文字,为空不展示底部取消按钮 | `String` | -

### Action 数据结构
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
name | 标题 | `String` | -
subName | 二级标题	 | `String` | -
disabled | 是否为禁用状态 | `String` | -
disabled | 是否为禁用状态 | `String` | -
className | 为对应列添加额外的 class | `String` | -
style | 为对应列添加额外的 style | `String`、`Object` | -
onClick | 点击事件, 也可支持`Promise`,`cb`回调关闭 | `(action, cb): void` | - | - 

### 方法
方法名 | 说明 | 参数
---|---|---

### slot
名称 | 说明 
---|---

## 移动端

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
