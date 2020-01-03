import { createVue } from '@tests/helper';
import TimePicker from '..';

describe('TimePicker', () => {
	it('basic', () => {
		expect(!!TimePicker).to.equal(true);
	});
});