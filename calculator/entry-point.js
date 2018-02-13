const errors = require('./errors');
const parser = require('./parser');
const arithmetic = require('./arithmetic');
const hMod = require('./history');
const config = require('../config/config').config;

const history = new hMod.History();
function calculate(inputStr, sessionKey) {
    /* Runs the arithmetic statement and returns the answer as a string 

        :param string inputStr: A string formatted via infix notation
            - e.g. 4 * 7; 6 + -9;
        :param string sessionKey: (optional) The id to store the answer under. 
                                  can be used to operate on the previous answer.
                                  e.g. calculate('4 + 5', 'some-key');
                                          calculate('- 2', 'some-key');
                                          >> '7';
    */
    if (typeof(inputStr) !== 'string') {
        throw TypeError('Enter a string containing [0-9], +, *, /, or -.');

    } else if (typeof(sessionKey) !== 'undefined' && inputStr.indexOf('_') > -1) {
        console.log('here i am!')
        const stored = history.get(sessionKey);
        inputStr = inputStr.replace(/_/g, stored);
    }

    // convert it from string to [[operators], [numbers]]
    const polishNotated = parser.parse(inputStr);

    // the answer
    const finalValue = arithmetic.process(polishNotated).toString();

    // save it if sessionKey provided
    if (sessionKey)
        history.set(sessionKey, finalValue);

    return finalValue;
}

exports.calculate = calculate;
exports.errors = errors; // exported for testing
exports.history = history;