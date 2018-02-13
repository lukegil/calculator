const util = require('util');

/* https://gist.github.com/justmoon/15511f92e5216fa2624b */
function ParseError(message) {
	Error.call(this, message);
	this.defaultMsg = 'Enter an arithmetic, infix formatted string. e.g. "8 + 7"';

	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message || this.defaultMsg;

	util.inherits(ParseError, Error);
};

function DivideByZero(message) {
	Error.call(this, message);
	this.defaultMsg = 'Cannot divide by zero.';

	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message || this.defaultMsg;

	util.inherits(DivideByZero, Error);
};

function OverflowError(message) {
	Error.call(this, message);
	this.defaultMsg = 'Number is too large or small to calculate.';

	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message || this.defaultMsg;

	util.inherits(OverflowError, Error);
};

function NotFound(message) {
	Error.call(this, message);
	this.defaultMsg = 'No history for that sessionKey.';

	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message || this.defaultMsg;

	util.inherits(NotFound, Error);
};

exports.ParseError = ParseError;
exports.DivideByZero = DivideByZero;
exports.OverflowError = OverflowError;
exports.NotFound = NotFound;