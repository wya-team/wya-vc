## [Demo Basic](https://wya-team.github.io/wya-vc/dist/editor/basic.html)
## 功能
富文本

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 富文本内容 | `string` | -
options | 富文本toolbar | `object` | -
disabled | 富文本是否不可编辑 | `boolean` | false


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
@blur | 富文本失去焦点 | `function` | `function(editor)`
@focus | 富文本获取焦点 | `function` | `function(editor)`
@change | 富文本内容变化 | `function` | `function({ html, text, editor })`



## 基础用法

```html
<template>
	<vc-editor 
		ref="editor"
		:options="options"
		:disabled="disabled"
		value="我是富文本的内容，可以是text，也可以是html"
		@change="handleChange"
	/>
</template>
<script>
import Editor from '../editor';

export default {
	name: "vc-editor-basic",
	components: {
		"vc-editor": Editor
	},
	data() {
		return {
			options: {
				// modules: {
				// 	toolbar: [
				// 		['link', 'image', 'video']
				// 	],
				// },
			},
			disabled: false
		};
	},
	computed: {
		
	},
	mounted() {
		console.log(this.$refs.editor);
	},
	methods: {
		handleChange(arg) {
			console.log(arg);
		}
	}
};
</script>

```