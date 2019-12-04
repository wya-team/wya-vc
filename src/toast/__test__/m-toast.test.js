import { createVue } from '@tests/helper';
import Toast from '..';

describe('Toast', () => {
	it('basic', () => {
		expect(!!Toast).to.equal(true);
	});
});