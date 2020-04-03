## 文字轮播（Marquee）
### 何时使用
使用场景和使用方式

### 基础用法
支持传值和插槽

:::RUNTIME
```html
<template>
	<div class="v-marquee-basic">
		<vc-marquee
			:content="text"
			class="_normal"
		>
			<span>{{ text }}</span>
		</vc-marquee>
		<vc-marquee
			:content="text"
			class="_normal"
		/>
		<vc-marquee
			:content="text.repeat(3)"
			class="_normal"
		/>
	</div>
</template>

<script>
import { Marquee } from '@wya/vc';
export default {
	components: {
		"vc-marquee": Marquee
	},
	data() {
		return {
			text: 'ABCDEFG'
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
.v-marquee-basic > ._normal {
	width: 100px;
	background: #f6f8fa;
	margin-bottom: 10px;
}
</style>
```
:::


### 滚动
autoplay: 未超出一屏时是否滚动

:::RUNTIME
```html
<template>
	<div class="v-marquee-autoplay">
		<vc-marquee
			:content="text"
			class="_normal"
		/>
		<vc-marquee
			:content="text.repeat(3)"
			class="_normal"
		/>
		<vc-marquee
			:content="text"
			autoplay
			class="_normal"
		/>
	</div>
</template>

<script>
import { Marquee } from '@wya/vc';
export default {
	components: {
		"vc-marquee": Marquee
	},
	data() {
		return {
			text: 'ABCDEFG'
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
.v-marquee-autoplay > ._normal {
	width: 100px;
	background: #f6f8fa;
	margin-bottom: 10px;
}
</style>
```
:::

### 动画
控制滚动暂停

:::RUNTIME
```html
<template>
	<div class="v-marquee-animated">
		<vc-marquee
			:content="text.repeat(3)"
			class="_normal"
		/>
		<vc-marquee
			:content="text.repeat(3)"
			class="_normal"
			:animated="false"
		/>
		<vc-marquee
			:content="text"
			autoplay
			class="_normal"
			:animated="false"
		/>
		<vc-marquee
			:content="text"
			autoplay
			class="_normal"
		/>
	</div>
</template>

<script>
import { Marquee } from '@wya/vc';
export default {
	components: {
		"vc-marquee": Marquee
	},
	data() {
		return {
			text: 'ABCDEFG'
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
.v-marquee-animated > ._normal {
	width: 100px;
	background: #f6f8fa;
	margin-bottom: 10px;
}
</style>
```
:::

### 速度
每秒移动多少px

:::RUNTIME
```html
<template>
	<div class="v-marquee-basic">
		<vc-marquee
			:content="text.repeat(3)"
			:speed="100"
			class="_normal"
		/>
		<vc-marquee
			:content="text"
			autoplay
			:speed="500"
			class="_normal"
		/>
	</div>
</template>

<script>
import { Marquee } from '@wya/vc';
export default {
	components: {
		"vc-marquee": Marquee
	},
	data() {
		return {
			text: 'ABCDEFG'
		}
	},
	mounted() {
	},
	methods: {
	}
};
</script>
<style>
.v-marquee-basic > ._normal {
	width: 100px;
	background: #f6f8fa;
	margin-bottom: 10px;
}
</style>
```
:::

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
speed | 速度计算（如：每秒移动50px） | `Number` | 50
content | 内容 | `String, Function` | -
animated | 动画 | `Boolean` | true
autoplay | 未超出一屏时是否滚动 | `Boolean` | false

#### Slot

属性 | 说明
---|---
default | -
