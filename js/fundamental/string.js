let str = '';

// function ucFirst(str) {
//   if (str) {
//     let fCCodePoint = str[0].codePointAt(0);
//     firstChar = String.fromCodePoint(fCCodePoint - 32);
//     firstChar = fCCodePoint < 90 ? String.fromCodePoint(fCCodePoint + 31) : firstChar;

//     let remainChars;
//     remainChars = str.substring(1, str.length);
//     return firstChar + remainChars;
//   }
// }

function ucFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

console.log(ucFirst('AassaAohn')); // John
