/* const Shape = {
    type: "shape",
    getType: function() {
      return this.type;
    }
  };
  
  const Circle = {
    __proto__: Shape,
    type: "circle",
    radius: 5,
    getArea: function() {
      return Math.PI * this.radius * this.radius;
    }
  };
  
  const Rectangle = {
    __proto__: Shape,
    type: "rectangle",
    width: 10,
    height: 20,
    getArea: function() {
      return this.width * this.height;
    }
  };
  const circle = Object.create(Circle);
  const rectangle = Object.create(Rectangle); 
  */

/* 
  class Shape {
    constructor() {
      this.type = "shape";
    }
  
    getType() {
      return this.type;
    }
  }
  
  class Circle extends Shape {
    constructor() {
      super();
      this.type = "circle";
      this.radius = 5;
    }
  
    getArea() {
      return Math.PI * this.radius * this.radius;
    }
  }
  
  class Rectangle extends Shape {
    constructor() {
      super();
      this.type = "rectangle";
      this.width = 10;
      this.height = 20;
    }
  
    getArea() {
      return this.width * this.height;
    }
  }
  
  const circle = new Circle();
  const rectangle = new Rectangle(); 
  */

//   console.log(circle.getType()); // Output: "circle"
//   console.log(rectangle.getType()); // Output: "rectangle"
//   console.log(circle.getArea()); // Output: 78.53981633974483
//   console.log(rectangle.getArea()); // Output: 200
//   console.log(circle);
/* 

*/
class Engine {
  start() {
    console.log("Engine started");
  }
}
class Car extends Engine {
  constructor() {
    super();
    this.type = "normal";
    this.engine = Engine;
  }
  start() {
    super.start();
    console.log(`Car with ${this.type} type started`);
  }
}
class SportsCar extends Car {
  constructor() {
    super();
    this.type = "sports";
  }
  start() {
    super.start();
    console.log(`Sports car is expensive!`);
  }
}

const toyota = new Car();
toyota.start();
const maserati = new SportsCar();
maserati.start();

// Another Car example
class EngineNew {
  constructor(horsepower) {
    this.horsepower = horsepower;
  }
}

class Wheel {
  constructor(diameter) {
    this.diameter = diameter;
  }
}

class CarNew {
  constructor(make, model, engine, wheels) {
    this.make = make;
    this.model = model;
    this.engine = engine;
    this.wheels = wheels;
  }
}

const engine = new EngineNew(250);
const wheels = [new Wheel(18), new Wheel(18), new Wheel(18), new Wheel(18)];
const car = new CarNew("Tesla", "Model S", engine, wheels);

console.log(car);
