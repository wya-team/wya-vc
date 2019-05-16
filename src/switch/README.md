## [Demo Basic](https://wya-team.github.io/wya-vc/dist/switch/basic.html)
## 功能
开关

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
value | 指定当前是否选中，可以使用 v-model 双向绑定数据 | String, Number, Boolean | false
disabled | 禁用开关 | Boolean | false
true-value | 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 | String, Number, Boolean | true
false-value | 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 | String, Number, Boolean | false


#### 事件

属性 | 说明 | 参数 | 返回值
---|---|---|---
change | 开关变化时触发，返回当前的状态	 | `(value) => value` | ---
click | ->Promise可触发loading	 | `(value) => Promise` | ---

#### Slot

属性 | 说明
---|---
open | 自定义显示打开时的内容
close | 自定义显示关闭时的内容

## 基础用法

```vue
<template>
	<div>
		<vc-switch v-model="single" @change="handleChange" />

		<vc-switch :value="true" loading />
		<vc-switch :value="false" loading size="small" />
		
		<vc-switch size="large" />
		<vc-switch />
		<vc-switch size="small" />

		<vc-switch>
			<span slot="open">开</span>
			<span slot="close">关</span>
		</vc-switch>
		<br><br>
		<vc-switch size="large">
			<span slot="open">开启</span>
			<span slot="close">关闭</span>
		</vc-switch>
		<vc-switch size="large">
			<span slot="open">ON</span>
			<span slot="close">OFF</span>
		</vc-switch>
	</div>
</template>
<script>
import Switch from '..';

export default {
	name: "vc-switch-basic",
	components: {
		'vc-switch': Switch
	},
	data() {
		return {
			single: false
		};
	},
	computed: {
		
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