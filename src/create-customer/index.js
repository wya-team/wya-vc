export default (propsType = {}, opts = {}) => ({
	name: 'vc-customer',
	functional: true,
	props: {
		...propsType,
		render: Function
	},
	render(h, ctx) {
		const params = {
			...ctx.props
		};
		return ctx.props.render(h, params);
	}
});

