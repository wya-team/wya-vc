import { createVue } from '@tests/helper';
import { VcInstance, VcError, VcBasic } from '..';

describe('Vc', () => {
	it('instance: 参数判断', () => {
		expect(typeof VcInstance).to.equal('object');
		expect(typeof VcError).to.equal('function');
		expect(typeof VcBasic).to.equal('function');

		/**
		 * 来自继承
		 */
		expect(typeof VcInstance.APIS).to.equal('object');
		expect(typeof VcInstance.clear).to.equal('function');
		expect(typeof VcInstance.clearAll).to.equal('function');
	});
});