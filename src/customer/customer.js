export default {
	name: 'vc-customer',
	functional: true,
	inheritAttrs: false,
	props: {
		render: Function
	},
	render(h, ctx) {
		 let attrs = ctx.data.attrs || {};
		 attrs = Object.keys(attrs).reduce((pre, curKey) => {
			 let attrKey = curKey;
			 if (curKey.includes('-')) {
				attrKey = curKey.split('-').reduce((pre, item, index) => {
					pre += index === 0 ? item : item.charAt(0).toUpperCase() + item.slice(1);
					return pre;
				}, '');
			 }
			 pre[attrKey] = attrs[curKey];
			 return pre;
		}, {});
		let className = ctx.data.staticClass || '';
		className = `${(className ? `${className} ` : '')}${ctx.data.class || ''}`;
		let style = Object.assign({}, ctx.data.staticStyle, ctx.data.style);
		
		const params = {
			...attrs,
			className,
			style,
		};
		return ctx.props.render(h, params);
	}
};

