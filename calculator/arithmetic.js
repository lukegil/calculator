const errors = require('../calculator/errors')

function process(polishNotated) {
	/* A simple function to do the math 
		NB: currently assumes just a single operator. In the future
			just run `reduce` on the numbers array, popping the 
			operator on each iteration to allow multiple

		:param array polishNotated: 
		:return: Number
	*/
	const operators = polishNotated[0];
	const numbers = polishNotated[1];

	const num1 = numbers.shift();
	const num2 = numbers.shift();
	
	let result;
	switch (operators.pop()) {
		case '+': 
			result = num1 + num2;
			break;
		case '-':
			result = num1 - num2;
			break;
		case '*': 
			result = num1 * num2;
			break;
		case '/': 
			if (num2 === 0) {
				throw new errors.DivideByZero();
			}
			result = num1 / num2;
			break;
		default:
			throw new errors.ParseError();
			break;
	}

	if (result === Infinity || result === -Infinity) {
		throw new errors.OverflowError();
	}
	return result;
}

exports.process = process;