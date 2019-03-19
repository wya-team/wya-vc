## [Demo Basic](https://wya-team.github.io/wya-vc/dist/editor/basic.html)
## 功能
富文本

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 富文本内容 | `String` | -
options | 富文本toolbar | `Object` | -
disabled | 富文本是否不可编辑 | `Boolean` | false


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
@blur | 富文本失去焦点 | `editor` | `-`
@focus | 富文本获取焦点 | `editor` | `-`
@change | 富文本内容变化 | `{ html, text, editor }` | `-`



## 基础用法

```vue
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