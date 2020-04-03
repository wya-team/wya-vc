## 对话框（Modal）
模态对话框，在浮层中显示，引导用户进行相关操作。Modal提供了两种用法，普通组件使用和封装好的简洁实例调用。

### 基础用法
最简单的使用方法，通过控制属性value来显示 / 隐藏对话框。可以使用 v-model 实现双向绑定。默认按键盘ESC键也可以关闭。

:::RUNTIME
```html
<template>
	<div class="v-modal-basic">
		<vc-button @click="handleModal">
			点击出现对话框
		</vc-button>
		<vc-modal 
			v-model="visible"
			:mask-closable="true"
			title="标题1"
			@close="handleClose"
			@cancel="handleCancel"
			@ok="handleOk"
		>
			<div>Content</div>
		</vc-modal>
	</div>
</template>

<script>
import { Button, Modal } from '@wya/vc';
export default {
	components: {
		"vc-button": Button,
		'vc-modal': Modal,
	},
	data() {
		return {
			visible: false
		}
	},
	mounted() {
	},
	methods: {
		handleModal() {
			this.visible = true;
		},
		handleClose() {
			console.log('关闭后都会触发');
		},
		handleCancel() {
			console.log('点击取消这个按钮时回调');
		},
		handleOk(e, callback) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					callback();
					resolve();
				}, 1000);
			}).catch((res) => {
				console.log(res);
			});
		}
	}
};
</script>
<style>
.v-modal-basic > button {
	margin-bottom: 10px;
}
.vc-modal__header > p {
	margin-bottom: 0 !important;
}
</style>
```
:::

### 自定义样式
可自由控制Modal的组成部分，比如页头、页脚、按钮、可以根据`size`来切换Modal的大小，也可通过`width`设置Modal宽度

:::RUNTIME
```html
<template>
	<div class="v-modal-basic">
		<vc-button @click="handleLarge">
			大弹框
		</vc-button>
		<vc-button @click="handleMedium">
			中弹框
		</vc-button>
		<vc-button @click="handleSmall">
			小弹框
		</vc-button>
		<vc-button @click="handleCustom">
			自定义header和footer
		</vc-button>
		<vc-button @click="handleWidth">
			设置宽度
		</vc-button>
		<vc-modal 
			v-model="visible"
			title="大弹框"
			size="large"
		>
			<div>Content</div>
		</vc-modal>
		<vc-modal 
			v-model="visible2"
			title="中弹框"
			size="medium"
		>
			<div>Content</div>
		</vc-modal>
		<vc-modal 
			v-model="visible3"
			title="小弹框"
			sizee="small"
		>
			<div>Content</div>
		</vc-modal>
		<vc-modal 
			v-model="visible4"
			:mask-closable="true"
		>
			<template #header>
				我是自定义的header
			</template>

			<template #footer>
				我是自定义的footer
			</template>
		</vc-modal>
		<vc-modal 
			v-model="visible5"
			title="宽度为300的弹框"
			sizee="small"
			:width="300"
		>
			<div>Content</div>
		</vc-modal>
	</div>
</template>

<script>
import { Button, Modal } from '@wya/vc';
export default {
	components: {
		"vc-button": Button,
		'vc-modal': Modal,
	},
	data() {
		return {
			visible: false,
			visible2: false,
			visible3: false,
			visible4: false,
			visible5: false
		}
	},
	mounted() {
	},
	methods: {
		handleLarge() {
			this.visible = true;
		},
		handleMedium() {
			this.visible2 = true;
		},
		handleSmall() {
			this.visible3 = true;
		},
		handleCustom() {
			this.visible4 = true;
		},
		handleWidth() {
			this.visible5 = true;
		}
	}
};
</script>
<style>
.v-modal-basic > button {
}
</style>
```
:::

### 拖拽弹框
可以拖拽移动弹框

:::RUNTIME
```html
<template>
	<div class="v-modal-basic">
		<vc-button @click="handleModal">
			可拖拽的对话框
		</vc-button>
		<vc-modal 
			v-model="visible"
			:mask-closable="true"
			title="点击我进行拖拽"
			draggable
		>
			<div>Content</div>
		</vc-modal>
	</div>
</template>

<script>
import { Button, Modal } from '@wya/vc';
export default {
	components: {
		"vc-button": Button,
		'vc-modal': Modal,
	},
	data() {
		return {
			visible: false
		}
	},
	mounted() {
	},
	methods: {
		handleModal() {
			this.visible = true;
		}
	}
};
</script>
<style>
.v-modal-basic > button {
	margin-bottom: 10px;
}
</style>
```
:::

### 实例化使用方法

:::RUNTIME
```html
<template>
	<div class="v-modal-basic">
		<vc-button @click="handleModal('info')">
			消息
		</vc-button>
		<vc-button @click="handleModal('success')">
			成功
		</vc-button>
		<vc-button @click="handleModal('error')">
			错误
		</vc-button>
		<vc-button @click="handleModal('warning')">
			警告
		</vc-button>
	</div>
</template>

<script>
import { Button, Modal } from '@wya/vc';
export default {
	components: {
		"vc-button": Button,
		'vc-modal': Modal,
	},
	data() {
		return {
			visible: false
		}
	},
	mounted() {
	},
	methods: {
		handleModal(type) {
			switch(type) {
				case 'info': 
					Modal.info({
						title: 'info',
						content: 'content',
						okText: '自定义的按钮',
						mask: false,
						loading: true,
						onOk: () => {
							console.log('23333')
						}
					})
					break;
				case 'success': 
					Modal.success({
						title: 'success',
						content: 'content',
					})
					break;
				case 'error': 
					Modal.error({
						title: 'error',
						content: 'content',
					})
					break;
				case 'warning': 
					Modal.warning({
						title: 'waring',
						content: 'content',
					})
					break;
			}
		}
	}
};
</script>
<style>
.v-modal-basic > button {
}
</style>
```
:::

