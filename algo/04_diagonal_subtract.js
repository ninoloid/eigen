function diagonalSubtract(matrix) {
  let diagonal1 = 0;
  let diagonal2 = 0;

  for (let i = 0; i < matrix.length; i++) {
    diagonal1 += matrix[i][i];
    diagonal2 += matrix[i][matrix.length - i - 1];
  }

  return diagonal1 - diagonal2;
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(diagonalSubtract(matrix)); // Output: 3

const second_matrix = [
  [9, 2, 4],
  [7, 1, 4],
  [4, 8, 3],
];
console.log(diagonalSubtract(second_matrix)); // Output: 4

const third_matrix = [
  [1, 2, 4],
  [7, 1, 4],
  [4, 8, 3],
];
console.log(diagonalSubtract(third_matrix)); // Output: -4
