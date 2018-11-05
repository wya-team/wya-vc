## [Demo Basic](https://wya-team.github.io/wya-vc/dist/web/calendar/basic.html)
## 功能
日历展示

## API

#### 属性

属性 | 说明 | 类型 | 默认值
---|---|---|---
render-date | 渲染每个日期 | function(h, { date, curDateStr }) | renderDefaultDate
render-month | 渲染月 |  function(h, { month, year, lan, monthNames }) | renderDefaultMonth
render-week | 渲染周 |  function(h, { weekNames, lan }) | renderDefaultWeek
lang="en" |语言（'ch'或'en'）|String|'ch'

## 基础用法

```vue
<template>
	<div >
		<div @click="$refs.target.prev()">prev</div>
		<vc-calendar
			ref="target"
		/>
		<div @click="$refs.target.next()">next</div>
	</div>
</template>
<script>
import { Calendar } from "wya-vc";

export default {
	name: "vc-tpl-calendar",
	components: {
		"vc-calendar": Calendar
	}
};
</script>
```
