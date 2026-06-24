// https://javascript.info/symbol
// https://javascript.info/object-toprimitive

let user = {
  name: 'John',
  money: 1000,

  [Symbol.toPrimitive](hint) {
    // console.log(`hint: ${hint}`);
    return hint == 'string' ? `{name: "${this.name}"}` : this.money;
  },
};

// conversions demo:
console.log(user); // hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500

// For instance, here user does the same as above using a combination of toString and valueOf instead of Symbol.toPrimitive:

let user2 = {
  name: 'John',
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  },
};

console.log(user2); // toString -> {name: "John"}
console.log(+user2); // valueOf -> 1000
console.log(user2 + 500); // valueOf -> 1500

let s = 'hello';
console.log(typeof s); // "string" ✅ primitive type
console.log(s instanceof String); // false ❌ not a String object

let o = new String('hello');
console.log(typeof o); // "object" ✅ because it's created by new String()
console.log(o instanceof String); // true ✅ real String object

let userA = { name: 'John' };
console.log(userA); // [object Object]
console.log(userA.valueOf() === userA); // true
