<template>
	<div>
		<vc-down-count 
			ref="count" 
			target-time="2018-10-15 10:10:10" 
			server-time="2018-10-15 10:10:5"
			style="color:blue"
			@tip="handleTip"
		/> 
		<br>
		<vc-down-count 
			ref="count2" 
			:t="0.01" 
			:render="renderDownCount"
			target-time="2018-10-15 10:10:10"
			server-time="2018-10-15 10:10:5"
			before-text="---beforeText---"
			after-text="---afterText---"
			@tip="handleTip"
			@change="handleChange"
			@end="handleEnd"
		/> 
	</div>
</template>
<script>
import DownCount from "../down-count";

export default {
	name: "demo",
	components: {
		"vc-down-count": DownCount,	
	},
	data() {
		return {};
	},
	computed: {},
	mounted() {
		// 获取servertime成功够再开始计时
		// fetch("http://bjtime.cn", { mode: "no-cors" }).then(res => res.json()).then(json => console.log(json));
		this.$refs.count.startCount();
		this.$refs.count2.startCount();
	},
	methods: {
		handleTip(msg) {
			console.log(msg);
		},
		handleChange(a, b) {
			console.log("changed " + a + "--" + b);
		},
		handleEnd() {
			console.log("end");
		},
		renderDownCount(h, { days, hours, minutes, seconds, ms, beforeText, afterText, format }) {
			const num = Number(ms);
			const r = num % 255;
			const g = (num + 100) % 255;
			const b = (num + 200) % 255;
			return (
				<span style={`color:rgb(${r},${g},${b})`}>{days}-{hours}-{minutes}-{seconds}-{ms}</span>
			);
		}
	}
};
</script>


