## [Demo Basic](https://wya-team.github.io/wya-vc/dist/input/basic.html)
## 功能
input（输入框）

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
type | 输入框类型 `text` `password` | `String` | text
placeholder | 占位文本 | `String` | -
value | 绑定的值，用v-modal 双向绑定 | `String | Number` | -
disabled | 禁用输入框 | `Boolean` | false 
clearable | 显示清空按钮 | `Boolean` | false
readonly | 输入框只读 | `Boolean` | false
maxlength | 最大输入长度 | `Number` | -
autofocus | 自动获取焦点 | `Boolean` | false
afloat | append,prepend置顶显示，盖住虚线 | `Boolean` | false

#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
change | 数据改变时触发 | `any` | -
focus | 输入框聚焦是触发 | - | -
blur | 输入框失焦时 | - | -
enter | 按下回车键是触发 | - | -
before | 点击加减按钮改变value前执行 | `function` | -
after | 点击加减按钮改变value后或者失焦后执行 | `function` | -

> 注：after事件与before的区别，before是成功之后才会改变value，after只会在失败之后重新修改值

#### Slot

> 仅两项

属性 | 说明
---|---
prepend | 前缀
append | 后缀


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