function Calculator() {
  // this.read = function () {
  //   this.a = +prompt('a: ');
  //   this.b = +prompt('b: ');
  // };
  this.read = function (v1, v2) {
    this.a = +v1;
    this.b = +v2;
  };
  this.sum = function () {
    return this.a + this.b;
  };
  this.mul = function () {
    return this.a * this.b;
  };
}

// let cal = new Calculator();
// cal.read(4, 15);
// console.log(cal.sum());

class Cal {
  read(v1 = 0, v2 = 0) {
    this.a = +v1;
    this.b = +v2;
    // if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
    //   throw new Error('Both inputs must be valid numbers');
    // }
    if (!Number.isFinite(this.a) || !Number.isFinite(this.b)) {
      console.log(`${v1} or ${v2} is not a number.`);
    }
  }
  sum() {
    return this.a + this.b;
  }
  mul() {
    return this.a * this.b;
  }
}

// let billion = 1_000_000_000;
let billion = 1e9;
console.log(billion);
