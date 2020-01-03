import { createVue } from '@tests/helper';
import Message from '..';

describe('Message', () => {
	it('basic', () => {
		expect(!!Message).to.equal(true);
	});
});