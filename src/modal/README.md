## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/modal/basic.html)
## 功能
Modal(对话框)

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 对话框是否显示，可用v-modal双向绑定 | `Boolean` | false
title | 对话框标题，如果使用slot自定义header，则title无效 | `String` | -
size | 对话框的三个默认大小 `small` `medium` `large` | `String` | small
style | 设置`.-wrap`的style，例如：{top: '100px'} | `Object` | -
ok-text |自定义确定按钮的文案 | `String` | 确定
cancel-text | 自定义取消按钮的文案 | `String` | 取消
width | 对话框的宽度 | `Number` | 400
mask | 遮罩层是否显示 | `Boolean` | true
mask-closable | 点击遮罩层是否关闭 | `Booelan` | true
esc-closable | 点击esc是否关闭 | `Boolean` | true
scrollable | 页面是否可以滚动 | `Boolean` | false
draggable | 是否可以拖拽 | `Boolean` | false

通过以下方式调用
`Modal.info(config)`

`Modal.success(config)`

`Modal.error(config)`

`Modal.warning(config)`

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 对话框是否显示，可用v-modal双向绑定 | `Boolean` | false
title | 对话框标题，如果使用slot自定义header，则title无效 | `String` | -
content | 对话框内容 | `String` | -
render | 自定义描述内容，使用 Vue 的 Render 函数 | `Function` | -
showCancel | 是否显示取消按钮 | `Boolean` | false
size | 对话框大小 `small` `large` | `String` | small

#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
ok | 点击确定的回调 | `Function` | -
cancel | 点击取消的回调 | `Function` | -

#### Modal slot

名称 | 说明
--- | ---|
header | 自定义页头内容
footer | 自定义页脚内容


## 基础用法

```html
<template>
    <div>
        <div @click="showModal">点击触发</div>
        <vc-modal 
            v-model="visible"
            title="标题2"
            ok-text="保存"
            cancel-text="关闭"
            :mask="false"
            :mask-closable="false"
            :esc-closable="false"
            :scrollable="true"
            :draggable="true"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            啦啦啦啦
        </vc-modal>
    </div>
<template>
<script>
    export default {
        data () {
            return {
                visible: false;
            }
        },
        methods: {
            showModal(e) {
                this.visible = true;
            },
            handleOk() {
                console.log('确定的回调')
            },
            handleCancel() {
                console.log('取消的回调')
            }
        }
    }
</script>

<!--自定义header和footer -->
 <vc-modal>
    <div slot="header">我是标题</div>
    <div slot="footer">
        <button>取消</button>
        <button>确定</button>
    </div>
</vc-modal>
```