## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/drawer/basic.html)
## 功能
抽屉（Drawer）

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 抽屉是否显示，可使用 v-model 双向绑定数据 | `Boolean` | false
title | 抽屉的标题 | `String` | -
width | 抽屉的宽度（placement为`left`和`right`可设置）| `Number` | 300
height | 抽屉的高度(placement为`top`和`bottom`可设置) | `Number` | 300
mask | 遮罩是否显示 | `Boolean` | true 
mask-style | 遮罩的样式 | `Object` | -
mask-closable | 点击遮罩关闭 | `Boolean` | true
scrollable | 页面是否可以滚动 | `Boolean` | false
placement | 抽屉的方向，可选`top` `right` `bottom` `left` | `String` | right


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
cancel | 关闭时的回调 | `any` | -

#### Drawer slot

名称 | 说明
--- | ---|
header | 自定义页头内容

## 基础用法

```html
<template>
    <vc-button @click="handleDrawer">点击出现抽屉</vc-button>
    <vc-drawer
        v-model="visible"
        :height="500"
        placement="bottom"
        @cancel="handleCancel"
    > 
</template>
<script>
    export default{
        data () {
            return {
                visible: false;
            }
        },
        methods: {
            handleDrawer(e) {
                this.visible = true;
            }
            handleCancel() {
                console.log('取消的回调')
            }
        }
    }
<script>
```