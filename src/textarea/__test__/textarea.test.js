import { createVue } from '@tests/helper';
import Textarea from '..';

describe('Textarea', () => {
	it('basic', () => {
		expect(!!Textarea).to.equal(true);
	});
});