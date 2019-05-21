export default {
	name: 'vc-customer',
	functional: true,
	inheritAttrs: false,
	props: {
		render: Function
	},
	render(h, ctx) {
		let className = ctx.data.staticClass || '';
		className = `${(className ? `${className} ` : '')}${ctx.data.class || ''}`;
		let style = Object.assign({}, ctx.data.staticStyle, ctx.data.style);
		
		const params = {
			...ctx.data.attrs,
			className,
			style,
		};
		return ctx.props.render(h, params);
	}
};

