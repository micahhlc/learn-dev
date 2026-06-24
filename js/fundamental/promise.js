/*
A Promise in JavaScript is an object representing the eventual completion or failure of an asynchronous operation. It acts as a placeholder 
for a value that is initially unknown, typically because the computation of its value is not yet complete.
Key Characteristics of Promises:
Stateful: A Promise is in one of three states:
Pending: Initial state, neither fulfilled nor rejected.
Fulfilled: The operation completed successfully.
Rejected: The operation failed.
*/

// const promise = new Promise( (res, rej) => {
//    setTimeout(() => {
//       res("Success!");
//    }, 1000);
// });

// promise
//    .then( (value) => {
//       console.log(value);
//    })
//    .catch((err) => {
//       console.log(err);
//    });


// Define a function that returns a Promise
function fetchData() {
   return new Promise((resolve, reject) => {
     // Simulate an asynchronous operation (e.g., fetching data from a server)
     setTimeout(() => {
       const data = "Data fetched successfully";
       // Resolve the Promise with the fetched data
       resolve(data);
       // Uncomment the next line to simulate an error and reject the Promise
      //  reject(new Error("Failed to fetch data"));
     }, 2000); // Simulate a delay of 2 seconds
   });
 }
 
//  Call the fetchData function
 console.log("Fetching data... from Promise");
 fetchData()
   .then((data) => {
     // The Promise was resolved successfully
     console.log("Data received from Promise:", data);
   })
   .catch((error) => {
     // The Promise was rejected
     console.error("Error fetching data from Promise:", error.message);
   });
 

/*
   In JavaScript, you can treat promises and promise returning functions as if they are synchronous, using the async/await syntax. This makes asynchronous code much easier to read and reason about.
*/

 // Define an async function to fetch and handle data
async function fetchAndHandleData() {
   try {
     // Call the fetchData function inside a try block
     const data = await fetchData();
     // If the Promise is resolved successfully, log the received data
     console.log("Data received from Async:", data);
   } catch (error) {
     // If the Promise is rejected, log the error message
     console.error("Error fetching data from Async:", error.message);
   }
 }
 // Call the fetchAndHandleData function
console.log("Fetching data... from Async");
fetchAndHandleData();
 