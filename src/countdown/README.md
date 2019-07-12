## [Demo Basic](https://wya-team.github.io/wya-vc/dist/count-down/basic.html)
## 功能
倒计时

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
t | 刷新周期，单位秒 | `Number`	| 1		
render-row | 自定义渲染 | `Function` | -
target-time	| 目标时间 | `String`, `Number`, `Date` |	-
server-time	| 服务器时间 | `String`, `Number`, `Date` | -	
before-text	| 前缀(v1.3.18被废除) | `String` |	-
after-text	| 后缀(v1.3.18被废除) | `String` | -
format | 格式(DD:HH:MM:SS:mm) | `String` | 'DD天HH小时mm分ss秒ms'
tag | 标签 | `String` | 'span'


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
error | 警告回调 | `msg: String` | -
change | 变化回调 | `{...}` | -
end	| 结束回调 | - |	 -
			

## 基础用法

```vue
<template>
	<vc-countdown 
		:target-time="targetTime" 
		:server-time="serverTime"
		:t="0.01" 
		style="color:blue"
		format="DD:HH:MM:SS:mm"
		@change="handleEnd(arguments[0], 1)"
		@end="handleEnd(1)"
	/> 
</template>
<script>
import { Countdown } from "@wya/vc";

export default {
	name: "demo",
	components: {
		"vc-countdown": Countdown,	
	},
	data() {
		return {
			targetTime: (new Date()).toString(),
			serverTime: (new Date()).toString()
		};
	},
	methods: {
		handleError(msg) {
			console.log(msg);
		},
		handleChange(res, id) {
			// console.log('change:', res);
		},
		handleEnd(id) {
			console.log('end', id);
		}
	}
};
</script>
```
