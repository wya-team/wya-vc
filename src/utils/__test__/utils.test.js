import { createVue } from '@tests/helper';
import { Resize } from '..';

describe('Utils', () => {
	it('basic', () => {
		expect(!!Resize).to.equal(true);
	});
});