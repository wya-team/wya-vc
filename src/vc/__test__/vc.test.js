import { VcInstance, VcError, VcBasic } from '..';

describe('vc.js', () => {
	test('@wya/vc - instance: 参数判断', () => {
		expect(typeof VcInstance).toBe('object');
		expect(typeof VcError).toBe('function');
		expect(typeof VcBasic).toBe('function');

		/**
		 * 来自继承
		 */
		expect(typeof VcInstance.APIS).toBe('object');
		expect(typeof VcInstance.clean).toBe('function');
		expect(typeof VcInstance.cleanAll).toBe('function');
	});
});