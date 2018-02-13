const errors = require('./errors');
const config = require('../config/config').config;

function Character(curChar, prevCharacter) {
    /* An object to help determine what a single byte is like 

        :param string curChar: An ascii character 
        :param Character prevCharacter: the previous Character 
            in the string
        :return: undefined
    */
    this.char = curChar ? curChar.toLowerCase() : undefined;
    this.fullChar = this.char || '';

    this.isSign = function() {
        const signLike = ['-', '+'].indexOf(this.char) > -1;
        const rightPlace = ((typeof(prevCharacter.char) === 'undefined') || 
                            prevCharacter.isOperator() || 
                            prevCharacter.isScientific());
        return signLike && rightPlace;
    };

    this.isNumber = function() {
        const rightRange = (this.char &&
                           (48 <= this.char.charCodeAt(0)) && 
                           (this.char.charCodeAt(0) <= 57));
        return rightRange;
    };

    this.isOperator = function() {
        const opLike = config.ALLOWED_BINARY_OPS.indexOf(this.char) > -1;
        const rightPlace = prevCharacter && (prevCharacter.isNumber() || prevCharacter.isDecimal());
        return opLike && rightPlace;
    };

    this.isScientific = function() {
        const sciLike = (this.char === 'e');
        const rightPlace = prevCharacter && prevCharacter.isNumber();
        return sciLike && rightPlace;
    }

    this.isDecimal = function() {
        const decLike = (this.char === '.');
        return decLike;
    }

    this.add = function(addChar) {
        /* Used to shift "curChar" into the prevChar queue
            :param Character addChar: the character to append 
                to fullChar
            :return: a new instance of Character 
        */
        const newChar = new Character(addChar.char, this);
        newChar.fullChar = this.fullChar + addChar.fullChar;
        newChar.char = addChar.char;
        return newChar;
    }
}

function validNonOperator(cur) {
    /* cur - Character */
    return (cur.isScientific() || cur.isNumber() || 
            cur.isSign() || cur.isDecimal());
}

function parse(inputStr) {
    /* Convert a string into a Polish Notation object
        '8 * 7' -> [[*], [8, 7]]
        This should allow the easy expansion to multiple operators

        :param string inputStr: the equation to format
        :return: [[operators], [numbers]]
    */
    inputStr = inputStr.toLowerCase().replace(/ /g, '');

    const operators = [];
    const numbers = [];

    const il = inputStr.length;
    let prev = new Character(undefined, undefined); 
    for (let i = 0; i < il; i++) {
        const cur = new Character(inputStr[i], prev);

        // operators are the delimiter
        if (cur.isOperator()) {
            numbers.push(parseFloat(prev.fullChar, 10));
            operators.push(cur.fullChar);
            prev = cur;

        // beginning of a new number
        } else if (!prev || (prev.isOperator() && validNonOperator(cur))) {
            prev = cur;

        // inside of a number
        } else if (validNonOperator(cur)) {
            prev = prev.add(cur);

        } else {
            throw new errors.ParseError();
        }
    }

    // clear out what remains
    if (prev.isNumber()) {
        numbers.push(parseFloat(prev.fullChar, 10));
    } else {
        throw new errors.ParseError();
    }

    // operators in polish notation are read right to left
    operators.reverse();

    return [operators, numbers] 
}

exports.parse = parse;