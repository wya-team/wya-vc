import { createVue } from '@tests/helper';
import Clipboard from '..';

describe('Clipboard', () => {
	it('basic', () => {
		expect(!!Clipboard).to.equal(true);
	});
});