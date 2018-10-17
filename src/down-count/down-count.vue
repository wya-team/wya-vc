<template>
	<down-count 
		:render="render" 
		:days="days" 
		:hours="hours" 
		:minutes="minutes" 
		:seconds="seconds" 
		:ms="ms" 
		:before-text="beforeText" 
		:after-text="afterText" 
		:format="format"
		:tag="tag" 
	/>
</template>
<script>
import CreateCustomer from "../create-customer/index";


const DownCount = CreateCustomer({
	days: String,
	hours: String,
	minutes: String,
	seconds: String,
	ms: String,
	format: String,
	beforeText: String,
	afterText: String,
	tag: String
});
const defaultRenderDownCount = (h, { days, hours, minutes, seconds, ms, beforeText, afterText, format, tag, }) => {
	let downCount;
	switch (format) {
		case "DD":
			downCount = `${beforeText}${days}天${afterText}`;
			break;
		case "DD:HH":
			downCount = `${beforeText}${days}天${hours}小时${afterText}`;
			break;
		case "DD:HH:MM":
			downCount = `${beforeText}${days}天${hours}小时${minutes}分${afterText}`;
			break;
		case "DD:HH:MM:SS:mm":
			downCount = `${beforeText}${days}天${hours}小时${minutes}分${seconds}秒${ms}${afterText}`;
			break;
		default:
			downCount = `${beforeText}${days}天${hours}小时${minutes}分${seconds}秒${afterText}`;
			break;
	}
	return (
		h(tag, {
			domProps: {
				innerHTML: downCount
			}
			
		})
	); 
};
export default {
	name: "vc-down-count",
	components: {
		"down-count": DownCount
	},
	props: {
		tag: {
			type: String,
			default: "span"
		},
		format: {
			type: [String, Function],
			default: ""
		},
		t: {
			type: Number,
			default: 0.01
		},
		beforeText: {
			type: String,
			default: ""
		},
		afterText: {
			type: String,
			default: ""
		},
		targetTime: {
			type: [String, Number],
			default: ""
		},
		serverTime: {
			type: [String, Number],
			default: ""
		},

		render: {
			type: Function,
			default: defaultRenderDownCount
		}
	},
	data() {
		const curTimeStamp = new Date(this.serverTime).getTime();
		const targetTimeStamp = new Date(this.targetTime).getTime();
		return {
			curTimeStamp,
			targetTimeStamp,
			timer: 0,
			days: "",
			hours: "",
			minutes: "",
			seconds: "",
			ms: ""
		};
	},
	computed: {
		difference() {
			this.$emit("change", this.targetTimeStamp, this.curTimeStamp);
			const temp = this.targetTimeStamp - this.curTimeStamp;
			if (temp <= 0) {
				clearInterval(this.timer);
				this.$emit("end");
				return 0;
			}
			return temp;
		},
		T_() {
			// 转为毫秒
			return this.t * 1000;
		}
	},
	watch: {
		curTimeStamp() {
			// 计算出相差天数
			this.days = Math.floor(this.difference / (24 * 3600 * 1000)) + "";
			// 计算出小时数
			const leave1 = this.difference % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
			this.hours = this.formatNum(Math.floor(leave1 / (3600 * 1000)));
			// 计算相差分钟数
			const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
			this.minutes = this.formatNum(Math.floor(leave2 / (60 * 1000)));
			// 计算相差秒数
			const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
			this.seconds = this.formatNum(Math.round(leave3 / 1000));
			this.ms = (leave3 % 1000) + "";// 计算秒数后剩余的毫秒数
		}
	},
	methods: {
		startCount() {
			if (!this.targetTime) {
				this.$emit("tip", "请输入目标时间");
				return;
			} else if (!this.serverTime) {
				this.$emit("tip", "请传入服务器时间");
				return;
			}
			if (this.timer === 0) {
				this.timer = setInterval(() => {
					this.curTimeStamp += this.T_;
				}, this.T_);
			} else {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					this.curTimeStamp += this.T_;
				}, this.T_);
			}
		},
		formatNum(num) {
			if (num < 10) {
				return "0" + num;
			}
			return num;
		}
	}
};
</script>
