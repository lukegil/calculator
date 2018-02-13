const expect = require("chai").expect;
const parser = require('../calculator/parser');
const errors = require('../calculator/errors');
describe('Parse Input String to Object', function() {
	it('Single operator', function() {
		const input = '7 + 8';
		const should_be = [['+'], [7, 8]];
		const was = parser.parse(input);
		expect(was).to.eql(should_be);
	});

	it('Single operator with Negative', function() {
		const input = '8 * -9';
		const should_be = [['*'], [8, -9]];
		const was = parser.parse(input);
		expect(was).to.eql(should_be);
	});

	it('Two decimals', function() {
		const input = '8.18 * 9.0';
		const should_be = [['*'], [8.18, 9.0]];
		const was = parser.parse(input);
		expect(was).to.eql(should_be);
	});

	it('Decimal and integer', function() {
		const input = '8.18 * 9';
		const should_be = [['*'], [8.18, 9]];
		const was = parser.parse(input);
		expect(was).to.eql(should_be);
	});

	it('Truncated decimal and long decimal', function() {
		const input = '8. * 9.28948498';
		const should_be = [['*'], [8.0, 9.28948498]];
		const was = parser.parse(input);
		expect(was).to.eql(should_be);
	});

	it('Scientific notation', function() {
		const input = '80e-2 * 5E+2';
		const should_be = [['*'], [0.8, 500]];
		const was = parser.parse(input);
		expect(was).to.eql(should_be);
	});

	it('Bad ordering of chars - operators', function() {
		const input = '8 * + -9';
		const should_be = errors.ParseError;
		const was = function() {parser.parse(input)};
		expect(was).to.throw(should_be, 'Enter an arithmetic, infix formatted string. e.g. "8 + 7"');
	});

	it('Bad ordering of chars - operands', function() {
		const input = '8-e8 * -9';
		const should_be = errors.ParseError;
		const was = function() {parser.parse(input)};
		expect(was).to.throw(should_be, 'Enter an arithmetic, infix formatted string. e.g. "8 + 7"');
	});

	/* ***** Future Feature - Support multiple operators ***** */

});