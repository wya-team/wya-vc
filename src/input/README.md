## 输入框（Input)

通过鼠标或键盘输入内容，是最基础的表单域的包装。

### 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框。

### 基本使用

可以使用 v-model 实现数据的双向绑定。

可以直接设置 style 来改变输入框的宽度，默认 100%。

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

在 `type="password"` 时，开启属性 password 可以切换显示隐藏密码。type属性可选为 text、password、tel、search、date、number、url

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

开启属性 indicator 可以显示字数统计，需配合 maxlength 属性来限制输入长度。

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
		"vc-input": Input.Search,
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

#### Input props

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|--- | ---
type | 输入框类型 | `String` | text、password、tel、search、date、number、email、url | text
placeholder | 占位文本 | `String` | - | -
value | 绑定的值，用v-modal 双向绑定 | `String`、 `Number` | - | -
disabled | 禁用输入框 | `Boolean` | - | false 
clearable | 显示清空按钮 | `Boolean` | - | false
readonly | 输入框只读 | `Boolean` | - | false
maxlength | 最大输入长度 | `Number` | - | -
autofocus | 自动获取焦点 | `Boolean` | - | false
afloat | append,prepend置顶显示，盖住虚线 | `Boolean` | - | false
indicator | `vc-input` 特有，类型为对象是`{inline: false, inverted: false}`,如果`append`为`true`，则`inline`为`true`无效 | `Boolean`、`Object` | - | false
indicateClassName | 计数文字的样式 | `String` | - | -
focusEnd | 聚焦时光标是否在文字后面 | `Boolean` | - | false
bytes | 是否2个字节算一个字 | `Boolean` | - | false

### Input events

事件名 | 说明 | 类型 | 参数
---|---|---|---
change | 数据改变时触发 | `any` | (event:Event)
focus | 输入框聚焦是触发 | - | (event:Event)
blur | 输入框失焦时 | - | (event:Event)
enter | 按下回车键是触发 | - | (event:Event)
before | 点击加减按钮改变value前执行 | `function` | (event:Event)
after | 点击加减按钮改变value后或者失焦后执行 | `function` | (event:Event)

> 注：after事件与before的区别，before是成功之后才会改变value，after只会在失败之后重新修改值

#### Slot

> 仅两项

属性 | 说明
---|---
prepend | 前缀
append | 后缀
