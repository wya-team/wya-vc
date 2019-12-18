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
			validator: (v) => /(year|month|date|daterange|datetime|datetimerange)/.test(v)
		},
	},
	data() {
		return {
			icon: 'date'
		};
	},
	created() {
		this.panel = this.getPanel(this.type);
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