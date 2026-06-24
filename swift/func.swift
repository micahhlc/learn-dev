func increment(_ value: inout Int, by step: Int = 1) {
  value += step
}
var x = 10
increment(&x)
print(x) // 11

func sum(_ nums: Int...) -> Int { nums.reduce(0, +) }
print(sum(1,2,3))


// Default parameter values
func greet(name: String, greeting: String = "Hello") {
    print("\(greeting), \(name)!")
}
greet(name: "David")           // Hello, David!
greet(name: "David", greeting: "Hi") // Hi, David!

// Argument labels vs parameter names
func move(from start: Int, to end: Int) {
    print("Moving from \(start) to \(end)")
}
move(from: 0, to: 10)  // reads like a sentence

// Variadic parameters (any number of args)
func sum(_ numbers: Int...) -> Int {
    numbers.reduce(0, +)
}
sum(1, 2, 3, 4)  // 10

// inout — modify a variable in place
func double(_ n: inout Int) {
    n *= 2
}
var x = 5
double(&x)  // x is now 10

// Functions as values / closures
let multiply: (Int, Int) -> Int = { a, b in a * b }
multiply(3, 4)  // 12

// Trailing closure syntax
[1, 2, 3].map { $0 * 10 }  // [10, 20, 30]