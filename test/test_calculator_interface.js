const expect = require("chai").expect;
const sinon = require('sinon');
const interface = require('../calculator/entry-point');
const errors = require('../calculator/errors');

describe('Main calculator IO - Types', function() {
    it('Number.toString() returns string', function() {
        const input = '1 + 7';
        const should_be = '8';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Number raises a TypeError', function() {
        const input = 7;
        const should_be = TypeError;
        const was = function() {interface.calculate(input)};
        expect(was).to.throw(should_be, 'Enter a string containing [0-9], +, *, /, or -.');
    });

    it('Object raises a TypeError', function() {
        const input = {};
        const should_be = TypeError;
        const was = function() {interface.calculate(input)};
        expect(was).to.throw(should_be, 'Enter a string containing [0-9], +, *, /, or -.');
    });

    it('Unparseable string raises ParseError', function() {
        const input = 'This isn\'t a parseable string!';
        const should_be = interface.errors.ParseError;
        const was = function() {interface.calculate(input)};
        expect(was).to.throw(should_be, 'Enter an arithmetic, infix formatted string. e.g. "8 + 7"');
    });

});

describe('Main calculator IO - Addition', function() {
    it('Add two whole numbers', function() {
        const input = '5 + 4';
        const should_be = '9';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Add negative and positive integer', function() {
        const input = '-5 + 4';
        const should_be = '-1';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Add positive and negative integer', function() {
        const input = '6 + -2';
        const should_be = '4';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Add two negative integers', function() {
        const input = '-6 + -2';
        const should_be = '-8';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Add two real numbers', function() {
        const input = '5.90 + -4.089';
        const should_be = '1.811';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

});


describe('Main calculator IO - Subtraction', function() {
    it('Subtract two whole numbers', function() {
        const input = '5 - 4';
        const should_be = '1';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Subtract negative and positive integer', function() {
        const input = '-5 - 4';
        const should_be = '-9';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Subtract positive and negative integer', function() {
        const input = '6 - -2';
        const should_be = '8';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Subtract two negative integers', function() {
        const input = '-6 - -2';
        const should_be = '-4';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Subtract two real numbers', function() {
        const input = '5.90 - -4.089';
        const should_be = '9.989';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

});


describe('Main calculator IO - Multiplication', function() {
    it('Multiply two whole numbers', function() {
        const input = '5 * 4';
        const should_be = '20';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Multiply negative and positive integer', function() {
        const input = '-5 * 4';
        const should_be = '-20';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Multiply positive and negative integer', function() {
        const input = '6 * -2';
        const should_be = '-12';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Multiply two negative integers', function() {
        const input = '-6 * -2';
        const should_be = '12';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Multiply two real numbers', function() {
        const input = '5.90 * -4.089';
        const should_be = '-24.125100000000003';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Multiply by 0', function() {
        const input = '5.90 * 0';
        const should_be = '0';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

});


describe('Main calculator IO - Division', function() {
    it('Divide two whole numbers', function() {
        const input = '5 / 4';
        const should_be = '1.25';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Divide negative and positive integer', function() {
        const input = '-5 / 4';
        const should_be = '-1.25';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Divide positive and negative integer', function() {
        const input = '6 / -2';
        const should_be = '-3';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Divide two negative integers', function() {
        const input = '-6 / -2';
        const should_be = '3';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Divide two real numbers', function() {
        const input = '5.90 / -4.089';
        const should_be = '-1.4428955734898508';
        const was = interface.calculate(input);
        expect(was).to.equal(should_be);
    });

    it('Divide by zero', function() {
        const input = '8 / 0';
        const should_be = errors.DivideByZero;
        const was = function() {interface.calculate(input)};
        expect(was).to.throw(should_be, 'Cannot divide by zero.');
    });

});

describe('Main calculator IO - Large and Small Numbers', function() {
    it('Javascript returns Infinity', function() {
        const input = Number.MAX_VALUE.toString() + '* 2';
        const should_be = errors.OverflowError;
        const was = function() {interface.calculate(input)};
        expect(was).to.throw(should_be, 'Number is too large or small to calculate.');
    });

    it('Javascript returns Infinity', function() {
        const input = Number.MAX_VALUE.toString() + '* -2';
        const should_be = errors.OverflowError;
        const was = function() {interface.calculate(input)};
        expect(was).to.throw(should_be, 'Number is too large or small to calculate.');
    });

});

describe('Main calculator IO - History', function() {
    it('Operate on previous value', function() {
        sinon.stub(interface.history, 'get').callsFake(function(session) {
            return 7.9;
        });
        const input = '_* 2';
        const sessionKey = '123'
        const should_be = '15.8';
        const was = interface.calculate(input, sessionKey);
        expect(was).to.equal(should_be);

        interface.history.get.restore();

        //To Do: Don't manually reset
        interface.history.set(sessionKey, undefined);
    });

    it('Cannot find User', function() {
        const input = '_* 2';
        const sessionKey = '123'
        const should_be = errors.NotFound;
        const was = function(){interface.calculate(input, sessionKey)};
        expect(was).to.throw(should_be, 'No history for that sessionKey.');
    });

});