## 通知提醒（Notice）
### 何时使用
在界面右上角显示可关闭的全局通知，可设置描述信息

### 基础用法
基本用法，默认在 4.5秒后关闭。如果 content 参数为空或不填，则自动应用仅标题模式下的样式。

:::RUNTIME
```html
<template>
	<div>
		<div>
			<vc-button :wait="0" @click="handleClick('info')">
				消息
			</vc-button>
			<vc-button :wait="0" @click="handleClick('success')">
				成功
			</vc-button>
			<vc-button :wait="0" @click="handleClick('error')">
				错误
			</vc-button>
			<vc-button :wait="0" @click="handleClick('warn')">
				警告
			</vc-button>
			<vc-button :wait="0" @click="handleClick('open')">
				无图标
			</vc-button>
		</div>
	</div>
</template>
<script>
import { Button, Notice } from '@wya/vc';

window.Notice = Notice;

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-button': Button
	},
	data() {
		return {
		};
	},
	computed: {

	},
	methods: {
		handleClick(type) {
			 if (type === 'info') {
				Notice.info({
					title: '消息',
					content: '测试消息的提示',
					onClose() {
						console.log('回调');
					}
				})
			}else if (type === 'success') {
				Notice.success({
					title: '成功',
					content: '成功的提示',
					onClose() {
						console.log('回调');
					}
				});
			} else if (type === 'error') {
				Notice.error({
					title: '错误',
					content: '测试错误的提示',
					onClose() {
						console.log('回调');
					}
				});
			} else if (type === 'warn') {
				Notice.warning({
					title: '警告',
					content: '测试警告的提示',
					onClose() {
						console.log('回调');
					}
				});
			} else if(type === 'open') {
				Notice.open({
					title: '这是标题',
					content: '测试无图标的提示',
					onClose() {
						console.log('回调');
					}
				});
			}
		}
	}
};
</script>

```
:::

### 自定义关闭时间
使用duration属性，为0则不自动关闭，默认为4.5，也可以设置closable，是否可以手动关闭提醒，默认为true。

:::RUNTIME
```html
<template>
	<div>
		<div>
			<vc-button :wait="0" @click="handleClick()">
				手动关闭提醒
			</vc-button>
		</div>
	</div>
</template>
<script>
import { Button, Notice } from '@wya/vc';

window.Notice = Notice;

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-button': Button
	},
	methods: {
		handleClick(type) {
			Notice.info({
				title: '手动关闭提醒',
				content: '需要点击关闭按钮关闭提醒',
				duration: 0,
				onClose() {
					console.log('回调');
				}
			});
		}
	}
};
</script>

```
:::

#### render函数渲染

:::RUNTIME
```html
<template>
	<div>
		<vc-button :wait="0" @click="handleClickrender">
			根据render函数渲染
		</vc-button>
	</div>
</template>
<script>
import { Button, Notice } from '@wya/vc';

window.Notice = Notice;

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-button': Button
	},
	methods: {
		handleClickrender() {
			Notice.info({
				content: h => {
					return <span>
						使用<span style="color: #5495f6">jsx</span>渲染
					</span>
				}
			});
		}
	}
};
</script>

```
:::

### API

### config属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
title | 通知的标题 | `String`,`() => String` | - | - |
content | 通知的内容 | `String`,`() => String ｜ jsx` | - | - |
duration | 自动关闭的延时，单位秒，不关闭可以写 0 | `Number` | - | 4.5|
closable | 手动关闭提示 | `Boolean` | - | `true`
mode | 通知的图标类型 | `String` | `info`,`success`,`error`,`warning` | - |
beforeClose | 关闭前的回调 | `() => Boolean` | - | - |
onClose | 关闭后的回调 | - | - | - |

### 事件
- `Notice.open(config)`  没有图标
- `Notice.success(config)`
- `Notice.info(config)`
- `Notice.error(config)`
- `Notice.warning(config)`
