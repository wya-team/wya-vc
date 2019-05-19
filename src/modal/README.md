## [Demo Basic](https://wya-team.github.io/wya-vc/dist/modal/basic.html)
## 功能
Modal(对话框)

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
model | `info|success|error|warning` | `String` | -
title | 内容标题| `String` | -
content | 内容,可以是jsx | `String|Function` | -
visible | 对话框是否显示，可用v-model双向绑定 | `Boolean` | false
title | 对话框标题，如果使用slot自定义header，则title无效 | `String` | -
size | 对话框的三个默认大小 `small` `medium` `large` | `String` | small
style | 设置`.-wrap`的style，例如：{top: '100px'} | `Object` | -
ok-text |自定义确定按钮的文案 | `String` | 确定
cancel-text | 自定义取消按钮的文案 | `String` | 取消
width | 对话框的宽度 | `Number` | 400
mask | 遮罩层是否显示 | `Boolean` | true
mask-closable | 点击遮罩层是否关闭 | `Booelan` | true
esc-closable | 点击esc是否关闭 | `Boolean` | true
scrollable | 页面是否可以滚动 | `Boolean` | false
draggable | 是否可以拖拽 | `Boolean` | false
close-with-cancel | `主动`关闭时出发cancel事件 | `Boolean` | true

#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
ok | 点击确定的回调, 配合Promise触发loading效果 | `Function` | -
cancel | 点击取消的回调 | `Function` | -
close | 弹窗关闭后触发(可作用与portal) | `Function` | -

#### 额外事件（兼容portal）

属性 | 说明 | 类型 | 默认值
---|---|---|---
sure | 确定时触发 | `Function` | -

#### Modal slot

名称 | 说明
--- | ---|
header | 自定义页头内容
footer | 自定义页脚内容

#### 方法

属性 | 说明 | 类型 | 默认值
---|---|---|---
resetOrgin | 重新设置原始坐标, 关系到动画 | `Function` | -

```javascript

Modal.info({});

Modal.success({});

Modal.error({});

Modal.warning({});

MModal.alert({});

MModal.operation({});

```

> 方法同上属性值, 事件使用`onOk`, `onCancel`

## TODO
使用`renderHeader`, `renderFooter` 方法式调用`slot`写法

## 基础用法

```vue
<template>
	<div>
		<div @click="handleShow">点击触发</div>
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
			@close="handleClose"
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
			handleShow(e) {
				this.visible = true;
			},
			handleConfirm() {
				Modal.error({
					title: 'confirm',
					content: '啦啦啦啦啦啦啦啦啦啦啦',
					okText: '啦啦啦啦',
					mask: false,
					loading: true,
					ok: () => {
						return true; //确定按钮的异步回调
					}
				}).then((res) => {
					console.log(res);
				}).catch((err) => {
					console.log(err);
				});
			}
			handleOk() {
				console.log('确定的回调');

			},
			handleCancel() {
				console.log('取消的回调')
			},
			handleClose() {
				console.log('关闭')
			}
		}
	}
</script>

<!--自定义header和footer -->
<vc-modal>
	<div slot="header">我是标题</div>
	<div slot="footer">
		<button>取消</button>
		<button>确定</button>
	</div>
</vc-modal>
```