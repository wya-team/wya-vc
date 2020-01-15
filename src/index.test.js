import { createVue } from '@tests/helper';
import * as WYA_VC from './index';

describe('Index', () => {
	it('basic', () => {
		expect(typeof WYA_VC).to.equal('object');
		let components = {};
		let props = [];
		Object.keys(WYA_VC).forEach((key) => {
			let component = WYA_VC[key];
			if (
				typeof component === 'object' 
				&& typeof component.props === 'object'
			) {	
				let result = [component].concat(component.mixins || []).reduce((pre, cur) => {
					let v = cur.props 
						? Array.isArray(cur.props) 
							? cur.props
							: Object.keys(cur.props)
						: [];
					pre = pre.concat(v);
					return pre;
				}, []);

				result = result.sort();

				components[key] = result;
				props.push(...result);
			}
		});

		// 临时
		// console.log(JSON.stringify([...new Set(props.sort())], null, '\t'));
		// console.log(JSON.stringify(components, null, '\t'));
	});
});