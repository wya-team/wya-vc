## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/__tpl__/basic.html)
## 功能
Message全局提示

## API

#### 属性
如果传入参数为对象时

属性 | 说明 | 类型 | 默认值
---|---|---|---
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
Message.success('全局提示文字');

Message.success('全局提示文字', {
    maskClosable: false,
    duration: 10,
    closable: true,
    onClose: () => {
        //回调
    }
});

//自定义render函数
Message.info({
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
Message.info(String, {});

Message.success(String, {});

Message.warn(String, {});

Message.error(String, {});

Message.loading(String, {});
```