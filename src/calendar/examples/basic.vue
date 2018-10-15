<template>
	<div >
		<div style="display:flex;justify-content:space-around">
			<button @click="$refs.calendar.prev()">prev</button>
			<vc-calendar 
				ref="calendar" 
			/>

			<button @click="$refs.calendar.next()">next</button>
		</div>

		<div style="display:flex;justify-content:space-around ">
			<button @click="$refs.calendar2.prev()">上月</button>
			<!-- 可以自定义渲染函数，不传会使用默认的渲染函数 -->
			<vc-calendar 
				ref="calendar2" 
				:render-date="renderDate" 
				:render-month="renderMonth" 
				:render-week="renderWeek" 
				lan="en" 
			/>
			<button @click="$refs.calendar2.next()">下月</button>
		</div>
	</div>
</template>
<script>
import Calendar from "../calendar";

export default {
	name: "vc-tpl-calendar",
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
				<div style="display:flex;justify-content:center">
					{year + "--" + monthNames[month].en}
				</div>
			);
		},

		renderWeek(h, { weekNames, lan }) {
			return (
				<div style="display:flex;justify-content:space-around">
					{weekNames.map((item, index) => {
						return (
							<span key={index}>
								{item.en}
							</span>
						);
					})}
				</div>
			);
		}
	}
};
</script>


