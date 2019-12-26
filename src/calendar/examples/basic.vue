<template>
	<div>
		<div style="display:flex;justify-content:space-around">
			<div @click="$refs.calendar.prev()">
				prev
			</div>
			<vc-calendar
				ref="calendar"
			>
				<div 
					slot="month"
					slot-scope="month"
					class="v-month-header"
				>
					{{ month.data.month }}{{ month.data.year }}
				</div>
				<div 
					slot="week"
					slot-scope="week"
					class="v-week-header"
				>
					<span 
						v-for="(item, index) in week.data"
						:key="index"
					>
						{{ item }}
					</span>
				</div>
				<!-- <div slot-scope="it">
					{{ it.data.day }}
				</div> -->
			</vc-calendar>
			<div @click="$refs.calendar.next()">
				next
			</div>
		</div>

		<div style="display:flex;justify-content:space-around ">
			<div @click="$refs.calendar2.prev()">
				上月
			</div>
			<!-- 可以自定义渲染函数，不传会使用默认的渲染函数 -->
			<vc-calendar
				ref="calendar2"
				:render-date="renderDate"
				:render-month="renderMonth"
				:render-week="renderWeek"
				lang="en"
			/>
			<div @click="$refs.calendar2.next()">
				下月
			</div>
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


