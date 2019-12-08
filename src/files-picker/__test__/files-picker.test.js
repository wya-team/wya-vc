import { createVue } from '@tests/helper';
import FilesPicker from '..';

describe('FilesPicker', () => {
	it('basic', () => {
		expect(!!FilesPicker).to.equal(true);
	});
});