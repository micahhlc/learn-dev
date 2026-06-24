const getCounter = () => {
   let counter = 0;
   return {
     get: () => counter,
     add: () => ++counter,
     minus: () => --counter,
   };
 };

 let x = getCounter();
 
 while (x.get() < 10) {
   console.log(x.add());
 }
 


