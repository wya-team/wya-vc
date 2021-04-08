## 文本（Text）
文字容器 

### 何时使用
需要对文本内容机型行数限制（必要时父元素给固定宽度最好）。

### 基础用法
通过`value`绑定要显示的文本内容，`line`控制要显示的文本行数。

:::RUNTIME
```html
<template>
	<div>
		<vc-button @click="handleClick">
			切换行数
		</vc-button>
		<div :style="{ width: width + 'px' }">
			<h3>line: {{ line0 }} </h3>
			<vc-text :value="text14" :line="line0" />
			<h3>line: {{ line1 }} </h3>
			<vc-text :value="text16" :line="line1" />
			<h3>line: {{ line2 }} </h3>
			<vc-text :value="text18" :line="line2" />
			<h3>line: {{ line3 }} </h3>
			<vc-text :value="text30" :line="line3" />
		</div>
	</div>
</template>
<script>
import { Text, Button } from '@wya/vc';

export default {
	components: {
		"vc-text": Text,
		"vc-button": Button,
    },
	data() {
		let text = 'A2，C,我E,';
		return {
			width: 500,
			text,
			text10: text.repeat(10),
			text12: text.repeat(12),
			text14: text.repeat(14),
			text16: text.repeat(16),
			text18: text.repeat(18) + 'REPEAT_END_18',
			text30: text.repeat(30) + 'REPEAT_END_30',
			line0: 0,
			line1: 1,
			line2: 2,
			line3: 3,
		};
	},
	methods: {
		handleClick() {
			if (this.line0 === 0) {
				this.line0 = 3;
				this.line1 = 2;
				this.line2 = 1;
				this.line3 = 0;
			} else {
				this.line0 = 0;
				this.line1 = 1;
				this.line2 = 2;
				this.line3 = 3;
			}
		}
	}
};
</script>
```
:::

### 自定义结尾
通过`suffix`自定义结尾内容。

:::RUNTIME
```html
<template>
	<div style="width: 500px;">
		<vc-text 
			:value="text10" 
			:line="2"
			:indent="1"
			suffix="我是自定义结尾" />
	</div>
</template>
<script>
import { Text } from '@wya/vc';

export default {
	components: {
		"vc-text": Text,
    },
	data() {
		let text = 'A2，C,我E,';
		return {
			width: 500,
			text,
			text10: text.repeat(50),
		};
	},
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
tag | 渲染的节点类型 | `String` | - | div
value | 渲染的文本 | `String` | - | -
line | 行数,为0时默认显示全部 | `Number` | - | 0
indent | 缩进 | `Number` | - | 0
suffix | 后缀，只有在存在显示不完内容时才会出现 | `String` | - | '...'
renderRow | 自定义渲染 | `Function` | - | -
placement | 弹层的位置 | `String` | `top`、`left`、`right`、`bottom`、`bottom-left`、`bottom-right`、`top-left`、`top-right`、`right-top`、`right-bottom`、`left-top`、`left-bottom` | `top`
portalClassName | 外层类名 | `Object`、`String`、`Array` | - | -
portalStyle | 样式 | `Object` | - | - 

