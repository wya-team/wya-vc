## 输入框（Input)
通过鼠标或键盘输入内容，是最基础的表单域的包装

### 何时使用
- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框。

### 基础用法
使用 v-model 实现输入数据的双向绑定。

:::RUNTIME
```html
<template>
	<vc-input v-model="input" placeholder="请输入内容" style="width:300px" />
</template>
<script>
import { Input } from '@wya/vc';

export default {
	components: {
		"vc-input": Input,
	},
	data() {
		return {
			input: ''
		}
	}
}
</script>
```
:::

### 数字输入框
限制只能输入数字。

:::RUNTIME
```html
<template>
	<vc-input-number v-model="input" placeholder="请输入内容" style="width:300px" />
</template>
<script>
import { Input } from '@wya/vc';

export default {
	components: {
		"vc-input-number": Input.Number,
	},
	data() {
		return {
			input: ''
		}
	}
}
</script>
```
:::

### 禁用状态
通过 `disabled` 属性指定是否禁用 input 组件。

:::RUNTIME
```html
<template>
	<vc-input v-model="input" placeholder="请输入内容" disabled style="width:300px" />
</template>
<script>
import { Input } from '@wya/vc';

export default {
	components: {
		"vc-input": Input,
	},
	data() {
		return {
			input: ''
		}
	}
}
</script>
```
:::

### 可清空
使用 `clearable` 属性即可得到一个可清空的输入框

:::RUNTIME
```html
<template>
	<vc-input v-model="input" placeholder="请输入内容" clearable style="width:300px" />
</template>
<script>
import { Input } from '@wya/vc';

export default {
	components: {
		"vc-input": Input,
	},
	data() {
		return {
			input: ''
		}
	}
}
</script>
```
:::

### 密码输入框
在 `type="password"` 时，开启属性 password 可以切换显示隐藏密码。type属性可选为 text、password、tel、search、date、number、url。

:::RUNTIME
```html
<template>
    <vc-input v-model="input" placeholder="请输入密码" type="password" style="width:300px" /> 
</template>
<script>
import { Input } from '@wya/vc';

export default {
	components: {
		"vc-input": Input,
	},
	data() {
		return {
			input: ''
		}
	}
}
</script>
```
:::

### 输入长度限制
开启属性 `indicator` 可以显示字数统计，需配合 `maxlength` 属性来限制输入长度。

:::RUNTIME
```html
<template>
    <vc-input v-model="input" placeholder="请输入内容" indicator  :maxlength="10" style="width:300px" /> 
</template>
<script>
import { Input } from '@wya/vc';

export default {
	components: {
		"vc-input": Input,
	},
	data() {
		return {
			input: ''
		}
	}
}
</script>
```
:::

### 前缀和后缀
在输入框上添加前缀或后缀图标。

:::RUNTIME
```html
<template>
    <div class="v-input-icon">
        <div>
            属性方式：
            <vc-input v-model="input1" placeholder="请输入金额" prepend="rmb" style="width:300px" />
            <vc-input v-model="input2" placeholder="请输入内容" append="search" style="width:300px" />
        </div>
        
        <div style="margin-top: 10px">
            Slot方式：
            <vc-input v-model="input3" placeholder="请输入金额" style="width:300px" >
                <template #prepend>
                   <div class="icon-wrapper">
                        <vc-icon type="rmb" class="icon" />
                   </div>
                </template>
            </vc-input>
            <vc-input v-model="input4" placeholder="请输入内容" style="width:300px" >
                <template #append>
                    <div class="icon-wrapper">
                        <vc-icon type="search" class="icon" />
                    </div>
                </template>
            </vc-input>
        </div>
    </div>
</template>
<script>
import { Input, Icon } from '@wya/vc';

export default {
	components: {
        "vc-input": Input,
        "vc-icon": Icon
	},
	data() {
		return {
			input1: '',
			input2: '',
			input3: '',
			input4: '',
		}
	}
}
</script>
<style>
    .v-input-icon .icon-wrapper {
          width: 16px;
        font-size: 12px;
        background: #e5e5e5;
        color: #515151;
    }
    .v-input-icon .icon {
        display: inline-block;
        vertical-align: middle;
        line-height: 0;
    }
</style>
```
:::

### 搜索框
使用`input-search`，可以设置为搜索型输入框。

