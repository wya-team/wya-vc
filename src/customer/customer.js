const d2c = v => v.replace(/-(\w)/g, (_, $1) => $1.toUpperCase());

export default {
	name: 'vc-customer',
	functional: true,
	inheritAttrs: false,
	props: {
		render: Function
	},
	render(h, ctx = {}) {
		let { 
			attrs = {},
			style,
			staticStyle,
			staticClass = '',
			class: className = '',
			on = {},
			directives = []
		} = ctx.data;

		let params = {};
		
		// dash -> camelcase
		for (let dash in attrs) {
			let camelcase = d2c(dash);
			params[camelcase] = attrs[dash];
		}

		// className and style
		let vShow = directives.find(i => i.rawName === 'v-show') || {};
		vShow.value === false && (vShow = { display: 'none' });

		className = `${(staticClass ? `${staticClass} ` : '')}${className}`;
		style = Object.assign({}, staticStyle, style, vShow);
		
		params.className = className;
		params.style = style;

		// event
		for (let dash in on) {
			let camelcase = d2c(`on-${dash}`);
			params[camelcase] = on[dash];
		}

		// 其余有很多东西，使用parent吧
		return ctx.props.render(h, params, ctx);
	}
};

