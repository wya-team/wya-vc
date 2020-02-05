## 输入框（textarea）
文本输入框

### 基础用法
用于输入多行文本信息

:::RUNTIME
```html
<template>
	<vc-textarea
		placeholder="请输入内容"
	/>
</template>

<script>
import { Textarea } from '@wya/vc';
export default {
	components: {
		"vc-textarea": Textarea
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
</style>
```
:::

### 可自适应文本高度的文本域
通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。
:::RUNTIME
```html
<template>
	<div class="v-textarea-basic">
		<vc-textarea
			placeholder="请输入内容"
			autosize
		/>
		<vc-textarea
			placeholder="请输入内容"
			:autosize="{ minRows: 2 }"
		/>
	</div>
	
</template>

<script>
import { Textarea } from '@wya/vc';
export default {
	components: {
		"vc-textarea": Textarea
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
</style>
```
:::

### 显示文本数量、并且限制长度

:::RUNTIME
```html
<template>
	<div>
		<vc-textarea
			style="margin-bottom: 30px"
			v-model="value"
			placeholder="请输入内容"
			:maxlength="100"
			:indicator="{inverted: true}"
		/>
		<vc-textarea
			v-model="value2"
			placeholder="请输入内容"
			:maxlength="100"
			:indicator="{inverted: false}"
		/>
	</div>
	
</template>

<script>
import { Textarea } from '@wya/vc';
export default {
	components: {
		"vc-textarea": Textarea
	},
	data() {
		return {
			value: '',
			value2: ''	
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
</style>
```
:::

### 文本中两个字母算一个字节

:::RUNTIME
```html
<template>
	<div>
		<vc-textarea
			style="margin-bottom: 30px"
			v-model="value"
			placeholder="请输入内容"
			:maxlength="100"
			:indicator="{inverted: true}"
			bytes
		/>
	</div>
	
</template>

<script>
import { Textarea } from '@wya/vc';
export default {
	components: {
		"vc-textarea": Textarea
	},
	data() {
		return {
			value: ''
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
</style>
```
:::

### 禁用状态

:::RUNTIME
```html
<template>
	<div>
		<vc-textarea
			style="margin-bottom: 30px"
			v-model="value"
			disabled
		/>
	</div>
	
</template>

<script>
import { Textarea } from '@wya/vc';
export default {
	components: {
		"vc-textarea": Textarea
	},
	data() {
		return {
			value: ''
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
</style>
```
:::
### API

### 基础属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
placeholder | 占位文本 | `String` | - |-
value | 绑定的值，用v-modal 双向绑定 | `String | Number` | - | -
disabled | 禁用输入框 | `Boolean` | - |false 
clearable | 显示清空按钮 | `Boolean` | - |false
readonly | 输入框只读 | `Boolean` | - |false
maxlength | 最大输入长度 | `Number` | - | -
autofocus | 自动获取焦点 | `Boolean` | - | false
autosize | textarea 自动是适应高度，可传入对象 {maxRows:2; minRows:2} | `Boolean | Object` | - |false
rows | textarea 默认行数 | `Number` | - |1
indicator | `vc-input`特有，类型为对象是`{inverted: false}` | `Boolean | Object` | - | false
indicateClassName | 计数文字的样式 | `String` | - | -
bytes | 是否2个字节算一个字 | `Boolean` | - | false

### 事件/方法

属性 | 说明 | 类型 | 参数
---|---|---|---
change | 数据改变时触发 | `any` | -
focus | 输入框聚焦是触发 | - | -
blur | 输入框失焦时 | - | -
enter | 按下回车键是触发 | - | -
resize | 高度发生变化时 | - | -