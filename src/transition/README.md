## 过渡动画（Transition）

基于Vue内置Transition组件封装

### 何时使用

- 使用过渡动画来优化体验

### 基础用法

#### fade

:::RUNTIME
```html
<template>
	<div>
		<div style="margin-bottom: 16px;">
			是否展示：
			<vc-switch v-model="visible"></vc-switch>
		</div>
		<vc-transition-fade>
			<span v-show="visible">你看到我了</span>
		</vc-transition-fade>
	</div>
</template>

<script>
import { Transition, Switch } from '@wya/vc';

export default {
	name: 'runtime-fade',
	components: {
		'vc-switch': Switch,
		'vc-transition-fade': Transition.Fade
	},
	data() {
		return {
			visible: true
		}
	}
}
</script>
```
:::

#### scale

:::RUNTIME
```html
<template>
	<div>
		<div style="margin-bottom: 16px;">
			是否展示：
			<vc-switch v-model="visible"></vc-switch>
		</div>
		<vc-transition-scale mode="part" :duration=".6">
			<div v-show="visible" style="display: inline-block;">你看到我了</div>
		</vc-transition-scale>
	</div>
</template>

<script>
import { Transition, Switch } from '@wya/vc';

export default {
	name: 'runtime-scale',
	components: {
		'vc-switch': Switch,
		'vc-transition-scale': Transition.Scale
	},
	data() {
		return {
			visible: true
		}
	}
}
</script>
```
:::

#### slide

:::RUNTIME
```html
<template>
	<div>
		<div style="margin-bottom: 16px;">
			是否展示：
			<vc-switch v-model="visible"></vc-switch>
		</div>
		<vc-transition-slide mode="up-part">
			<div v-show="visible">你看到我了</div>
		</vc-transition-slide>
	</div>
</template>

<script>
import { Transition, Switch } from '@wya/vc';

export default {
	name: 'runtime-slide',
	components: {
		'vc-switch': Switch,
		'vc-transition-slide': Transition.Slide
	},
	data() {
		return {
			visible: true
		}
	}
}
</script>
```
:::

#### zoom

:::RUNTIME
```html
<template>
	<div>
		<div style="margin-bottom: 16px;">
			是否展示：
			<vc-switch v-model="visible"></vc-switch>
		</div>
		<vc-transition-zoom mode="center" :duration=".6">
			<div v-show="visible" style="display: inline-block;">你看到我了</div>
		</vc-transition-zoom>
	</div>
</template>

<script>
import { Transition, Switch } from '@wya/vc';

export default {
	name: 'runtime-zoom',
	components: {
		'vc-switch': Switch,
		'vc-transition-zoom': Transition.Zoom
	},
	data() {
		return {
			visible: true
		}
	}
}
</script>
```
:::

#### collapse

:::RUNTIME
```html
<template>
	<div>
		<div style="margin-bottom: 16px;">
			是否展示：
			<vc-switch v-model="visible"></vc-switch>
		</div>
		<vc-transition-collapse>
			<div v-show="visible" style="display: inline-block;">你看到我了</div>
		</vc-transition-collapse>
	</div>
</template>

<script>
import { Transition, Switch } from '@wya/vc';

export default {
	name: 'runtime-collapse',
	components: {
		'vc-switch': Switch,
		'vc-transition-collapse': Transition.Collapse
	},
	data() {
		return {
			visible: true
		}
	}
}
</script>
```
:::

#### 列表过渡

:::RUNTIME
```html
<template>
	<div class="runtime-list">
		<div style="margin-bottom: 16px;">
			<vc-button @click="handleAdd">添加</vc-button>
			<vc-button @click="handleDel">删除</vc-button>
		</div>
		<vc-transition-slide 
			mode="up-part"
			tag="div"
			style="display: flex; flex-wrap: wrap"
			group
		>
			<div 
				v-for="(item, index) in colors" 
				:key="item.id" 
				:style="{ background: `#ffff${item.id}${item.id}` }"
				style="width: 48px; height: 48px; text color: #333; margin: 10px"
				class="_color-item"
			>
				{{ index }}: {{ item.id }}
			</div>
		</vc-transition-slide>
	</div>
</template>

<script>
import { Transition, Button } from '@wya/vc';

let count = 0;

export default {
	name: 'runtime-list',
	components: {
		'vc-button': Button,
		'vc-transition-collapse': Transition.Collapse
	},
	data() {
		return {
			count: 10,
			visible: true,
			colors: Array.from({ length: 5 }, () => ({ id: count++ }))
		}
	},
	methods: {
		handleAdd() {
			this.colors.push({ id: count++ })
		},
		handleDel() {
			this.colors.splice(Math.floor(Math.random() * this.colors.length), 1)
		}
	}
}
</script>
<style>
.runtime-list ._color-item {
	margin: 10px;
	width: 48px;
	height: 48px;
	line-height: 48px;
	color: #333;
	text-align: center;
}
</style>
```
:::

## API

#### 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
group | 是否使用`transition-group` | `Boolean` | - | false
duration | 进入/离开持续时间 | `Number|Object` | - | `{enter: 0.3, leave: 0.3}`
delay | 进入/离开延迟时间 | `Number|Object` | - | `{enter: 0.3, leave: 0.3}`
tag | 同`transition-group` tag | `String` | - | `span`
origin | 变换的初始位置, 可以用style代替, 更短~~ | `String` | - | -
styles | 转换期间应用的元素样式 | `Object` | - | `{}`
appear | 是否在初始渲染时使用过渡（Vue内置Transition组件的属性） | `Boolean` | - | `false`


#### vc-transition-slide 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
mode | slide方向 | `String` | `left`、`right`、`down`、`up` | `left`

#### vc-transition-scale 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
mode | scale规则 | `String` | `both`、`part`、`x`、`y`、`none` | `both`

#### vc-transition-zoom 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
mode | zoom规则 | `String` | `x`、`y`、`center`、`none` | `x`

#### 事件

属性 | 说明 | 类型 | 参数
---|---|---|---|---
before-enter | 进入之前的回调 | - | el
enter | 进入的回调 | - | el
after-enter | 进入之后的回调 | - | el
before-leave | 离开之前的回调 | - | el
leave | 离开的回调 | - | el
after-leave | 离开之后的回调 | - | el
