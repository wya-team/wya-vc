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
				let result = Array.isArray(component.props) 
					? component.props
					: Object.keys(component.props);

				result = result.sort();

				components[key] = result;
				props.push(...result);
			}
		});

		// 临时
		console.log(JSON.stringify([...new Set(props.sort())], null, '\t'));
	});
});