/* let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
};
Write the code to sum all salaries and store in the variable sum. Should be 390 in the example above.

If salaries is empty, then the result must be 0.

let sum = 0;
for (let k in salaries) {
  sum += salaries[k];
  console.log(k, ': ', salaries[k]);
  console.log(`${k}: ${salaries[k]}`);
}

console.log(sum); */

/* 
let menu = {
  width: 200,
  height: 300,
  title: 'My menu',
};

function multiplyNumeric(obj) {
  for (let k in obj) {
    if (typeof obj[k] != 'number') continue;
    obj[k] = obj[k] * 2;
    console.log(obj[k]);
  }
  console.log(obj);
}

multiplyNumeric(menu);

console.log('menu width=' + menu.width + ' height=' + menu.height + ' title=' + menu.title);
 */
/* 
let userA = {
  name: 'John',
};
let userB = {
  name: 'Kaho',
};

function sayHi() {
  console.log(this.name + ' hi!');
}

userA.f = sayHi;
userB.f = sayHi;

userA.f();
userB.f();
 */
