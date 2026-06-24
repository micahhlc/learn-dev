/*
// Default parameter values
func greet(name: String, greeting: String = "Hello") {
    print("\(greeting), \(name)!")
}
greet(name: "David")           // Hello, David!
greet(name: "David", greeting: "Hi") // Hi, David!
*/

/* 
Part	Role	Used where
from	argument label	at the call site
start	parameter name	inside the function body
to	argument label	at the call site
end	parameter name	inside the function body
 */

/* // Argument labels vs parameter names
func move(from start: Int, to end: Int) {
    print("Moving from \(start) to \(end)")
}
move(from: 0, to: 10)  // reads like a sentence

 */


/* 
// Variadic parameters (any number of args)
func sum(_ numbers: Int...) -> Int {
    numbers.reduce(0, +)
}
print("sum: ", sum(1, 2, 3, 4))  // 10 */

// inout — modify a variable in place

 /* it's essentially the same concept as a pointer in C:

C:
void double_it(int *n) { *n *= 2; }
int x = 5;
double_it(&x);  // pass address of x
Swift inout:

func double(_ n: inout Int) { n *= 2 }
var x = 5
double(&x)  // & looks the same!
The & in both cases means "pass the address of this variable, not a copy." Swift just wraps it more safely — no raw pointer arithmetic, no null pointer crashes, the compiler enforces rules around it.

So yes, your intuition is correct. inout is Swift's safe, high-level version of a pointer for this use case. */
/* 
func double(_ n: inout Int) {
    n *= 2
}
var x = 5
double(&x)
print("double: ", x)  // x is now 10
 */
/* 
// Functions as values / closures
let multiply: (Int, Int) -> Int = { a, b in a * b }
multiply(3, 4)  // 12

// Trailing closure syntax
[1, 2, 3].map { $0 * 10 }  // [10, 20, 30] */

func appendGreeting(_ s: String) -> String {
    s + ", Hello!"
}
var message = "David"
let return_msg = appendGreeting(message)
print(message, return_msg)  // "David, Hello!"