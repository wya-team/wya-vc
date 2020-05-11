import { createVue } from '@tests/helper';
import UploadPicker from '..';

describe('UploadPicker', () => {
	it('basic', () => {
		expect(!!UploadPicker).to.equal(true);
	});
});