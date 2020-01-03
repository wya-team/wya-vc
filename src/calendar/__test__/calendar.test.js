import { createVue } from '@tests/helper';
import Calendar from '..';

describe('Calendar', () => {
	it('basic', () => {
		expect(!!Calendar).to.equal(true);
	});
});