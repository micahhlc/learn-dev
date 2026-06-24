// Function to add 1 to a number
const addOne = (x) => x + 1;

// Function to multiply a number by 2
const multiplyByTwo = (x) => x * 2;

// Function composition: combining addOne and multiplyByTwo
const addOneAndMultiplyByTwo = (x) => multiplyByTwo(addOne(x));

console.log(addOneAndMultiplyByTwo(3)); // Output: 8
