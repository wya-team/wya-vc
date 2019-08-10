import Extends from '../extends';
import { getUid } from '../utils/index';

export default {
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: [String, Number],
			default: ''
		},
		type: {
			type: String,
			default: '', // 'button'
		},
		vertical: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: () => getUid('radio')
		}
	},
	provide() {
		return { radioGroup: this };
	},
	data() {
		return {
			currentValue: '',
		};
	},
	computed: {
		classes() {
			return {
				'is-vertical': this.vertical,
				'is-button': this.type === 'button'
			};
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v;
			}
		},
		currentValue(v, old) {
			// ..
		}
	},
	mounted() {
	},
	methods: {
		reset(v) {
			this.currentValue = v;
		},

		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync(e) {
			this.$emit('change', this.currentValue, e, this.reset);
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		}
	}
};