## 滑块（Slider)

滑动输入器，用于在数值区间/自定义区间内进行选择，支持连续或离散值。

### 何时使用

当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

### 基本用法
基本滑动条。可以使用 `v-model` 双向绑定数据。当 `range` 为 `true` 时，渲染为双滑块。当 `disabled` 为 `true` 时，滑块处于不可用状态。

**注意，** 单滑块时，`value` 格式为数字，当开启双滑块时，`value` 为长度是2的数组，且每项为数字。

:::RUNTIME
```html
<template>
	<div class="v-silder-basic">
		<vc-slider v-model="value1" />
		<vc-slider v-model="value2" range />
		<vc-slider v-model="value3" range disabled />
	</div>
</template>
<script>
import { Slider} from '@wya/vc';

export default {
	components: {
		'vc-slider': Slider
	},
	data() {
		return {
			value1: 20,
			value2: [20, 60],
			value3: [20, 60],
		}
	},
}
</script>
<style>

</style>

```
:::


### 离散值

通过设置属性 `step` 可以控制每次滑动的间隔。

:::RUNTIME
```html
<template>
	<div class="v-silder-step">
		<vc-slider v-model="value4" :step="10" />
		<vc-slider v-model="value5" :step="10" range/>
	</div>
</template>
<script>
import { Slider} from '@wya/vc';

export default {
	components: {
		'vc-slider': Slider
	},
	data() {
		return {
			value4: 20,
			value5: [20, 80]
		}
	},
}
</script>
<style>

</style>

```
:::


### 显示间断点

通过设置属性 `show-stops` 可以显示间断点，建议在 `step` 间隔不密集时使用。

:::RUNTIME
```html
<template>
	<div class="v-silder-show-stops">
		<vc-slider v-model="value6" :step="10" show-stops />
		<vc-slider v-model="value7" :step="10" range show-stops />
	</div>
</template>
<script>
import { Slider} from '@wya/vc';

export default {
	components: {
		'vc-slider': Slider
	},
	data() {
		return {
			value6: 20,
			value7: [20, 60]
		}
	},
}
</script>
<style>

</style>

```
:::


### 带输入框的滑块

和 `数字输入框` 组件保持同步。

:::RUNTIME
```html
<template>
	<div class="v-silder-input">
		<vc-slider v-model="value6" show-input />
	</div>
</template>
<script>
import { Slider} from '@wya/vc';

export default {
	components: {
		'vc-slider': Slider
	},
	data() {
		return {
			value6: 20,
		}
	},
}
</script>
<style>

</style>

```
:::


### 自定义提示

`Slider` 会把当前值传给 `formatter`，并在 `popover` 中显示 `formatter` 的返回值，若为 `null`，则隐藏 `popover`。

:::RUNTIME
```html
<template>
	<div class="v-silder-tip">
		<vc-slider v-model="value6" :formatter="tipFormat" />
		<vc-slider v-model="value7" :formatter="hideFormat" />
	</div>
</template>
<script>
import { Slider} from '@wya/vc';

export default {
	components: {
		'vc-slider': Slider
	},
	data() {
		return {
			value6: 20,
			value7: 20
		}
	},
	methods: {
		tipFormat(val) {
			 return `Progress: ${val} %`;
		},
		hideFormat(val) {
			return null
		}
	}
}
</script>
<style>

</style>

```
:::


## API

### Slider props

属性 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | ---
value | 滑块选定的值，可以使用 v-model 双向绑定数据。普通模式下，数据格式为数字，在双滑块模式下，数据格式为长度是2的数组，且每项都为数字 | `Number`、 `Array` | - | -
min | 最小值 | `Number` | - | 0
max | 最大值 | `Number` | - | 100
step | 步长，取值建议能被（max - min）整除 | `Number` | - | 1
disabled | 是否禁用滑块 | `Boolean` | - | `false`
clickable | 是否可以通过点击bar来移动滑块 | `Boolean` | - | `true`
range | 是否开启双滑块模式 | `Boolean`| - | `false`
show-input | 是否显示数字输入框，仅在单滑块模式下有效 | `Boolean` | - | `false`
show-stops | 是否显示间断点，建议在 step 不密集时使用 | `Boolean` | - |`false`
show-tip | 提示的显示控制，可选值为 `hover`（悬停，默认）、`always`（总是可见）、`never`（不可见） | `String` | `hover`、`always`、`never` | `hover`
formatter | `Slider` 会把当前值传给 `formatter`，并在 `popover` 中显示 `formatter` 的返回值，若为 `null`，则隐藏 `popover` | `Function` | - | -


### Slider events

事件名 | 说明 | 参数 | 返回值
---|---|---|---
after-change | 在松开滑动时触发，返回当前的选值，在滑动过程中不会触发，会对外暴露`reset`方法 | value | -
change | 滑动条数据变化时触发，返回当前的选值，在滑动过程中实时触发，会对外暴露`reset`方法 | value | -