import { createVue } from '@tests/helper';
import HtmlImg from '..';

describe('HtmlImg', () => {
	it('basic', () => {
		expect(!!HtmlImg).to.equal(true);
	});
});