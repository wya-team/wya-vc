import { createVue } from '@tests/helper';
import Page from '..';

describe('Page', () => {
	it('basic', () => {
		expect(!!Page).to.equal(true);
	});
});