import Picker from '../picker.vue';
import DatePanel from '../panel/date';
import DateRangePanel from '../panel/date-range';

export default {
	name: 'vc-date-picker',
	mixins: [Picker],
	props: {
		type: {
			type: String,
			default: 'date',
			validator: (v) => /(year|month|quarter|date|daterange|datetime|datetimerange)/.test(v)
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
			if (type === 'daterange' || type === 'datetimerange') {
				return DateRangePanel;
			}
			return DatePanel;
		}
	}
};