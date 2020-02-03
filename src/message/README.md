## 全局提示（Message）
各种样式的全局提示

### 何时使用

需要提示弹框时候使用

### 基础用法
有`info` `success` `error` `warn` `loading` 4种类型的提示样式

:::RUNTIME
```html
<template>
	<div class="v-message-basic">
		<vc-button :wait="0" @click="handleClick('info')">
			信息提示
		</vc-button>
		<vc-button :wait="0" @click="handleClick('success')">
			成功的提示
		</vc-button>
		<vc-button :wait="0" @click="handleClick('error')">
			警告的提示
		</vc-button>
		<vc-button :wait="0" @click="handleClick('warn')">
			失败的提示
		</vc-button>
		<vc-button :wait="0" @click="handleClick('loading')">
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
	mounted() {
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
<style>
</style>
```
:::

### 改变Message消失的时间
通过`duration`控制时间

:::RUNTIME
```html
<template>
	<div class="v-message-duration">
		<vc-button :wait="0" @click="handleClick">
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
	mounted() {
	},
	methods: {
		handleClick() {
			Message.success({
				content: '成功的提示',
				duration: 5
			});
		}
	}
};
</script>
<style>
</style>
```
:::

### 手动关闭Message

:::RUNTIME
```html
<template>
	<vc-button :wait="0" @click="handleClick">
		手动关闭
	</vc-button>
</template>

<script>
import { Button, Message } from '@wya/vc';
export default {
	components: {
		"vc-button": Button
	},
	mounted() {
	},
	methods: {
		handleClick() {
			Message.success({
				content: '成功的提示',
				duration: 5,
				closable: true
			});
		}
	}
};
</script>
<style>
</style>
```
:::

### 是否显示透明遮罩层
有透明遮罩时不能操作页面上的任何dom
:::RUNTIME
```html
<template>
	<vc-button :wait="0" @click="handleClick">
		没有透明遮罩
	</vc-button>
</template>

<script>
import { Button, Message } from '@wya/vc';
export default {
	components: {
		"vc-button": Button
	},
	mounted() {
	},
	methods: {
		handleClick() {
			Message.success({
				content: '成功的提示',
				duration: 5,
				maskClosable: false
			});
		}
	}
};
</script>
<style>
</style>
```
:::

### 支持render函数

:::RUNTIME
```html
<template>
	<vc-button :wait="0" @click="handleClick">
		使用render函数
	</vc-button>
</template>

<script>
import { Button, Message } from '@wya/vc';
export default {
	components: {
		"vc-button": Button
	},
	mounted() {
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
<style>
</style>
```
:::

## API

#### 属性
如果传入参数为对象时

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
content | 提示的内容 | `String` | - | -
maskClosable | 是否有透明遮罩层 | `Boolean` | `true`、`false` | `true`
duration | 自动关闭的延时，单位秒，不关闭可以写 0 | `Number` | - | 1.5
closable | 手动关闭提示 | `Boolean` | `true`、`false` | `false`
render | 自定义描述内容，使用 Vue 的 Render 函数 | `Function` | - | -

### 事件/方法

属性 | 说明 | 类型 | 参数
---|---|---|---|---
close | 关闭提示 | - | - 