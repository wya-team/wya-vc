import { isEqualWith } from 'lodash';
import Extends from '../extends';

export default {
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: Array,
			default: () => ([])
		},
		disabled: {
			type: Boolean,
			default: false
		},
		min: Number,
		max: Number,
	},
	provide() {
		return { checkboxGroup: this };
	},
	data() {
		return {
			currentValue: [],
		};
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				if (isEqualWith(v, this.currentValue)) {
					return;
				}
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
			let index = this.currentValue.findIndex(i => i == v);
			index == -1 
				? this.currentValue.push(v)
				: this.currentValue.splice(index, 1);
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