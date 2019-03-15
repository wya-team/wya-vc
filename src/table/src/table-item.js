export default {
	render(h) {
		return h('div', {
			class: 'vc-table-item'
		}, this.$slots.default);
	}
};