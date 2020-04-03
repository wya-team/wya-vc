## 倒计时（Countdown）
倒计时功能

### 何时使用

使用场景和使用方式

### 基础用法
通过`targetTime`设置倒计时时间

:::RUNTIME
```html
<template>
	<div>
		<vc-countdown 
			:target-time="targetTime" 
			:server-time="new Date()"
		/> 
	</div>
</template>
<script>
import { Countdown } from '@wya/vc';

export default {
	name: "vc-countdown",
	components: {
		"vc-countdown": Countdown,	
	},
	data() {
		return {
			targetTime: null,
		};
	},
	created() {
		let now = new Date();
		now.setDate(now.getDate() + 2);
		this.targetTime = now;
	},
};
</script>
```
:::

### 设置倒计时刷新周期
通过`t`设置倒计时刷新周期

:::RUNTIME
```html
<template>
	<div>
		<vc-countdown 
			:target-time="targetTime" 
			:t="2"
		/> 
	</div>
</template>
<script>
import { Countdown } from '@wya/vc';

export default {
	name: "vc-countdown",
	components: {
		"vc-countdown": Countdown,	
	},
	data() {
		return {
			targetTime: null,
		};
	},
	created() {
		let now = new Date();
		now.setDate(now.getDate() + 2);
		this.targetTime = now;
	},
};
</script>
```
:::

### 自定义渲染倒计时
通过`format`自定义渲染倒计时

:::RUNTIME
```html
<template>
	<div>
		<vc-countdown 
			:target-time="targetTime" 
			format="DD:HH:mm:ss"
		/> 
	</div>
</template>
<script>
import { Countdown } from '@wya/vc';

export default {
	name: "vc-countdown",
	components: {
		"vc-countdown": Countdown,	
	},
	data() {
		return {
			targetTime: null,
		};
	},
	created() {
		let now = new Date();
		now.setDate(now.getDate() + 2);
		this.targetTime = now;
	},
};
</script>
```
:::

#### 属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
t | 刷新周期，单位秒 | `Number`	| - | 1		
render-row | 自定义渲染 | `Function` | - | -
target-time	| 目标时间 | `String`、 `Number`、 `Date` | - | - 
server-time	| 服务器时间 | `String`、 `Number`、 `Date` | - | 当前时间	
format | 格式(DD:HH:MM:SS:mm) | `String` | - | `DD天HH小时mm分ss秒ms`
tag | 标签 | `String` | `div`、`span`、`***` | `span`


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
error | 警告回调 | `msg: String` | -
change | 变化回调 | `{...}` | -
end	| 结束回调 | - |	 -