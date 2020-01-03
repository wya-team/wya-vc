import { createVue } from '@tests/helper';
import ImgsProcessing from '..';

describe('ImgsProcessing', () => {
	it('basic', () => {
		expect(!!ImgsProcessing).to.equal(true);
	});
});