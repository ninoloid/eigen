function reverseStringWithoutNumbers(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (isNaN(char)) {
      result = char + result;
    } else {
      result += char;
    }
  }

  return result;
}

console.log(reverseStringWithoutNumbers("NEGIE1")); // Output: EIGEN1
console.log(reverseStringWithoutNumbers("NE2GIE1")); // Output: EIGEN21
