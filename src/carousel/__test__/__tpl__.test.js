import { createVue } from '@tests/helper';
import Carousel from '..';

describe('Carousel', () => {
	it('basic', () => {
		expect(!!Carousel).to.equal(true);
	});
});