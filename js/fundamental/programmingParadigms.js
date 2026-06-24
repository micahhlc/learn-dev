/*
Mutability: In the procedural approach, we're directly modifying the todos array using functions like push and splice, which are mutating operations. 
In contrast, the functional approach uses immutable operations like push (which returns a new array) and avoids directly modifying the original array. 
Instead, it relies on creating new arrays with updated values.

State Management: In the functional approach, the state (i.e., the todos array) is managed outside the functions, and functions operate solely on their 
input parameters. This makes it easier to reason about the behavior of functions and facilitates testing. In the procedural approach, functions may rely 
on shared state (e.g., global variables), which can lead to side effects and make it harder to understand the flow of data.

Pure Functions: Functional programming encourages the use of pure functions, which have no side effects and always return the same output for a given 
input. In the functional approach, addTodo, removeTodo, and toggleTodo are pure functions because they don't modify external state and always produce
 the same output for the same input. In contrast, the procedural approach doesn't enforce purity, so functions may have side effects and depend on 
 external state.
*/

// Functional programming approach
let todos_f = [];

const addTodo_f = (text) => {
  todos_f.push({ text, completed: false });
};

const removeTodo_f = (index) => {
  todos_f.splice(index, 1);
};

const toggleTodo_f = (index) => {
  todos_f[index].completed = !todos_f[index].completed;
};

addTodo_f("Learn JavaScript");
addTodo_f("Build a todo app");

toggleTodo_f(0);

console.log(todos_f);

// Procedural programming approach
let todos = [];

function addTodo(text) {
  todos.push({ text, completed: false });
}

function removeTodo(index) {
  todos.splice(index, 1);
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
}

addTodo("Learn JavaScript");
addTodo("Build a todo app");

toggleTodo(0);

console.log(todos);

// Object-oriented programming approach
class Todo {
  constructor(text) {
    this.text = text;
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

class TodoList {
  constructor() {
    this.todos = [];
  }

  add(text) {
    this.todos.push(new Todo(text));
  }

  remove(index) {
    this.todos.splice(index, 1);
  }

  toggle(index) {
    this.todos[index].toggle();
  }
}

const todoList = new TodoList();
todoList.add("Learn JavaScript");
todoList.add("Build a todo app");

todoList.toggle(0);

console.log(todoList.todos);
