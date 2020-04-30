## 加载中 (Spin)
用于页面和区块的加载中状态

### 何时使用
页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

### 基础用法
可以直接使用，当做简单的loading

:::RUNTIME
```html
<template>
	<div class="v-spin-basic">
		<vc-spin />
		<div>一个简单的loading状态</div>
	</div>
</template>
<script>
import { Spin } from '@wya/vc';
export default {
	components: {
		"vc-spin": Spin
	},
	mounted() {
	},
	methods: {
	}
}
</script>
<style>
.v-spin-basic > div{
	margin-top: 10px
}
</style>
```

### 各种大小
通过`size`属性控制加载中样式的大小

:::RUNTIME
```html
<template>
	<div class="v-spin-size">
		<vc-spin :size="18" />
		<vc-spin :size="32" />
		<vc-spin :size="40" />
		<div>不同大小的loading</div>
	</div>
</template>
<script>
import { Spin } from '@wya/vc';
export default {
	components: {
		"vc-spin": Spin
	},
	mounted() {
	},
	methods: {
	}
}
</script>
<style>
.v-spin-size > div{
	margin-top: 10px
}
</style>
```
::: 

### 切换加载状态
:::RUNTIME
```html
<template>
	<div class="v-spin-switch">
		<div class="article">
			<h3>登金陵凤凰台</h3>
			<address>李白</address>
			<article>
				<p>凤凰台上凤凰游，凤去台空江自流。</p>
				<p>吴宫花草埋幽径，晋代衣冠成古丘。</p>
				<p>三山半落青天外，二水中分白鹭洲。</p>
				<p>总为浮云能蔽日，长安不见使人愁。</p>
			</article>
			<div class="spin" v-if="showSpin">
				<vc-spin />
			</div>
		</div>
		<div>
			切换显示状态: 
			<vc-switch v-model="showSpin">
				<span slot="open">开</span>
				<span slot="close">关</span>
			</vc-switch>
		</div>
	</div>
</template>
<script>
import { Spin, Switch } from '@wya/vc';
export default {
	components: {
		"vc-spin": Spin,
		"vc-switch": Switch
	},
	data() {
		return {
			showSpin: true
		}
	},
	mounted() {
	},
	methods: {
	}
}
</script>
<style>
.v-spin-switch .article {
	position: relative;
}
.v-spin-switch .spin {
	position: absolute;
	top:0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ffffffaa;
}
</style>
```
::: 

### 添加加载中的文案
:::RUNTIME
```html
<template>
	<div class="v-spin-loadding">
		<vc-spin>
			<div class="loadding">Loadding</div>
		</vc-spin>
		<vc-spin style="margin-left: 40px" background="red" foreground="#ccc" :size="40">
			<div class="loadding">Uploading</div>
		</vc-spin>
		<vc-spin style="margin-left: 40px" background="yellow" foreground="#ccc" :size="60">
			<div class="loadding">拼命加载中</div>
		</vc-spin>
	</div>
</template>
<script>
import { Spin } from '@wya/vc';
export default {
	components: {
		"vc-spin": Spin,
	},
	data() {
		return {
			showSpin: true
		}
	},
	mounted() {
	},
	methods: {
	}
}
</script>
<style>
.v-spin-loadding .loadding {
	margin-top: 20px;
	color: #5495F6;
	background: #ffffffaa;
}
</style>
```
::: 

## API

### Spin props

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|--- | ---
size | Spin尺寸 | `Number` | - | `28`
background | 背景色 | `String` | - | `#108ee9`
foreground | loading指示颜色 | `Strinng` | - | `#ccc`

### Spin slot

名称 | 说明
--- | ---
loading | 自定义 Spin 的内容，设置slot后，默认的样式不生效
- | 自定义加载中的文案
