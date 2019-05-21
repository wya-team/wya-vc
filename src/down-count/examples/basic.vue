<template>
	<div>
		<vc-down-count 
			:target-time="targetTime" 
			:server-time="new Date()"
			:t="1" 
			style="color:blue"
			format="DD:HH:mm:ss"
			@end="handleEnd(1)"
		/> 
		<br>
		<vc-down-count 
			:server-time="serverTime" 
			:t="1"
			target-time="2019-05-22 15:00:00" 
			style="color:blue"
			format="DD:HH:mm:ss"
			@end="handleEnd(1)"
		/> 
		<br>
		<vc-down-count 
			:target-time="targetTime" 
			:server-time="serverTime"
			:t="0.01" 
			style="color:blue"
			format="DD:HH:mm:ss:ms"
			@end="handleEnd(1)"
		/> 
		<br>
		<vc-down-count 
			:target-time="targetTime" 
			:server-time="serverTime"
			:t="0.01" 
			:show-zero="false"
			style="color:blue"
			format="DD:HH:mm:ss:ms"
			@end="handleEnd(1)"
		/> 
		<br>
		<vc-down-count
			:render-row="renderRow"
			target-time="2020-10-15 10:10:10"
			server-time="2018-10-15 10:10:5"
			@error="handleError"
			@change="handleChange(arguments[0], 2)"
			@end="handleEnd(2)"
		/> 
		<br>
		<vc-down-count
			target-time="2020-10-15 10:10:10"
			server-time="2018-10-15 10:10:5"
			@error="handleError"
			@change="handleChange(arguments[0], 2)"
			@end="handleEnd(2)"
		> 
			<template #default="it">{{ it.seconds }}</template>
		</vc-down-count>
		<vc-down-count
			target-time="2020-10-15 10:10:10"
			server-time="2018-10-15 10:10:5"
			@error="handleError"
			@change="handleChange(arguments[0], 2)"
			@end="handleEnd(2)"
		> 
			<div>
				test
			</div>
		</vc-down-count>
		<div @click="handleTarget">点我targetTime: Data.now() + 1</div>
		<div @click="handleServer">点我serverTime: Data.now() - 1</div>
	</div>
</template>
<script>
import DownCount from "..";

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
		handleChange(res, id) {
			// console.log('change:', res);
		},
		handleEnd(id) {
			console.log('end', id);
		},
		renderRow(h, props, parent) {
			const { days, hours, minutes, seconds, ms, beforeText, afterText, format, tag, className } = props;
			const num = Number(ms);
			const r = num % 255;
			const g = (num + 100) % 255;
			const b = (num + 200) % 255;
			return h(tag, {
				style: `color:rgb(${r}, ${g}, ${b})`,
				class: className,
				domProps: {
					innerHTML: `${days}-${hours}-${minutes}-${seconds}`
				}
			});
		}
	}
};
</script>


