## 输入框（Textarea）
多行文本输入框

### 何时使用
需要输入的内容较多时使用。

### 基础用法
最简单的多行文本输入。

:::RUNTIME
```html
<template>
	<vc-textarea
		placeholder="请输入内容"
		style="width: 300px;"
	/>
</template>

<script>
import { Textarea } from '@wya/vc';
export default {
	components: {
		"vc-textarea": Textarea
	}
};
</script>
```
:::

### 禁用状态
设置`disabled`属性禁用输入框。

:::RUNTIME
```html
<template>
	<div>
		<vc-textarea
			style="margin-bottom: 30px"
			v-model="value"
			disabled
			style="width: 300px;"
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
	}
};
</script>
```
:::

### 可自适应文本高度的文本域
通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。

:::RUNTIME
```html
<template>
	<div class="v-textarea-basic">
		<p>输入框的高度随着输入内容增多减少自动加长减低</p>
		<vc-textarea
			placeholder="请输入内容"
			autosize
			style="width: 300px;"
		/>
		<br/>
		<br/>
		<p>限制最小2行高，最大3行高</p>
		<vc-textarea
			placeholder="请输入内容"
			:autosize="{ minRows: 2, maxRows: 3 }"
			style="width: 300px;"
		/>
	</div>
</template>

<script>
import { Textarea } from '@wya/vc';
export default {
	components: {
		"vc-textarea": Textarea
	}
};
</script>
```
:::

### 显示文本数量、并且限制长度
通过`maxlength`控制可输入的最大字符数，通过`indicator`对象的`inverted`属性控制可输入的剩余数量是倒数还是正数。

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
			style="width: 300px;"
		/>
		<vc-textarea
			v-model="value2"
			placeholder="请输入内容"
			:maxlength="100"
			:indicator="{inverted: false}"
			style="width: 300px;"
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
			value: '默认占位',
			value2: '默认占位'	
		}
	}
};
</script>
```
:::

### 文本中两个字母算一个字节
设置`bytes`属性即可开启。

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
			style="width: 300px;"
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
	}
};
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
placeholder | 占位文本 | `String` | - |-
value | 绑定的值，用v-modal 双向绑定 | `String | Number` | - | -
disabled | 禁用输入框 | `Boolean` | - | `false` 
clearable | 显示清空按钮 | `Boolean` | - | `false`
readonly | 输入框只读 | `Boolean` | - | `false`
maxlength | 最大输入长度 | `Number` | - | -
autofocus | 自动获取焦点 | `Boolean` | - | `false`
autosize | textarea 自动是适应高度，可传入对象 {maxRows:2; minRows:2} | `Boolean | Object` | - |`false`
rows | textarea 默认行数 | `Number` | - |1
indicator | `vc-input`特有，类型为对象是`{inverted: false}` | `Boolean | Object` | - | `false`
indicateClassName | 计数文字的样式 | `String` | - | -
textareaStyle | 输入框的样式，如：{ resize: 'none' } | `Object` | - | -
bytes | 是否2个字节算一个字 | `Boolean` | - | `false`
allowDispatch | 是否向`form`发送事件 | `Boolean` | - | `false`
autocomplete | 输入字段是否应该启用自动完成功能 | `Boolean` | - | `false`
name | textarea原生属性，用于对表单数据进行引用 | `String` | - | -
wrap | wrap 属性规定当在表单中提交时，文本区域（text area）中的文本如何换行。`soft`：不换行；`hard`：换行，必须规定 cols 属性。 | `String` | `soft`、`hard` | `soft`
rows | textarea 的可见高度 | `String` | - | -

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
change | 数据改变时触发 | `(e: Event) => void 0` | `e`：事件对象
input | 数据改变时触发 | `(value: String, e: Event) => void 0` | `value`：当前输入框的值; `e`：事件对象
focus | 输入框聚焦是触发 | - | `(e: Event) => void 0` | `e`：事件对象
blur | 输入框失焦时 | - | `(e: Event) => void 0` | `e`：事件对象
enter | 按下回车键是触发 | - | `(e: Event) => void 0` | `e`：事件对象
resize | 高度发生变化时 | - | `(e: Event) => void 0` | `e`：事件对象
keydown | 按下键盘键 | - | `(e: Event) => void 0` | `e`：事件对象
keypress | 紧接着keydown事件触发 | - | `(e: Event) => void 0` | `e`：事件对象
keyup | 释放键盘键 | - | `(e: Event) => void 0` | `e`：事件对象
enter | 按下回车 | - | `(e: Event) => void 0` | `e`：事件对象