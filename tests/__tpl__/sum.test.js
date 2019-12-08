const sum = require('./sum');

describe('Sum', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(sum(1, 2)).to.equal(3);
	});
});
