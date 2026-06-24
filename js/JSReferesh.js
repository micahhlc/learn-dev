// Arrow Function
// const multiply = number => number * 2;
// console.log(multiply(5));

// Class in ES6
// class Human {
//     gender = "male";
//     printGender = () => {
//         console.log(this.gender)
//     }
// }
// class Person extends Human {
//     name = "Micah";
//     printMyName = () => {
//         console.log(this.name);
//     }    
// }
// const person = new Person();
// person.printMyName();
// person.printGender(); 

//// Spread Operators

// var array = ["a", "b", "c", "d", "e"]
// var newArray = [1, 2, 3, ...array, 1, 2, 3]
// console.log("array: ", array)
// console.log("newArray: ", newArray)

// const filter = (...args) => {
//     return args.filter(arg => arg ==="a")
// }
// console.log(filter(1,2,3,11,"a"))


//// Destructuring

// const numbers = [1,2,3];
// [n1, , n3] = numbers
// console.log(n1, n3)


// const number = 7; 
// const num2 = number;

// console.log(num2);

// Reference and Primitive Types
// Object and Array are pointer reference type

//// Array methods 8 commons

/* let items = [
    { name: "Toaster", price: 3200 },
    { name: "Blender", price: 5000 },
    { name: "Microwave", price: 12000 },
    { name: "Vacuum cleaner", price: 18000 },
    { name: "Coffee maker", price: 6000 },
    { name: "Iron", price: 4000 },
    { name: "Hair dryer", price: 2500 },
    { name: "Television", price: 45000 }
  ]; */
  /* 
  const filteredItems = items.filter(item => item.price < 10000);
  console.log(filteredItems);

  const sortedItems = items.sort((a, b) => a.price - b.price);
  console.log(sortedItems);

  const mapItems = items.map(item => item.name);
  console.log(mapItems);

  const foundItem = items.find(item => item.name === "Toaster");
  console.log(foundItem);

  const someItems = items.some(item => item.name === "Toaster");
  console.log(someItems);

  const everyItems = items.every(item => item.price < 50000);
  console.log(everyItems);

  const reduceItems1 = items.reduce((acc, item) => acc + item.price, 0);
  console.log(reduceItems1);

  const reduceItems2 = items.reduce((acc, item) => acc - item.price, 100000);
  console.log(reduceItems2);

  var randomArray = [22, 39, 12, 63, 49, 8, 92, 57, 74, 31];
  const includedItems = randomArray.includes(92);
  console.log(includedItems);

 */
//// Falsey Values
/*
As we've alluded to already, another essential concept to understand in JavaScript is that some values (aside from false) are actually false as well, when they're used in a context where JavaScript expects a boolean value! Even if they do not have a "value" of false, these values will be translated (or "coerced") to false when evaluated in a boolean expression.
In JavaScript there are 6 falsey values:
* 0
* ""
* null
* undefined
* false
* NaN (short for not a number)

!!false
!!-1
!!-0
!![]
!!{}
!!""
!!null

!! convert value to boolean
*/

//// Ternary Operators
/*
expression ? pathIfTrue : pathIfFalse

//This is equivalent to:
if (expression) {
    pathIfTrue
} else {
    pathIfFalse
}

e.g., 

if (guess === "7") {
    console.log("Correct!");
} else {
    console.log("Incorrect!");
}

// here's our first ternary
guess === "7" ? console.log("Correct!") : console.log("Incorrect!");

//store value
let num = 3;
let comparison = num > 0 ? "Greater than 0" : "Less than or equal to 0";
comparison; // this will equal "Greater than 0", since 3 > 0.
*/

/* 
// Sort a 2 dimensional array
const points = [[123,40], [100,1232], [1,44], [5,111], [25,889], [10,2000]];
// Sort the numbers in ascending order:
points.sort((a, b) => a[1]-b[1]);
console.log(points); */
/* 
// Sort an Object. 
let arr = [  { name: "John", age: 25 },  { name: "Jane", age: 32 },  { name: "Jim", age: 19 }];

arr.sort(function(a, b) {
  return a.age - b.age;
});

console.log(arr);
// Output: [{ name: "Jim", age: 19 }, { name: "John", age: 25 }, { name: "Jane", age: 32 }]
 */

    
    
// let verbs = ["飲む", "読む", "持つ","畳む"];

// let muV = verbs.filter((v) => v.includes("む"));
// for (let verb of muV) {
//   let stem = verb.slice(0, verb.length - 1);
//   let verbArray = {};
  
//   verbArray.stem = {
//     negative: stem + "まない",
//     passive: stem + "まれる",
//     masu: stem + "みます",
//     plain: stem + "む",
//     te: stem + "んで",
//     ta: stem + "んだ",
//     potential: stem + "める",
//     conditional: stem + "めば",
//     imperative: stem + "め",
//     volitional: stem + "もう"
//   };
//   console.log(verbArray);
// }




