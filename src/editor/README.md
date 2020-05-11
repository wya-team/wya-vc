## 富文本（Editor）
富文本编辑器

### 何时使用
- 常用的富文本编辑器，可扩展。
- 组件基于quill富文本编辑器。
- 请用 Editor.View: 富文本预览组件来显示富文本内容。

### 基本用法
在富文本编辑器中编写的内容可用`vc-editor-view`组件展示。

:::RUNTIME
```html
<template>
	<div class="v-editor-basic">
		<vc-editor style="height: 200px" v-model="text" />
        <vc-editor-view :content="text" />
	</div>
</template>
<script>
import { Editor } from '@wya/vc';

export default {
	components: {
        "vc-editor": Editor,
        "vc-editor-view": Editor.View
    },
    data() {
        return {
            text: ''
        }
    },
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 富文本内容 | `String` | - | -
options | 富文本toolbar（优先级最高） | `Object` | - | -
disabled | 富文本是否不可编辑 | `Boolean` | - | `false`
imgUploadOpts | 上传图片的配置项 | `Object` | - | `{accept: 'image/gif,image/jpeg,image/jpg,image/png'}`
videoUploadOpts | 上传视频的配置项 | `Object` | - | `{accept: 'video/mp4,video/webm,video/ogg'}`
register | Quill扩展注册 | `Function` | - | -

### Editor.View属性
属性 | 说明 | 类型 | 可选值 |默认值
---|---|---|---|---
content | 富文本内容（html形式） | `String` | - | -

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
blur | 富文本失去焦点 | `(editor: Object) => void 0` | `editor`：富文本实例
focus | 富文本获取焦点 | `(editor: Object) => void 0` | `editor`：富文本实例
change | 富文本内容变化 | `({html, text, editor}: Object) => void 0` | `html`：输入的innerHTML；`text`：输入的文本；`editor`：富文本实例
ready | quill对象已经实例化 | - | -

### Slot
属性 | 说明
---|---
toolbar | 工具栏内容(外层节点需要有id属性为`toolbar`)
extend | 组件提供的工具栏上的尾部工具拓展(和`toolbar`插槽不能同时使用)
