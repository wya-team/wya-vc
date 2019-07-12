import { copyToClipboard } from './utils';

export default {
	props: {
		value: String,
		tag: {
			type: [String, Object, Function],
			default: 'div'
		}
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
					!after && this._toast({
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
