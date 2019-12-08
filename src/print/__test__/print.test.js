import { createVue } from '@tests/helper';
import Print from '..';

describe('Print', () => {
	it('basic', () => {
		expect(!!Print).to.equal(true);
	});
});