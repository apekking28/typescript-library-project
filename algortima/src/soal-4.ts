function diagonalDifference(matrix: number[][]): number {
    let primaryDiagonalSum = 0;
    let secondaryDiagonalSum = 0;
    const n = matrix.length;
  
    for (let i = 0; i < n; i++) {
      primaryDiagonalSum += matrix[i][i];
      secondaryDiagonalSum += matrix[i][n - 1 - i];
    }
  
    return primaryDiagonalSum - secondaryDiagonalSum;
  }
  
  // Test the function
  const matrix1 = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
  ];
  
  const result1 = diagonalDifference(matrix1);
  console.log(result1); // Output: 3