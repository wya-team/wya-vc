import { createVue } from '@tests/helper';
import DatePicker from '..';

describe('DatePicker', () => {
	it('basic', () => {
		expect(!!DatePicker).to.equal(true);
	});
});