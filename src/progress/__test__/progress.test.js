import { createVue } from '@tests/helper';
import Progress from '..';

describe('Progress', () => {
	it('basic', () => {
		expect(!!Progress).to.equal(true);
	});
});