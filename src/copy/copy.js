import { Message } from 'iview';

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

				// create
				let input = document.createElement('input');
				input.value = value;
				document.body.appendChild(input);

				// copy
				input.select();
				document.execCommand("Copy");

				// remove
				document.body.removeChild(input);

				// end
				after && after(value);
				!after && Message.success({
					content: `复制成功：${value}`
				});
			} catch (error) {
				console.error(`copy fail: ${error}`);
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
