/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor(){
    this.result = 0;
  }
  add(num1){
    this.result+= num1;
  }
  subtract(num1){
    this.result -= num1;
  }
  multiply(num1){
    this.result *= num1;
  }
  divide(num1){
    if(num1 === 0){
      throw new Error("Cannot divide with zero");
      
    }
    this.result /= num1;
  }

  getResult(){
    return this.result;
  }
  clear(){
    this.result = 0;
  }
  calculate(str){
    try {
      const cleanExpr = str.replace(/\s+/g, '');

      if(/[^-()\d/*+.]/.test(cleanExpr)){
        throw new Error("Invalid Input");
      }

      this.result = this.evaluate(str);
  } catch (error) {
      throw new Error("Invalid input: " + error.message);
  }
}
evaluate(str){
  let currentNum = '';
  let total = 0;
  let currentOperator = '+';
  let i = 0;

  while(i < str.length) {
    let char = str[i];

    if(/\d|\./.test(char)){
      currentNum += char;
    }
    if (/[-+*/()]/.test(char) || i === str.length - 1) {
      if (currentNum) {
        let num = parseFloat(currentNum);

        if (currentOperator === '+') total += num;
        if (currentOperator === '-') total -= num;
        if (currentOperator === '*') total *= num;
        if (currentOperator === '/') total /= num;

        currentNum = '';
      }

      if (/[-+*/]/.test(char)) currentOperator = char;
    }

    i++;
  }

  return total;
  }
}

module.exports = Calculator;
