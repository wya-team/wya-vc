## [Demo Basic](https://wya-team.github.io/wya-vc/dist/progress/basic.html)
## 功能
进度条（Progress）

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
type | 进度条类型 `line` `circle` | `String` | line
percent | 进度百分比 | `Number` | 0 
status | 状态 `normal` `success` `error` `active` | `String` | normal
size | 环形进度条画布宽度（只有type为`circle`时可用） | `Number` | 120
stroke-width | 进度条宽度 | `Number` | 6
stroke-color | 环形进度条颜色 | `String` | #2d8cf0 
show-info | 是否显示进度数值或者状态图标 | `Boolean` | true
error-color| error的颜色 | `String` | #f5222d
success-color| success | `String` | #52c41a
normal-color| normal | `String` | #5495f6

#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
- | - | `any`|---

#### Slot

属性 | 说明
---|---
- | -



## 基础用法

```html
<template>
    <div>
        <div>
            <vc-progress
                :stroke-width="7"
                :percent="50"
                status="active"
            />
        </div>
        <div>
            <vc-progress
                :stroke-width="7"
                :percent="50"
                status="error"
            />
        </div>
        <div>
            <vc-progress
                :stroke-width="7"
                :percent="100"
            />
        </div>
        <vc-progress
            :stroke-width="5" 
            :percent="70"
            type="circle"
        />
        <vc-progress
            :stroke-width="10" 
            :percent="50"
            type="circle"
        >
            <div>自定义的数据</div>
        </vc-progress>
    </div>
</template>
```