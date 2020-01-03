import { createVue } from '@tests/helper';
import Marquee from '..';

describe('Marquee', () => {
	it('basic', () => {
		expect(!!Marquee).to.equal(true);
	});
});