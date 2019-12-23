import Picker from '../picker.vue';
import TimePanel from '../panel/time';
import TimeRangePanel from '../panel/time-range';

export default {
	name: 'vc-time-picker',
	mixins: [Picker],
	props: {
		type: {
			type: String,
			default: 'time',
			validator: (v) => /(time|timerange)/.test(v)
		},
		disabledHours: {
			type: Array,
			default: () => {
				return [];
			}
		},
		disabledMinutes: {
			type: Array,
			default: () => {
				return [];
			}
		},
		disabledSeconds: {
			type: Array,
			default: () => {
				return [];
			}
		},
		hideDisabledOptions: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			icon: 'time'
		};
	},
	computed: {
		panel() {
			const isRange = this.type === 'timerange';
			return isRange ? TimeRangePanel : TimePanel;
		},
		panelOptions() {
			return {
				disabledHours: this.disabledHours,
				disabledMinutes: this.disabledMinutes,
				disabledSeconds: this.disabledSeconds,
				hideDisabledOptions: this.hideDisabledOptions,
			};
		}
	},
	methods: {
	}
};