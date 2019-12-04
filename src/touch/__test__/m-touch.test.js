import { createVue } from '@tests/helper';
import Touch from '..';

describe('Touch', () => {
	it('basic', () => {
		expect(!!Touch).to.equal(true);
	});
});