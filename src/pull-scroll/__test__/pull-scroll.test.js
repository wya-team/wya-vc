import { createVue } from '@tests/helper';
import PullScroll from '..';

describe('PullScroll', () => {
	it('basic', () => {
		expect(!!PullScroll).to.equal(true);
	});
});