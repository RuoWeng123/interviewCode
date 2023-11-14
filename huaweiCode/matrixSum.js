// 给定一个二维整数矩阵，在矩阵中选出一个子矩阵，使得子矩阵内所有的数字和尽量大，最大子举证选取原则是原来矩阵中一块相互连续的矩形区域

function matrixSum(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let max = 0;

  function sum(row, col, r, c) {
    let sum = 0;
    for (let i = row; i <= r; i++) {
      for (let j = col; j <= c; j++) {
        sum += matrix[i][j];
      }
    }
    return sum;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {

      for (let r = row; r < rows; r++) {
        for (let c = col; c < cols; c++) {
          max = Math.max(max, sum(row, col, r, c));
        }
      }

    }
  }

  return max;
}
let matrix = [
  [-3, 5, -1, 5],
  [2,4,-2,4],
  [-1,3,-1,3],
]
console.log(matrixSum(matrix));