## [Demo Basic](https://wya-team.github.io/wya-vc/dist/text/basic.html)
## 功能
文字行数限制（必要时父元素给固定宽度最好）

> 不成熟的组件

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
line | 行数 | `Number` | 0
indent | 缩进 | `Number` | 0
suffix | 后缀 | `String` | '...'


## 基础用法

```vue
<!-- 最好是父元素带宽度 -->
<div style="width: 200px">
	<vc-text value="xxxx" :line="2" />
</div>
```
