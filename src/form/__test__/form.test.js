import { createVue } from '@tests/helper';
import Form from '..';

describe('Form', () => {
	it('basic', () => {
		expect(!!Form).to.equal(true);
	});
});