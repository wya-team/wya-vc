## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/down-count/basic.html)
## 功能
倒计时

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
id | 唯一标识 | `num`	 | -		
t | 刷新周期，单位秒 | `num`	| 1		
render | 自定义渲染 | `func` | -
target-time	| 目标时间 | `str` / `num` |	-
server-time	| 服务器时间 | `str` / `num` | -	
before-text	| 前缀 | `str` |	-
after-text	| 后缀 | `str` | -
format | 格式(DD:HH:MM:SS:mm) | `str` | 'DD:HH:MM:SS'
tag | 标签 | `str` | 'span'


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
error | 警告回调 | `func({ id, msg })` | -
change | 变化回调 | `func({ id,... })` | -
end	| 结束回调 | `func(id)` |	 -
			

## 基础用法

```vue
<template>
	<vc-down-count 
		:id="1"
		:target-time="targetTime" 
		:server-time="serverTime"
		:t="0.01" 
		style="color:blue"
		format="DD:HH:MM:SS:mm"
		@end="handleEnd"
	/> 
</template>
<script>
import { DownCount } from "wya-vc";

export default {
	name: "demo",
	components: {
		"vc-down-count": DownCount,	
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
		handleChange(res) {
			// console.log('change:', res);
		},
		handleEnd(id) {
			console.log('end', id);
		}
	}
};
</script>
```
