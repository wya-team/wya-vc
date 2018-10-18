## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/__tpl__/basic.html)
## 功能
tpl

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
renderRow | 渲染单个元素 | function | defaultRenderRow
dataSouce | 数据 | Array | defaultDataSouce
dispaly   | 添加到外层draggable的div的样式上 | String | inline-block
mask  | 是否使用默认遮罩（可以false后自己在rendeRow里写） |Boolean | true
keyName | dataSource中作为元素的key的属性名| String,Number | 'key'


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
move | 移动时触发 | function(dragedIndex，overedIndex) | -
remove | 删除时触发 | function(index)  | -

### 方法
函数名 | 说明 | 参数 | 默认参数
---|---|---|---
handleLeft | 左移 | (index:Number) | 必传
handleRight | 右移 | (index:Number) | 必传
handleRemove | 删除 | (index:Number) | 必传




## 基础用法

```jsx

```