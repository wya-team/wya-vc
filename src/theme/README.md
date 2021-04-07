## 组件中文名称（Theme）
用于主题管理（针对css variables）

### 何时使用
需要有主题控制的组件

- 字体颜色（color）
- 背景颜色（background-color）
- 背景图片 (background-image)
- 边颜色（border-color）
- 伪元素 (before, after)
- 图片资源（img标签，src）


### 基础用法

- `vc-theme`: tag默认为span
- `vc-theme-view`: tag默认为div
- `vc-theme-text`: tag默认为span
- `vc-theme-image`: tag默认为img

:::RUNTIME
```html
<template>
	<div style="padding: 20px">
		<vc-button 
			@click="handleChange"
		>
			当前主题：{{ current }}
		</vc-button>

		<vc-theme>
			<vc-theme>
				文字颜色：不设置
			</vc-theme>
		</vc-theme>
		
		<vc-theme-view>
			<vc-theme-text>
				文字颜色：不设置
			</vc-theme-text>
		</vc-theme-view>

		<vc-theme-view 
			:pseudo="{
				before: {
					background: 'color-before',
				},
				':hover > span': {
					color: 'color-hover',
				}
			}"
			background-color="color-background" 
			border-color="color-border"
			class="v-theme__block"
		>
			<vc-theme-text color="color-primary">
				文字颜色：跟随主题
			</vc-theme-text>
		</vc-theme-view>
	</div>
</template>
<script>
<script>
import { Theme, Button } from '@wya/vc';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-theme': Theme,
		'vc-theme-view': Theme.View,
		'vc-theme-text': Theme.Text,
		'vc-theme-image': Theme.Image,
		'vc-button': Button,
	},

	data() {
		return {
			current: 'light',
		};
	},

	methods: {
		handleChange() {
			this.current = this.current === 'dark' 
				? "light"
				: "dark";

			document.body.setAttribute("data-theme", this.current);
		}
	}
};
</script>

<style lang="scss">
:root {
	--color-primary: #000;
	--color-border: red;
	--color-background: white;
	--color-before: green;
	--color-hover: pink;
}

[data-theme="dark"] {
	--color-primary: #fff;
	--color-border: blue;
	--color-background: #000;
	--color-before: yellow;
	--color-hover: orange;
}

.v-theme__block {
	display: inline-block; 
	padding: 10px 5px; 
	border-width: 2px; 
	border-style: solid;
	&:before {
		width: 100%;
		height: 5px;
		content: ' ';
		display: block;
	}
}
</style>

```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
tag | HTML标签 | `String` | - | 'span'
color | 字体颜色 | `String` | - | ''
borderColor | 边颜色 | `String` | - | ''
backgroundColor | 背景颜色 | `String` | - | 'cover'
backgroundImage | 背景图片 | `String` | - | ''
backgroundSize | 文字颜色 | `String` | - | ''
src | 图片资源 | `String` | - | ''
pseudo | 伪元素、类 | `String`、`Object` | - | ''

### `backgroundImage`, `src`, 以及兼容处理

- VcIntance下的配置

```
{
	Theme: {
		'main-color': '#fff', // 优先作用，可处理css兼容
		'main-image-src': 'https://**', // key可以找到对应的src资源
		'main-background-image': 'https://', // 同上

		// 以color为例
		'main-color-1': 'main', // 不会生效，生效结果为 main 而不是 var(--main), 要具体的值
		'main-color-2': '' // 结果为 var(--main-color-2)
	}
}
```

### 颜色主题设置
```
{
	'main-color': 'red', // 建议使用当前不含颜色标识的key值
	'color-red': 'red' // 不建议出现具体的key有颜色标识的值，这样不利于主题修改
}
```

## TODO
- 所有组件涉及需要变更主题颜色的使用该组件
- 如果不采用`CSS Variables`(建议全部采用这个方案), 采用VcInstance的值暂时无法实时变化
