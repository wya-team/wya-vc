<template>
	<div>
		<vc-down-count 
			:id="1"
			:target-time="targetTime" 
			:server-time="serverTime"
			:t="0.01" 
			style="color:blue"
			format="DD:HH:MM:SS:mm"
			@end="handleEnd"
		/> 
		<br>
		<vc-down-count
			:id="2"
			:render="renderRow"
			target-time="2018-10-15 10:10:10"
			server-time="2018-10-15 10:10:5"
			before-text="---beforeText---"
			after-text="---afterText---"
			@error="handleError"
			@change="handleChange"
			@end="handleEnd"
		/> 
		<div @click="handleTarget">点我targetTime: Data.now() + 1</div>
		<div @click="handleServer">点我serverTime: Data.now() - 1</div>
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
		return {
			targetTime: (new Date()).toString(),
			serverTime: (new Date()).toString()
		};
	},
	methods: {
		handleTarget() {
			this.targetTime = (new Date((new Date()).getTime() + 1000 * 60 * 60 * 24)).toString();
		},
		handleServer() {
			this.serverTime = (new Date((new Date()).getTime() - 1000 * 60 * 60 * 24)).toString();
		},
		handleError(msg) {
			console.log(msg);
		},
		handleChange(res) {
			// console.log('change:', res);
		},
		handleEnd(id) {
			console.log('end', id);
		},
		renderRow(h, params) {
			const { days, hours, minutes, seconds, ms, beforeText, afterText, format } = params;
			const num = Number(ms);
			const r = num % 255;
			const g = (num + 100) % 255;
			const b = (num + 200) % 255;
			return h('span', {
				style: `color:rgb(${r}, ${g}, ${b})`,
				domProps: {
					innerHTML: `${days}-${hours}-${minutes}-${seconds}`
				}
			});
		}
	}
};
</script>