### 自定义内容

:::RUNTIME
```html
<template>
	<div class="v-modal-basic">
		<vc-button @click="handleModal">
			自定义内容
		</vc-button>
	</div>
</template>

<script>
import { Button, Modal } from '@wya/vc';
export default {
	components: {
		"vc-button": Button,
		'vc-modal': Modal,
	},
	data() {
		return {
			visible: false,
		}
	},
	mounted() {
	},
	methods: {
		handleModal() {
			Modal.info({
				title: 'info',
				content: (h) => {
					return (
						<div>
							<textarea
								placeholder="请输入内容"
							/>
						</div>
					)
				}
			})
		}
	}
};
</script>
<style>
.v-modal-basic > button {
}
</style>
```
:::

### 移动端基础用法

:::RUNTIME
```html
<template>
	<div class="v-modal-basic">
		<button @click="handleModal">
			移动端弹框
		</button>
		<button @click="handleModal2">
			移动端弹框（实例化使用方法）
		</button>
		<button @click="handleModal3">
			移动端弹框（弹框内多个按钮）
		</button>
		<vcm-modal 
			v-model="visible"
			:mask-closable="true"
			title="标题"
			content="内容"
		/>
	</div>
</template>

<script>
import { MModal } from '@wya/vc';
export default {
	components: {
		'vcm-modal': MModal,
	},
	data() {
		return {
			visible: false,
		}
	},
	mounted() {
	},
	methods: {
		handleModal() {
			this.visible = !this.visible
		},
		handleModal2() {
			MModal.alert({
				title: '标题1',
				content: '啦啦',
				onOk: () => {
					console.log('点击确定这个按钮时回调');
				},
				onCancel: (e, done) => {
					setTimeout(() => {
						done();
						console.log('点击确定这个按钮时回调');
					}, 3000);
					return true;
				},
				onClose: () => {
					console.log('关闭后都会触发');
				}
			});
		},
		handleModal3() {
			MModal.operation({
				actions: [
					{
						text: '1',
						onPress: () => console.log(`点击了第1个按钮`)
					},
					{
						text: '2',
						onPress: () => console.log(`点击了第2个按钮`)
					},
					{
						text: '3',
						onPress: () => console.log(`点击了第3个按钮`)
					}
				]
			});
		}
	}
};
</script>
<style>
.v-modal-basic > button {
}
</style>
```
:::

### API

### 基础属性

属性 | 说明 | 类型 | 可选值 |默认值
---|---|---|---|---
model | 对话框的类型 | `String` |  `info` `success` `error` `warning` |-
title | 内容标题| `String` | - |-
content | 内容,可以是jsx | `String` `Function` | - |-
footer | 是否显示footer | `Boolean` | - |-
visible | 对话框是否显示，可用v-model双向绑定 | `Boolean` | - |false
title | 对话框标题，如果使用slot自定义header，则title无效 | `String` | - | -
size | 对话框的三个默认大小 | `String` | `small` `medium` `large` |small
styles | 设置`.-wrap`的style，例如：{top: '100px'} | `Object` | -
ok-text |自定义确定按钮的文案 | `String` `Boolean` | - |确定
cancel-text | 自定义取消按钮的文案 | `String` `Boolean`  | - | 取消
width | 对话框的宽度 | `Number` | - | 400
mask | 遮罩层是否显示 | `Boolean` | - | true
mask-closable | 点击遮罩层是否关闭 | `Booelan` | - | true
esc-closable | 点击esc是否关闭 | `Boolean` | - | true
scrollable | 页面是否可以滚动 | `Boolean` | - | false
draggable | 是否可以拖拽 | `Boolean` | - | false
close-with-cancel | `主动`关闭时出发cancel事件 | `Boolean` | - | true

### 移动端基础属性

属性 | 说明 | 类型 | 可选值 |默认值
---|---|---|---|---
model | 对话框的类型 | `String` |  `alert` `operation`  |-
title | 内容标题| `String` `Boolean` | - |-
content | 内容,可以是jsx | `String` `Function` `Boolean` | - |-
footer | 是否显示footer | `Boolean` | - |-
visible | 对话框是否显示，可用v-model双向绑定 | `Boolean` | - |false
title | 对话框标题，如果使用slot自定义header，则title无效 | `String` | - | -
styles | 设置`.-wrap`的style，例如：{top: '100px'} | `Object` | -
ok-text |自定义确定按钮的文案 | `String` `Boolean` | - |确定
cancel-text | 自定义取消按钮的文案 | `String` `Boolean`  | - | 取消
width | 对话框的宽度 | `Number` | - | 400
mask | 遮罩层是否显示 | `Boolean` | - | true
mask-closable | 点击遮罩层是否关闭 | `Booelan` | - | true
close-with-cancel | `主动`关闭时出发cancel事件 | `Boolean` | - | true

### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
ok | 点击确定的回调, 配合Promise触发loading效果 | `Function` | -
cancel | 点击取消的回调 | `Function` | -
close | 弹窗关闭后触发(可作用与portal) | `Function` | -

### 额外事件（兼容portal）

属性 | 说明 | 类型 | 默认值
---|---|---|---
sure | 确定时触发 | `Function` | -

### Modal slot

名称 | 说明
--- | ---|
header | 自定义页头内容
footer | 自定义页脚内容

### 方法

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

### TODO
使用`renderHeader`, `renderFooter` 方法式调用`slot`写法