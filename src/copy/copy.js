import Message from '../message';
import { copyToClipboard } from './utils';

export default {
	name: "vc-copy",
	props: {
		value: String,
		tag: {
			type: [String, Object, Function],
			default: 'div'
		}
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		async handleClick(e) {
			try { 
				// 此处不用this.$emit('xxx')
				let { value, $listeners: { after, before } } = this;

				before && (value = await before(e, value));

				let success = copyToClipboard(value);

				if (success) {
					after && after(value);
					!after && Message.success({
						content: `复制成功`
					});
				}
			} catch (error) {
				this.$emit('error', error);
			}
		}
	},
	render(h) {
		return h(this.tag, {
			on: {
				click: this.handleClick
			}
		}, this.$slots.default);
	}
};
