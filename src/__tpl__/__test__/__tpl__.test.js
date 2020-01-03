import { createVue } from '@tests/helper';
import Comp from '..';

describe('Tpl', () => {
	it('basic', () => {
		expect(typeof Comp).to.equal('object');
		expect(typeof Comp.data()).to.equal('object');
	});
});