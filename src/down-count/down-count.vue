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
import { debounce } from 'lodash';
import CreateCustomer from "../create-customer/index";
import { addPreZero } from "../utils/utils";

const DownCount = CreateCustomer({
	days: [String, Number],
	hours: [String, Number],
	minutes: [String, Number],
	seconds: [String, Number],
	ms: [String, Number],
	format: String,
	beforeText: String,
	afterText: String,
	tag: String
});
const defaultRender = (h, params) => {
	const { days, hours, minutes, seconds, ms, beforeText, afterText, format, tag, } = params;
	let result;
	switch (format) {
		case "DD":
			result = `${beforeText}${days}天${afterText}`;
			break;
		case "DD:HH":
			result = `${beforeText}${days}天${hours}小时${afterText}`;
			break;
		case "DD:HH:MM":
			result = `${beforeText}${days}天${hours}小时${minutes}分${afterText}`;
			break;
		case "DD:HH:MM:SS:mm":
			result = `${beforeText}${days}天${hours}小时${minutes}分${seconds}秒${ms}${afterText}`;
			break;
		default:
			result = `${beforeText}${days}天${hours}小时${minutes}分${seconds}秒${afterText}`;
			break;
	}
	return (
		h(tag, {
			domProps: {
				innerHTML: result
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
		id: [String, Number],
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
			default: 1
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
			default: defaultRender
		}
	},
	data() {
		return {
			days: "",
			hours: "",
			minutes: "",
			seconds: "",
			ms: ""
		};
	},
	computed: {
		// 周期
		T() {
			return this.t * 1000;
		},
		// 毫秒被除数
		msDividend() {
			return this.t < 0.01 ? 1000 : 100;
		},
		// 偏移值
		serverOffset() {
			return this.serverTime 
				? (Date.parse(this.serverTime.replace(/-/g, "/")) - (new Date()).getTime()) 
				: 0;
		},
		// 目标时间
		targetTimestamp() {
			if (!this.targetTime && Date.parse(this.targetTime.replace(/-/g, "/"))) {
				this.$emit("error", {
					id: this.id,
					msg: '请设定时间以及格式'
				});
				return null;
			}

			return new Date(this.targetTime.replace(/-/g, "/"));
		}
	},
	watch: {
	},
	created() {
		// 定时器
		this.timer = null;

		// 下面属性改变会更新定时器
		let watchArr = [
			'targetTime', 
			'serverTime'
		];

		const restart = debounce(this.restart, 200, { leading: true });
		
		watchArr.forEach(item => {
			this.$watch(item, restart, { deep: true });
		});

	},
	mounted() {
		this.start();
	},
	destoryed() {
		this.stop();
	},
	methods: {
		start() {
			if (this.targetTimestamp) {
				this.timer && clearInterval(this.timer);
				this.timer = setInterval(this.run, this.T);
			}
		},
		restart() {
			this.stop();
			this.start();
		},
		stop() {
			this.timer && clearInterval(this.timer);
		},
		run() {
			const currentTime = new Date((new Date()).getTime() + this.serverOffset);
			const timestamp = this.targetTimestamp - currentTime;

			const _second = 1000;
			const _minute = _second * 60;
			const _hour = _minute * 60;
			const _day = _hour * 24;

			this.days = addPreZero(Math.floor(timestamp / _day));
			this.hours = addPreZero(Math.floor((timestamp % _day) / _hour));
			this.minutes = addPreZero(Math.floor((timestamp % _hour) / _minute));
			this.seconds = addPreZero(Math.floor((timestamp % _minute) / _second));
			this.ms = addPreZero(Math.floor(timestamp % this.msDividend));

			if (timestamp <= 0) {
				this.stop();

				this.$emit("change", {
					id: this.id,
					timestamp: 0,
					days: '00',
					hours: '00',
					minutes: '00',
					seconds: '00',
					ms: '00',
				});

				this.$emit("end", this.id);
			} else {

				this.$emit("change", {
					id: this.id,
					timestamp,
					days: this.days,
					hours: this.hours,
					minutes: this.minutes,
					seconds: this.seconds,
					ms: this.ms,
				});

			}
		}
	}
};
</script>
