<template>
	<div>
		<div style="display:flex;justify-content:space-around">
			<button @click="$refs.calendar.prev()">prev</button> <button @click="$refs.calendar.next()">next</button>
		</div>
		<!-- 可以自定义渲染函数，不传 会使用默认的渲染函数 -->
		<!-- <vc-calendar ref="calendar" 
		:date-render="dateRender" 
		:month-render="monthRender" 
		:week-render="weekRender"
		lan="en" 
		
		 />
		
		 -->
		<vc-calendar ref="calendar" />
	
	
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
		// dateRender(date) {
		// 	return (
		// 		<span>
		// 			{date.day}号
		// 		</span>
		// 	);
		// },
		// monthRender({ year, month, monthNames }) {
		// 	return (
		// 		<div>
		// 			{year + "--" + monthNames[month].en}
		// 		</div>
		// 	);
		// },
		// weekRender() {
		// 	return (
		// 		<div>7123456</div>
		// 	);
		// }
	}
};
</script>
