import { createVue } from '@tests/helper';
import DebounceClick from '..';

describe('DebounceClick', () => {
	it('basic', () => {
		expect(!!DebounceClick).to.equal(true);
	});
});