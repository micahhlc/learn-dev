// https://www.patterns.dev/posts/singleton-pattern/

// A singleton is a design pattern that restricts a class to have only one instance of it, while providing a global point of access to this instance. Here's an example of the Singleton pattern in JavaScript:

class Singleton {
  static instance;

  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

const singleton1 = new Singleton();
const singleton2 = new Singleton();

console.log(singleton1 === singleton2); // Output: true

// In this example, the Singleton class checks if an instance of itself already exists before creating a new instance. If an instance exists, it returns the existing instance. This ensures that there's only one instance of the Singleton class. The instance is stored in the instance property of the class, which is a static property, making it accessible from the class itself, rather than from instances of the class.

// Use case on DB connection.
class Database {
  static instance;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = connectToDatabase();
    Database.instance = this;
  }

  query(queryString) {
    return this.connection.query(queryString);
  }
}

const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); // Output: true

const db = new Database();

db.query("SELECT * FROM users")
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });

//In this example, we create an instance of the Database class and use the query method to perform a SELECT query on the users table. The query method returns a promise that resolves with the query results or rejects with an error. In this example, we log the results of the query to the console.
