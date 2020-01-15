import Picker from '../picker';
import DatePanel from '../panel/date';
import DateRangePanel from '../panel/date-range';
import QuarterRangePanel from '../panel/quarter-range';
import MonthRangePanel from '../panel/month-range';

export default {
	name: 'vc-date-picker',
	mixins: [Picker],
	props: {
		type: {
			type: String,
			default: 'date',
			validator: (v) => /(year|month|quarter|date|daterange|datetime|datetimerange|quarterrange|monthrange)/.test(v)
		},
		options: {
			type: Object,
			default: (v) => ({})
		},
		timePickerOptions: {
			type: Object,
			default: (v) => ({})
		}
	},
	data() {
		return {
			icon: 'date'
		};
	},
	created() {
		this.panel = this.getPanel(this.type);
	},
	computed: {
		panelOptions() {
			return {
				...this.options,
				timePickerOptions: this.timePickerOptions
			};
		}
	},
	methods: {
		getPanel(type) {
			if (['daterange', 'datetimerange'].includes(type)) {
				return DateRangePanel;
			} else if (type === 'quarterrange') {
				return QuarterRangePanel;
			} else if (type === 'monthrange') {
				return MonthRangePanel;
			}
			return DatePanel;
		}
	}
};