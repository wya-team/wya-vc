## 功能（Switch）
开关选择器

### 何时使用
- 需要表示开关状态/两种状态之间的切换时；
- 和 `checkbox` 的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

### 基础用法

:::RUNTIME
```html
<template>
	<div class="v-switch-basic">
		<vc-switch v-model="single" @change="handleChange" />
	</div>
</template>

<script>
import { Switch } from '@wya/vc';
export default {
	components: {
		"vc-switch": Switch
	},
	data(){
		return {
			single: true,
		}
	},
	methods: {
		handleChange(status) {
			console.log(status)
		}
	}
};
</script>
```
:::

### 自定义开关文案
使用`open-text`、`close-text`自定义开闭文案。

:::RUNTIME
```html
<template>
	<div class="v-switch-basic">
		<vc-switch
			:value="open"
			open-text="开"
			close-text="闭"
			@change="handleChange"
		/>

	</div>
</template>
<script>
import { Switch } from '@wya/vc';

export default {
	components: {
		"vc-switch": Switch
	},
	data(){
		return {
			open: true
		}
	}
};
</script>
```
:::

### 禁用状态
使用 `disabled` 控制禁用状态。

:::RUNTIME
```html
<template>
	<div class="v-switch-basic">
		<vc-switch :value="true" disabled />
		<vc-switch :value="false" disabled />
	</div>
</template>
<script>
import { Switch } from '@wya/vc';

export default {
	components: {
		"vc-switch": Switch
	}
};
</script>
```
:::

### 自定义开关值
使用 `true-value`、`false-value` 自定义开关值 (默认：Boolean)。

:::RUNTIME
```html
<template>
	<div class="v-switch-basic">
		<vc-switch v-model="single" :true-value="1" :false-value="0" @change="handleChange" />
	</div>
</template>
<script>
import { Switch } from '@wya/vc';

export default {
	components: {
		"vc-switch": Switch
	},
	data(){
		return {
			single: 1
		}
	},
	methods: {
		handleChange(status) {
			console.log({
				single: this.single,
				other: arguments[0]
			});
		}
	}
};
</script>
```
:::

### 自定义开闭显示内容
使用 slot `open`、`close` 自定义开关内容。

:::RUNTIME
```html
<template>
	<div class="v-switch-basic">
		<vc-switch :value="single" @change="handleChange" >
			<span slot="open">ON</span>
			<span slot="close">OFF</span>
		</vc-switch>
	</div>
</template>
<script>
import { Switch } from '@wya/vc';

export default {
	components: {
		"vc-switch": Switch
	},
	data(){
		return {
			single: true
		}
	},
	methods: {
		handleChange(status) {
			console.log(status);
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
value | 指定当前是否选中，可以使用 v-model 双向绑定数据 | `String`、`Number`、`Boolean` | - | `false`
disabled | 禁用开关 | `Boolean` | - | `false`
true-value | 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 | `String`、`Number`、`Boolean` | - | `true`
false-value | 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 | `String`、`Number`、`Boolean` | - | `false`
open-text | 选中时的文案 | `String` | - | -
close-text | 没有选中时的文案 | `String` | - | -
name | 内部input标签name值 | `String` | - | -

### 事件
事件名 | 说明 | 回调参数 | 参数
---|---|---|---|---
change | 开关变化时触发，返回当前的状态 | `(value: String | Number | Boolean) => void 0` | `value`：当前绑定的值

### Slot
属性 | 说明
---|---
open | 自定义显示打开时的内容
close | 自定义显示关闭时的内容
