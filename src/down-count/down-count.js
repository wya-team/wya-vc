import { Utils } from "@wya/utils";
import { debounce } from 'lodash';
import CreateCustomer from "../create-customer/index";

const Row = CreateCustomer({
	days: [String, Number],
	hours: [String, Number],
	minutes: [String, Number],
	seconds: [String, Number],
	ms: [String, Number],
	format: String,
	beforeText: String,
	afterText: String,
	tag: String,
	className: String,
	showZero: Boolean
});

export default {
	name: "vc-down-count",
	props: {
		showZero: {
			type: Boolean,
			default: true
		},
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
		renderRow: Function
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
				this.$emit("error", '请设定时间以及格式');
				return null;
			}

			return new Date(this.targetTime.replace(/-/g, "/"));
		},
		result() {
			if (this.renderRow) {
				return;
			}
			let v;
			let day = this.days + '天';
			let hour = this.hours + '小时';
			let minute = this.minutes + '分';
			let second = this.seconds + '秒';
			let ms = this.ms;

			switch (this.format) {
				case "DD":
					v = `${this.beforeText}${day}${this.afterText}`;
					break;
				case "DD:HH":
					v = `${this.beforeText}${day}${hour}${this.afterText}`;
					break;
				case "DD:HH:MM":
					v = `${this.beforeText}${day}${hour}${minute}${this.afterText}`;
					break;
				case "DD:HH:MM:SS:mm":
					v = `${this.beforeText}${day}${hour}${minute}${second}${ms}${this.afterText}`;
					break;
				default:
					v = `${this.beforeText}${day}${hour}${minute}${second}${this.afterText}`;
					break;
			}
			!this.showZero && (v = v.replace(/00(天|小时|分|秒)?/g, ''));

			return v;
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
			this.$watch(item, restart);
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

			this.days = Utils.preZero(Math.floor(timestamp / _day));
			this.hours = Utils.preZero(Math.floor((timestamp % _day) / _hour));
			this.minutes = Utils.preZero(Math.floor((timestamp % _hour) / _minute));
			this.seconds = Utils.preZero(Math.floor((timestamp % _minute) / _second));
			this.ms = Utils.preZero(Math.floor(timestamp % this.msDividend));

			if (timestamp <= 0) {
				this.stop();

				this.$emit("change", {
					timestamp: 0,
					days: '00',
					hours: '00',
					minutes: '00',
					seconds: '00',
					ms: '00',
				});

				this.$emit("end");
			} else {

				this.$emit("change", {
					timestamp,
					days: this.days,
					hours: this.hours,
					minutes: this.minutes,
					seconds: this.seconds,
					ms: this.ms,
				});

			}
		}
	},
	render(h) {
		if (this.$scopedSlots.default) {
			return h(this.tag, { class: "vc-down-count" }, [
				this.$scopedSlots.default({
					days: this.days,
					hours: this.hours,
					minutes: this.minutes,
					seconds: this.seconds,
					ms: this.ms,
					beforeText: this.beforeText,
					afterText: this.afterText,
					format: this.forma,
					tag: this.tag,
					showZero: this.showZer,
				})
			]);
		} else if (this.renderRow) {
			return (
				<Row
					className="vc-down-count"
					render={this.renderRow} 
					days={this.days} 
					hours={this.hours} 
					minutes={this.minutes} 
					seconds={this.seconds} 
					ms={this.ms} 
					beforeText={this.beforeText} 
					afterText={this.afterText} 
					format={this.format}
					tag={this.tag} 
					showZero={this.showZero}
				/>
			);
		} else {
			return h(this.tag, {
				domProps: {
					innerHTML: this.result
				},
				class: "vc-down-count"
			});
		}
	}
};

