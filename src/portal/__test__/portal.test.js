import { createVue } from '@tests/helper';
import Portal from '..';

describe('Portal', () => {
	it('basic', () => {
		expect(!!Portal).to.equal(true);
	});
});