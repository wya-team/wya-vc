import Comp from './component';
import { createVue } from '../helper';

describe('Component', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(typeof Comp).to.equal('object');
		expect(typeof Comp.data()).to.equal('object');
		expect(typeof Comp.created()).to.equal('undefined');
	});
});