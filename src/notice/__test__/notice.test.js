import { createVue } from '@tests/helper';
import Notice from '..';

describe('Notice', () => {
	it('basic', () => {
		expect(!!Notice).to.equal(true);
	});
});