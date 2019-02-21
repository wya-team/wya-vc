## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/input/basic.html)
## 功能
input（输入框）

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
type | 输入框类型 `text` `textarea` `password` | `String` | text
placeholder | 占位文本 | `String` | -
value | 绑定的值，用v-modal 双向绑定 | `String | Number` | -
disabled | 禁用输入框 | `Boolean` | false 
clearable | 显示清空按钮 | `Boolean` | false
readonly | 输入框只读 | `Boolean` | false
maxlength | 最大输入长度 | `Number` | -
autofocus | 自动获取焦点 | `Boolean` | false
autosize | textarea 自动是适应高度，可传入对象 {maxRows:2; minRows:2} | `Boolean | Object` | false
rows | textarea 默认行数 | `Number` | 1

#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
change | 数据改变时触发 | `any` | -
focus | 输入框聚焦是触发 | - | -
blur | 输入框失焦时 | - | -
enter | 按下回车键是触发 | - | -


## 基础用法

```html
<template>
    <div>
        <vc-input 
            v-model="value"
            clearable
            placeholder="显示placeholder"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
            @enter="handleEnter"
        />
        <vc-input 
            v-model="value"
            style="margin-top: 10px;"
            disabled
            placeholder="被禁用的input"
        />
        <vc-input 
            v-model="textvalue"
            :autosize="true"
            type="textarea"
            style="margin-top: 10px;"
            placeholder="被禁用的textarea"
        />
    </div>
</template>
<script>
    export default{
        data() {
            return {
                value: '',
                textvalue: ''
            };
        },
        methods: {
            handleChange() {
                console.log(this.value);
            },
            handleFocus() {
                console.log('聚焦的回调');
            },
            handleBlur() {
                console.log('失焦的回调');
            },
            handleEnter() {
                console.log('回车键的回调');
            }
        }
    }
</script>
```