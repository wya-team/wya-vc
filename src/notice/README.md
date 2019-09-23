## [Demo Basic](https://wya-team.github.io/wya-vc/dist/modal/basic.html)
## 功能
通知(无手机端)

## API

#### config属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
title | 通知的标题 | `String`or`Function` | -
content | 通知的内容 | `String`or`Function` | -
duration | 自动关闭的延时，单位秒，不关闭可以写 0 | `Number` | 4.5
closable | 手动关闭提示 | `Boolean` | true
beforeClose | 关闭前的回调 | `Function`，要返回`boolean` | -
onClose | 关闭后的回调 | `Function` | -

#### 事件
- `Notice.open(config)`  没有图标
- `Notice.success(config)`
- `Notice.info(config)`
- `Notice.error(config)`
- `Notice.warning(config)`

## 基础用法

```jsx
Notice.open({
	title: '这是标题',
	content: '这是内容',
	duration: 0,
	onClose() {
		console.log('回调');
	}
});
```