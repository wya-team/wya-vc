export default {
	name: 'vc-customer',
	functional: true,
	inheritAttrs: false,
	props: {
		render: Function
	},
	render(h, ctx) {
		const params = {
			...ctx.data.attrs,
			className: ctx.data.staticClass,
			style: ctx.data.staticStyle,
		};
		return ctx.props.render(h, params);
	}
};

