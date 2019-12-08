import { createVue } from '@tests/helper';
import Artboard from '..';

describe('Artboard', () => {
	it('basic', () => {
		expect(!!Artboard).to.equal(true);
	});
});