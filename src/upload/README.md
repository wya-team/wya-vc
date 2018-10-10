## [Demo Basic](https://wya-team.github.io/wya-vc/dist/upload/basic.html)
## 功能
上传功能

- 多图上传为遍历单图提交，同时上传；

## 待开发

- 多图模式，队列上传；
- show-tips

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
tag | 外层标签`span / div / **` | `str` | span
prefix-cls | 外层标签prefixCls | `str` | c-upload
multiple | 多图上传 | `bool` | false
disabled | 禁用，增加样式`${prefixCls}-disabled` | `str` | false
accept | 文件格式 | `str` | -
type | 文件归类（images / file）,提前定位文件类型（内置图片压缩） | `str` | images
request | 请求函数 | `() -> Promise` | -
url | ajax:url -> 默认通过`RcInstance.init`注册 | `str` | -
name | 上传给后端获取的key | `str` | `Filedata`(业务历史原因...)
size | 限制上传文件大小, 默认不限制（单位：mb） | `float` | `0`
extra | ajax需要传递的参数 | `obj` | {}
headers | ajax: headers | `obj` | {}
show-tips | 展示显示进度弹窗 | `bool` | `false`


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
`@file-before` | 单个文件上传前回调 | `func` | -
`@file-start` | 单个文件上传开始回调 | `func` | -
`@file-progress` | 单个文件上传过程回调(e.percent, file.current, file.total等可用参数) | `(e, file) => void` | -
`@file-success` | 单个文件上传过程成功回调(res, file.current, file.total等可用参数) | `(res, file) => void` | -
`@file-error` | 单个文件上传过程失败回调(res, file.current, file.total等可用参数) | `(res, file) => void` | -
`@begin` | 一个周期上传前的回调(info: {}) | `(files) => void` | -
`@complete` | 一个周期上传后的回调(info: {}) | `(info) => void` | -



## 基础用法

```jsx

```