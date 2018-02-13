/* A CLI to help run the calculator package. */
const readline = require('readline');
const calculator = require('../calculator/entry-point');

const LANGUAGE = {
	help: '\n\nEnter an arithmetic equation using the format "7 + 8"\n You can use integers, real numbers, and scientific notation.\n\n',
	hint: '\n Hint: To use your previous answer, put a "_" in its place, e.g. "_ + 8"',
	notFound: 'You don\'t have any history!',
	parseError: 'Looks like you entered an incorrectly formatted string! Remember that it should look like "7 * -9"',
	divideByZero: 'Division by zero is undefined!',
	overFlow: 'Whoa! Your numbers are to big for me to understand.',
	unknownError: 'Looks like we ran into a problem... try entering you query again',
};

const COMMANDS = {
	help: () => LANGUAGE.help,
	clear: () => rl.close(),
};

const SESSION_KEY = Date.now();

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function calculate(input) {
	let result;
	try {
		result = calculator.calculate(input, SESSION_KEY);		

	} catch(e) {
		if (e.name === 'ParseError')
			result = LANGUAGE.parseError;
		else if (e.name === 'DivideByZero')
			result = LANGUAGE.divideByZero;
		else if (e.name === 'OverflowError')
			result = LANGUAGE.overFlow;
		else if (e.name === 'NotFound')
			result = LANGUAGE.notFound;
		else
			result = LANGUAGE.unknownError;
	}
	return result;
} 

function inputLoop() {
	let iter = 0;
	let text = '';

	console.log(LANGUAGE.help);
	rl.prompt();

	rl.on('line', (input) => {
		let answer;
		input = input.trim();
		if (COMMANDS[input]) {
			answer = COMMANDS[input]();
		} else if (input) {
 			answer = calculate(input);			
 		}

 		if (answer) {
	 		console.log('>> ' + answer);
 		}
 	
 		if (iter === 1) {
 			console.log(LANGUAGE.hint);
 		}
 		iter += 1;
 		rl.prompt();
	});

}

inputLoop();