import { Utils } from "@wya/utils";
import { debounce } from 'lodash';
import Customer from "../customer";

export default {
	name: "vc-countdown",
	props: {
		showZero: {
			type: Boolean,
			default: true
		},
		tag: {
			type: String,
			default: "span"
		},
		// 只能是String, 函数使用formatter
		format: {
			type: String,
			default: "DD天HH小时mm分ss秒ms"
		},
		t: {
			type: Number,
			default: 1
		},
		// beforeText: {
		// 	type: String,
		// 	default: ""
		// },
		// afterText: {
		// 	type: String,
		// 	default: ""
		// },
		// iOS时间不要使用xxxx-xx -> xxxx/xx
		targetTime: {
			type: [String, Number, Date],
			default: ""
		},
		serverTime: {
			type: [String, Number, Date],
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
			if (this.t < 0.01) {
				return 1000;
			} else if (this.t < 0.1) {
				return 100;
			} else {
				return 10;
			}
		},
		// 偏移值
		serverOffset() {
			return this.serverTime 
				? (this.getTimestamp(this.serverTime) - (new Date()).getTime()) 
				: 0;
		},
		// 目标时间
		targetTimestamp() {
			if (!this.targetTime && this.getTimestamp(this.targetTime)) {
				this.$emit("error", '请设定时间以及格式');
				return null;
			}

			return this.getTimestamp(this.targetTime);
		},
		result() {
			if (this.renderRow) {
				return;
			}
			let v;
			let day = this.days;
			let hour = this.hours;
			let minute = this.minutes;
			let second = this.seconds;
			let ms = this.ms;
			let { format } = this;

			v = this.formatter(format, [day, hour, minute, second, ms]);
			

			// 过来00*
			if (!this.showZero) {
				let regex = new RegExp(
					`00(${this.formatter(format, Array.from({ length: 5 }, () => '|'))})?`, 
					'g'
				);
				v = v.replace(regex, '');
			}

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
	destroyed() {
		this.stop();
	},
	methods: {
		formatter(format, arr) {
			// YYYY,MM
			return format
				.replace('DD', arr[0])
				.replace('HH', arr[1])
				.replace('mm', arr[2])
				.replace('ss', arr[3])
				.replace('ms', arr[4]);
		},
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
			this.ms = Math.floor(timestamp % 1000 / (1000 / this.msDividend)); // msDividend越小，取的毫秒级的位数应该越大

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
		},
		getTimestamp(date) {
			if (date instanceof Date) {
				return date.getTime();
			} else if (typeof date === 'string') {
				return Date.parse(date.replace(/-/g, "/"));
			} else if (date.toString().length === 10) {
				return date * 1000;
			}
			return date;
		}
	},
	render(h) {
		if (this.$scopedSlots.default) {
			return h(this.tag, { class: "vc-countdown" }, [
				this.$scopedSlots.default({
					days: this.days,
					hours: this.hours,
					minutes: this.minutes,
					seconds: this.seconds,
					ms: this.ms,
					format: this.format,
					tag: this.tag,
					showZero: this.showZer,
				})
			]);
		} else if (this.renderRow) {
			return (
				<Customer
					class="vc-countdown"
					render={this.renderRow} 
					days={this.days} 
					hours={this.hours} 
					minutes={this.minutes} 
					seconds={this.seconds} 
					ms={this.ms} 
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
				class: "vc-countdown"
			});
		}
	}
};

