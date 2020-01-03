import { createVue } from '@tests/helper';
import Upload from '..';

describe('Upload', () => {
	it('basic', () => {
		expect(!!Upload).to.equal(true);
	});
});