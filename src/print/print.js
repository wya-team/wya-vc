export default {
	name: "vc-print",
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
		// 执行
		print() {
			// filter
			const $ = [...document.body.children].filter(
				item => item.nodeName === 'DIV' && item.style.display !== 'none'
			);
			// hide it
			$.forEach(item => item.style.display = 'none');

			// regiser print
			let div = document.createElement('div');
			div.appendChild(this.$el.cloneNode(true));

			document.body.appendChild(div);
			window.print();

			// remove print
			$.forEach(item => item.style.removeProperty('display'));
			document.body.removeChild(div);
		}
	},
	render(h) {
		return h(this.tag, {
			domProps: {
				innerHTML: this.value
			},
		}, this.$slots.default);
	}
};
