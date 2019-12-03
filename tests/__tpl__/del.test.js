const sum = require('./sum');

describe('Del', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(sum(1, 2)).to.equal(3);
	});
});