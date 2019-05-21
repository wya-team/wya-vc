## [Demo Basic](https://wya-team.github.io/wya-vc/dist/editor/basic.html)
## 功能
富文本

- Editor.View: 富文本预览组件

## API

#### 属性
##### Editor
属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 富文本内容 | `String` | -
options | 富文本toolbar（优先级最高） | `Object` | -
disabled | 富文本是否不可编辑 | `Boolean` | false

##### Editor.View
属性 | 说明 | 类型 | 默认值
---|---|---|---
content | 富文本内容（html形式） | `String` | -

#### 事件
##### Editor
属性 | 说明 | 类型 | 默认值
---|---|---|---
@blur | 富文本失去焦点 | `editor` | -
@focus | 富文本获取焦点 | `editor` | -
@change | 富文本内容变化 | `{ html, text, editor }` | -

#### Slot
属性 | 说明
---|---
toolbar | 工具栏内容(外层节点需要有id属性为'toolbar')
extend | 组件提供的工具栏上的尾部工具拓展(和`toolbar`插槽不能同时使用)

## 基础用法

```vue
<template>
    <vc-editor 
        ref="editor"
        v-model="value"
        :options="options"
        :disabled="disabled"
    />
    <vc-editor-view :content="value" />

    <vc-editor 
        ref="editor"
        v-model="formValidate.value"
        :disabled="disabled"
    >
        <div id="toolbar" slot="toolbar">
            <span class="ql-formats">
                <button class="ql-bold"/>
                <button class="ql-italic"/>
                <button class="ql-underline"/>
                <button class="ql-strike"/>
            </span>
        </div>
    </vc-editor>
</template>
<script>
import Editor from '../editor';

export default {
    name: "vc-editor-basic",
    components: {
        "vc-editor": Editor,
        "vc-editor-view": Editor.View,
    },
    data() {
        return {
            options: {
                toolbar: '#toolbar',
            },
            disabled: false,
            value: ''
        };
    },
    computed: {
        
    },
    mounted() {
        console.log(this.$refs.editor);
    },
    methods: {
        
    }
};
</script>

```