import { createVue } from '@tests/helper';
import Popconfirm from '..';

describe('Popconfirm', () => {
	it('basic', () => {
		expect(!!Popconfirm).to.equal(true);
	});
});