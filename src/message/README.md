## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/__tpl__/basic.html)
## 功能
Message全局提示

## API

#### 属性
如果传入参数为对象时
属性 | 说明 | 类型 | 默认值
---|---|---|---
content | - | `String` | -
maskClosable | 是否有透明遮罩层 | `Boolean` | true
duration | 自动关闭的延时，单位秒，不关闭可以写 0 | `Number` | 1.5
closable | 手动关闭提示 | `Boolean` | false
render | 自定义描述内容，使用 Vue 的 Render 函数 | `Function` | -
onClose | 关闭后的回调 | `Function` | -


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
- | - | `any` | -



## 基础用法

```js
//传入参数为字符串
Message.success('全局提示分文字');
//传入参数为数组
Message.success({
    content: '全局提示分文字',
    maskClosable: false,
    duration: 10,
    closable: true,
    render: () => {
        //自定义函数
    },
    onClose: () => {
        //回调
    }
});
//
Message.info(config);
Message.success(config);
Message.warn(config);
Message.error(config);
Message.loading(config);
```