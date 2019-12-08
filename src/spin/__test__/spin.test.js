import { createVue } from '@tests/helper';
import Spin from '..';

describe('Spin', () => {
	it('basic', () => {
		expect(!!Spin).to.equal(true);
	});
});