import { VcInstance } from '../index';

describe('vc.js', () => {
	test('default', () => {
		expect(typeof VcInstance).toBe('object');
	});
});