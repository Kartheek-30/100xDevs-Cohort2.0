/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrome as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let cleanStr = (str) => str.replace(/[^\w]/gi, '').toLowerCase();
    let reverseString = cleanStr(str).split('').reverse().join('');
    console.log(reverseString)
    if (cleanStr(str) == reverseString){
        return true;
    } else{
        return false;
    }
}

module.exports = isPalindrome;
