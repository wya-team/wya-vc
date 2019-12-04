import { createVue } from '@tests/helper';
import Transition from '..';

describe('Transition', () => {
	it('basic', () => {
		expect(!!Transition).to.equal(true);
	});
});