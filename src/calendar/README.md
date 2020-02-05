## 功能
日历展示


### 基础用法
包括使用切换前后日期

:::RUNTIME
```html
<template>
	<div class="v-calendar-basic">
		<vc-button @click="$refs.target.prev()">上个月</vc-button>
		<vc-button @click="$refs.target.next()">下个月</vc-button>
		<vc-calendar
			ref="target"
		/>
	</div>
</template>

<script>
import { Calendar,Button } from '@wya/vc';
export default {
	components: {
		"vc-calendar": Calendar,
		"vc-button": Button
	},
	data(){
		return {

		}
	},
	methods: {
	}
};
</script>
<style>
.v-calendar-basic > *{
	margin-bottom: 10px;
}
</style>
```
:::


### 自定义日历
使用 `render-date`、`render-month`、`render-week` 自定义日历

:::RUNTIME
```html
<template>
	<div style="display:flex;justify-content:space-around ">
		<div @click="$refs.calendar.prev()">
			上月
		</div>
		<!-- 可以自定义渲染函数，不传会使用默认的渲染函数 -->
		<vc-calendar
			ref="calendar"
			:render-date="renderDate"
			:render-month="renderMonth"
			:render-week="renderWeek"
			lang="en"
		/>
		<div @click="$refs.calendar.next()">
			下月
		</div>
	</div>
</template>
<script>
import { Calendar } from'@wya/vc';

export default {
	components: {
		"vc-calendar": Calendar
	},
	data() {
		return {};
	},
	computed: {},
	methods: {
		renderDate(h, { date, curDateStr }) {
			return (
				<span style={ date.date === curDateStr ? "background:gray;" : ""}>
					{date.day}号
				</span>
			);
		},

		renderMonth(h, { year, month, monthNames }) {
			return (
				<div style="display:flex; justify-content:center">
					{year + "--" + monthNames[month].en}
				</div>
			);
		},

		renderWeek(h, { weekNames, lan }) {
			return (
				<div style="display:flex; justify-content:space-around">
					{
						weekNames.map((item, index) => {
							return (
								<span key={index}>
									{item.en}
								</span>
							);
						})
					}
				</div>
			);
		}
	}
};
</script>

<style lang="scss">
@import '../../style/vars.scss';
.v-month-header {
	@include commonFlexCc();
	line-height: 60px;
	font-size: 24px;
	background-color: #f5f6f7;
	color: #2e3136;
}
.v-week-header {
	@include commonFlex();
	width: 100%;
	align-items: center;
	color: gray;
	padding: 15px 0;
	font-size: 16px;
	> span {
		width: 14.28%;
		text-align: center;
	}
}
</style>
```
:::

### 设定语言
使用 `lang` 设置日历语言（默认：'ch'）

:::RUNTIME
```html
<template>
	<div class="v-calendar-basic">
		<vc-button @click="$refs.target.prev()">上个月</vc-button>
		<vc-button @click="$refs.target.next()">下个月</vc-button>
		<vc-button @click="handleChangeLang">切换语言</vc-button>
		<vc-calendar
			ref="target"
			:lang="lang"
		/>

	</div>
</template>

<script>
import { Calendar,Button } from '@wya/vc';
export default {
	components: {
		"vc-calendar": Calendar,
		"vc-button": Button
	},
	data(){
		return {
			lang: 'ch'
		}
	},
	methods: {
		handleChangeLang(){
			this.lang = this.lang == "ch" ? "en" : "ch"
		}
	}
};
</script>
<style>
.v-calendar-basic > *{
	margin-bottom: 10px;
}
</style>
```
:::

### API

### 基础属性

属性 | 说明 | 类型 | 可选值 | 默认值
---|---|---|---|---
render-date | 渲染每个日期 | `(h, { date, curDateStr })` | - | `renderDefaultDate`
render-month | 渲染月 | `(h, { month, year, lan, monthNames })` | - | `renderDefaultMonth`
render-week | 渲染周 | `(h, { weekNames, lan })` | - | `renderDefaultWeek`
lang | 语言 | `String` | `ch`、`en` | `ch`
