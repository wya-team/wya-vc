## 全局提示（Message）
轻量级的信息反馈组件，在顶部居中显示，并自动消失。有多种不同的提示状态可选择。

### 何时使用
- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

### 基础用法
有`info`、`success`、`error`、`warn`、`loading` 4种类型的提示样式。

:::RUNTIME
```html
<template>
	<div class="v-message-basic">
		<vc-button @click="handleClick('info')">
			信息提示
		</vc-button>
		<vc-button @click="handleClick('success')">
			成功的提示
		</vc-button>
		<vc-button @click="handleClick('error')">
			失败的提示
		</vc-button>
		<vc-button @click="handleClick('warn')">
			警告的提示
		</vc-button>
		<vc-button @click="handleClick('loading')">
			loading的提示
		</vc-button>
	</div>
</template>
<script>
import { Button, Message } from '@wya/vc';

export default {
	components: {
		"vc-button": Button
	},
	methods: {
		handleClick(type) {
			if (type === 'success') {
				Message.success('成功的提示');
			} else if (type === 'error') {
				Message.error({
					content: '警告'
				});
			} else if (type === 'warn') {
				Message.warning('测试警告的提示');
			} else if (type === 'loading') {
				Message.loading('正在加载中', 1);
			} else {
				Message.info('信息提示');
			}
		}
	}
};
</script>
```
:::

### 改变Message消失的时间
通过`duration`控制时间，默认显示时长`1.5s`。

:::RUNTIME
```html
<template>
	<div class="v-message-duration">
		<vc-button @click="handleClick">
			5s后消失
		</vc-button>
	</div>
</template>
<script>
import { Button, Message } from '@wya/vc';

export default {
	components: {
		"vc-button": Button
	},
	methods: {
		handleClick() {
			Message.success({
				content: '成功的提示',
				duration: 5,
			});
		}
	}
};
</script>
```
:::

### 手动关闭Message
将参数设置为一个对象，并指定 `closable` 为 true 后可以手动关闭提示。

:::RUNTIME
```html
<template>
	<vc-button @click="handleClick">
		手动关闭
	</vc-button>
</template>
<script>
import { Button, Message } from '@wya/vc';

export default {
	components: {
		"vc-button": Button
	},
	methods: {
		handleClick() {
			Message.success({
				content: '成功的提示',
				duration: 0,
				closable: true
			});
		}
	}
};
</script>
```
:::

### 是否显示透明遮罩层
有透明遮罩时不能操作页面上的任何dom。

:::RUNTIME
```html
<template>
	<div>
		<vc-button @click="handleClick">
			没有透明遮罩
		</vc-button>
		<vc-button @click="handleClickHasMask">
			有透明遮罩
		</vc-button>
	</div>
</template>

<script>
import { Button, Message } from '@wya/vc';
export default {
	components: {
		"vc-button": Button
	},
	methods: {
		handleClick() {
			Message.success({
				content: '成功的提示',
				mask: false,
				maskClosable: false
			});
		},
		handleClickHasMask() {
			Message.success({
				content: '成功的提示',
				mask: true,
				maskClosable: false
			});
		}
	}
};
</script>
```
:::

### 支持render函数
使用 Render 函数自定义内容。

:::RUNTIME
```html
<template>
	<vc-button @click="handleClick">
		使用render函数
	</vc-button>
</template>

<script>
import { Button, Message } from '@wya/vc';
export default {
	components: {
		"vc-button": Button
	},
	methods: {
		handleClick() {
			Message.info({
				content: h => {
					return h('span', [
						'This is created by ',
						h('a', 'render'),
						' function'
					]);
				}
			});
		}
	}
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
content | 提示的内容 | `String`、`Function` | - | -
mask | 是否显示透明遮罩 | `Boolean` | - | `true`
maskClosable | 是否可以通过点击透明遮罩层关闭提示 | `Boolean` | - | `true`
duration | 自动关闭的延时，单位秒，不关闭可以写 0 | `Number` | - | 1.5
closable | 手动关闭提示 | `Boolean` | - | `false`
render | 自定义描述内容，使用 Vue 的 Render 函数 | `Function` | - | -
mode | 提示主题 | `String` | `info`、`loading`、`success`、`error`、`warning` | `info`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---|---
close | 关闭提示 | - | - 