:::RUNTIME
```html
<template>
	<vc-input-search v-model="input" placeholder="请输入内容"  style="width:300px" />
</template>
<script>
import { Input } from '@wya/vc';

export default {
	components: {
		"vc-input-search": Input.Search,
	},
	data() {
		return {
			input: ''
		}
	}
}
</script>
```
:::

## API

### 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
value | 绑定的值，用v-modal 双向绑定 | `String`、 `Number` | - | -
type | 输入框类型 | `String` | `text`、`password`、`tel`、`search`、`date`、`number`、`email`、`url` | `text`
placeholder | 占位文本 | `String` | - | -
disabled | 禁用输入框 | `Boolean` | - | `false` 
clearable | 显示清空按钮 | `Boolean` | - | `false`
readonly | 输入框只读 | `Boolean` | - | `false`
maxlength | 最大输入长度 | `Number` | - | -
autofocus | 自动获取焦点 | `Boolean` | - | `false`
indicator | `vc-input` 特有，类型为对象是`{inline: false, inverted: false}`,如果`append`为`true`，则`inline`为`true`无效 | `Boolean`、`Object` | - | `false`
indicateClassName | 计数文字的样式 | `String` | - | -
name | 原生属性 | `String` | - | -
elementId | input的id属性 | `String` | - | -
autocomplete | 原生属性，输入字段是否应该启用自动完成功能，`new-password`在`input`的`type`为`password`时可以阻止密码的默认填充 | `String` | `on`、`off`、`new-password` | `off`
spellcheck | 原生属性，是否对元素内容进行拼写检查 | `Boolean` | - | `false`
focusEnd | 聚焦时光标是否在文字后面 | `Boolean` | - | `false`
bytes | 是否2个字节算一个字 | `Boolean` | - | `false`
prepend | 前置`icon`的type值 | `String` | - | -
append | 后置`icon`的type值 | `String` | - | -
afloat | 显示`icon`背景，在插入了`icon`后才生效 | `String` | - | -
inputStyle | 输入框样式 | `Object`、`Array` | - | -
allowDispatch | 是否能触发`form`更新 | `Boolean` | - | `true`

### number属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
min | 最小值 | `Number` | - | 0
max | 最大值 | `Number` | - | Infinity
step | 计数器步长 | `Number`、`Boolean` | - | 1
required | - | `Boolean` | - | `false`
precision | 数值精度 | `Number` | - | 0
formatter | 格式化值 | `Function` | - | `(v, precision) => (/^(-|)$/.test(v) ? '' : Number(v).toFixed(precision))`

### search属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
enterText | 后置位的显示内容 | `String`、`Boolean` | - | `true`

### 事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
input | 输入触发 | `(val: String) => void 0` | `val`：输入的内容
change | 数据改变时触发 | `(e: Event) => void 0` | `e`：事件对象
focus | 输入框聚焦是触发 | `(e: Event) => void 0` | `e`：事件对象
blur | 输入框失焦时 | `(e: Event) => void 0` | `e`：事件对象
keydown | 原生的 `keydown` 事件 | `(e: Event) => void 0` | `e`：事件对象
keypress | 原生的 `keypress` 事件 | `(e: Event) => void 0` | `e`：事件对象
enter | 按下回车触发 | `(e: Event) => void 0` | `e`：事件对象
keyup | 按下键盘触发 | `(e: Event) => void 0` | `e`：事件对象

> 注：after事件与before的区别，before是成功之后才会改变value，after只会在失败之后重新修改值

### number事件
事件名 | 说明 | 回调参数 | 参数说明
---|---|---|---
tip | 触发限制的上下数值 | `({ type: String, mag: String, tag: String }) => void 0` | `type`：触发按钮（`max`或者`min`）；`msg`：提示信息（触发上限时为“不能再多了”，下限时为“不能再少了”）；`tag`：button
keyup | 按下键盘触发 | `(e: Event) => void 0` | `e`：事件对象
enter | 按下回车触发 | `(e: Event) => void 0` | `e`：事件对象
before | 点击加减按钮改变value前执行 | `(val: String) => promise` | `val`：输入的值
after | 点击加减按钮改变value后或者失焦后执行 | `(val: String) => promise` | `val`：输入的值

### 方法
方法名 | 说明 | 参数
---|---|---
focus | 手动聚焦输入框 | -
blur | 使 input 失去焦点 | -
click | 触发点击事件，获取焦点 | -

### Slot
属性 | 说明
---|---
prepend | 前缀
append | 后缀
content | 内容
