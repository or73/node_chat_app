const expect    = require('expect');

// import isRealString
const { isRealString }  = require('./validation');

// isRealString
describe('isRealString', () => {
	it('should reject non-string values', function () {
		let res = isRealString(98);
		expect(res).toBe(false);
	});
	
	it('should reject strings with only spaces', function () {
		let res = isRealString('      ');
		expect(res).toBe(false);
	});
	
	it('should allow string with non-space characters', function () {
		let res = isRealString('   OR    ');
		expect(res).toBe(true);
	});
});

