const expect = require("chai").expect;
const arithmetic = require('../calculator/arithmetic')
const errors = require('../calculator/errors');

describe('Run operations', function() {
    it('addition', function() {
        const input = [['+'], [7.2, 4.8]];
        const should_be = 12;
        const was = arithmetic.process(input);
        expect(was).to.equal(should_be);
    });    

    it('subtraction', function() {
        const input = [['-'], [7.2, 4.8]];
        const should_be = 2.4000000000000004
        const was = arithmetic.process(input);
        expect(was).to.equal(should_be);
    });

    it('multiplication', function() {
        const input = [['*'], [7.2, 4.8]];
        const should_be = 34.56;
        const was = arithmetic.process(input);
        expect(was).to.equal(should_be);
    });

    it('division', function() {
        const input = [['/'], [7.2, 4.8]];
        const should_be = 1.5;
        const was = arithmetic.process(input);
        expect(was).to.equal(should_be);
    });

    it('Unknown operator', function() {
        const input = [['k'], [1,2]];
        const should_be = errors.ParseError;
        const was = function() {arithmetic.process(input)};
        expect(was).to.throw(should_be, 'Enter an arithmetic, infix formatted string. e.g. "8 + 7"');
    });

});