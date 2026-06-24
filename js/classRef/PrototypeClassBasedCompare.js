// const Shape = {
//     type: "Shape",
//     getType: function() {
//       return this.type;
//     }
//   };

class Shape {
  constructor(type) {
    this.type = type;
  }
  getType() {
    return this.type;
  }
}

//   const Circle = Object.create(Shape);
//   Circle.radius = 5;
//   Circle.getArea = function() {
//     return Math.PI * this.radius * this.radius;
//   };
class Circle extends Shape {
  constructor(radius) {
    super("Circle");
    this.radius = radius;
  }
  getArea() {
    return Math.PI * this.radius * this.radius;
  }
}

//   const Rectangle = Object.create(Shape);
//   Rectangle.width = 10;
//   Rectangle.height = 20;
//   Rectangle.getArea = function() {
//     return this.width * this.height;
//   };
class Rectangle extends Shape {
  constructor(width, height) {
    super("Rectangle");
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}

//   const circle = Object.create(Circle);
//   const rectangle = Object.create(Rectangle);

const circle = new Circle(5);
const rectangle = new Rectangle(10, 20);

console.log(circle.getType()); // Output: "Circle"
console.log(rectangle.getType()); // Output: "Rectangle"
console.log(circle.getArea()); // Output: 78.53981633974483
console.log(rectangle.getArea()); // Output: 200

console.log(circle);
