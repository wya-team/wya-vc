import { camelCase } from 'lodash';

export default {
	name: 'vc-customer',
	functional: true,
	inheritAttrs: false,
	props: {
		render: {
			type: Function,
			default: () => (h) => <div />
		}
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
			let camelcase = camelCase(dash);
			params[camelcase] = attrs[dash];
		}

		// className and style
		let vShow = directives.find(i => i.rawName === 'v-show') || {};
		vShow.value === false && (vShow = { display: 'none' });

		className = `${(staticClass ? `${staticClass} ` : '')}${className}`;
		style = { ...staticStyle, ...style, ...vShow };
		
		params.className = className;
		params.style = style;

		// event
		for (let dash in on) {
			let camelcase = camelCase(`on-${dash}`);
			params[camelcase] = on[dash];
		}

		// 其余有很多东西，使用parent吧
		return ctx.props.render(h, params, ctx);
	}
};

