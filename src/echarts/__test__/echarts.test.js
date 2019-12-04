import { createVue } from '@tests/helper';
import Echarts from '..';

describe('Echarts', () => {
	it('basic', () => {
		expect(!!Echarts).to.equal(true);
	});
});