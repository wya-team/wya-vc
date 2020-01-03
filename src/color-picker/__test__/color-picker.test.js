import { createVue } from '@tests/helper';
import ColorPicker from '..';

describe('ColorPicker', () => {
	it('basic', () => {
		expect(!!ColorPicker).to.equal(true);
	});
});