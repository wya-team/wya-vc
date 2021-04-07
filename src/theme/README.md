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
<!-- 仅展示最基本的用法 -->
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
			background-color="background" 
			border-color="border"
			before="before"
			class="v-theme__block"
		>
			<vc-theme-text color="color">
				文字颜色：跟随主题
			</vc-theme-text>
		</vc-theme-view>
	</div>
</template>
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
    --color: #000;
    --border: red;
    --background: white;
    --before: green;
}

[data-theme="dark"] {
    --color: #fff;
    --border: blue;
    --background: #000;
    --before: yellow;
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
before | 伪元素 | `String` | - | ''
after | 伪元素 | `String` | - | ''

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

### 默认自带颜色表如下
```
{
	// 主要颜色
	'vc-red-mid': '#ca1622',

	'vc-pink-mid': '#fa5a6e',
	'vc-pink-light': '#fff2ea',

	// 橙色系列
	'vc-orange-dark': '#ef3528',
	'vc-orange-mid': '#fa6f60',
	'vc-orange-light': '#fc9780',

	'vc-green-dark': '#06bf04',
	'vc-green-mid': '#56c16d',

	// 蓝色系系
	'vc-blue-dark': '#0b76fe',
	'vc-blue-mid': '#16a3ff',
	'vc-blue-light': '#6ab4ff',

	// 黄色系
	'vc-yellow-dark': '#f2c300',
	'vc-yellow-mid': '#ffd00d',
	'vc-yellow-light': '#ffd31c',

	// 紫色系
	'vc-purple-dark': '#8b61f3',
	'vc-purple-mid': '#a48efc',
	'vc-purple-light': '#cca3ff',

	// 灰色系
	'vc-gray-dark': '#edeef0',
	'vc-gray-mid': '#f5f6f7',
	'vc-gray-light': '#f7f8fa',

	// 白色系
	'vc-white': '#fff',

	// 黑色系
	'vc-black': '#000',
	'vc-black-dark': '#2e3136',
	'vc-black-mid': '#636770',
	'vc-black-light': '#9c9fa6',

	/**
	 * status
	 * message, modal
	 */
	'vc-info': '#5495f6',
	'vc-primary': '#5495f6',
	'vc-success': '#52c41a',
	'vc-error': '#f04134',
	'vc-warning': '#faad14'
}
```

## TODO
所有组件涉及需要变更主题颜色的使用该组件