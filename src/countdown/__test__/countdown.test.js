import { createVue } from '@tests/helper';
import Countdown from '..';

describe('Countdown', () => {
	it('basic', () => {
		expect(!!Countdown).to.equal(true);
	});
});