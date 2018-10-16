<template>
	<div>
		<vc-down-count 
			ref="count" 
			:on-tip="onTip" 
			target-time="2018-10-15 10:10:10"
			server-time="2018-10-15 10:10:5"
			style="color:blue"
		/> 
		<br>
		<vc-down-count 
			ref="count2" 
			:on-tip="onTip" 
			:on-change="onChange"
			:on-end="onEnd"
			:t="0.01"
			:render="renderDownCount"
			target-time="2018-10-15 10:10:10"
			server-time="2018-10-15 10:10:5"
			before-text="---beforeText---"
			after-text="---afterText---"
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
		onTip(msg) {
			console.log(msg);
		},
		onChange(a, b) {
			console.log("changed " + a + "--" + b);
		},
		onEnd() {
			console.log("end");
		},
		renderDownCount(h, { days, hours, minutes, seconds, ms, beforeText, afterText, format }) {
			let num = Number(ms);
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
