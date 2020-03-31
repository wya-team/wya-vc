## [Demo Basic](https://wya-team.github.io/wya-vc/dist/upload-picker/basic.html)
## 功能
多文件类型上传功能

## 待开发


## 关联组件清单

- Upload 
- Icon
- Progress
- Spin


## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
picker | upload的类型, 可选`['image', 'video', 'file']` | `Arary` | `['image']`
sortable | 可否拖拽排序 | `Boolean` | `false`
uploadOpts | `upload`的属性 | `Object` | `{}`
dataSource | 数据源 | `Array` | `[]`
max | 上传数量的最大值 | `Number`、`Object` | ` Number.MAX_SAFE_INTEGER`
disabled | 是否禁用 | `Boolean` | `false`
formatter | 对上传成功后的数据格式化 | `Function` | |
boxClassName | 上传控件的样式 | `String` | |
imgsPreviewOpts | 图片预览的配置 | `Object` | |
imgClassName | 图片item的样式 | `String` | |
videoClassName | 视频item的样式 | `String` | |
fileClassName | 文件item的样式 | `String` | |
urlKey | 上传成功后那远程地址的key | `String` | `url` |
gallery | 图片上传调用商品橱窗 | `Function`、`Boolean` | `true`


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---


## 基础用法
```html
<template>
    <div style="margin: 100px;">
        <vc-upload-picker
            v-model="dataSource"
            :picker="['image', 'video', 'file']"
        >
        <!-- 限制大小上传以及api -->
        </vc-upload-picker>
    </div>
</template>
```