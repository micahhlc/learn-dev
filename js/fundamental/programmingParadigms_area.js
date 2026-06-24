// Functional programming approach
const calculateArea_f = (length, width) => length * width;

console.log(calculateArea_f(5, 10)); // Output: 50

// Procedural programming approach
function calculateArea_p(length, width) {
   return length * width;
 }
 
 console.log(calculateArea_p(5, 10)); // Output: 50
 
 // Object-oriented programming approach
class Rectangle {
   constructor(length, width) {
     this.length = length;
     this.width = width;
   }
 
   calculateArea() {
     return this.length * this.width;
   }
 }
 
 const rectangle = new Rectangle(5, 10);
 console.log(rectangle.calculateArea()); // Output: 50
 
