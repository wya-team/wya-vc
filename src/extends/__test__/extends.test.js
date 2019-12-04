import { createVue } from '@tests/helper';
import Extends from '..';

describe('Extends', () => {
	it('basic', () => {
		expect(!!Extends).to.equal(true);
	});
});