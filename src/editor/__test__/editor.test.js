import { createVue } from '@tests/helper';
import Editor from '..';

describe('Editor', () => {
	it('basic', () => {
		expect(!!Editor).to.equal(true);
	});
});