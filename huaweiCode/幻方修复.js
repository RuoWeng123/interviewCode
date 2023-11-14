// 输入一个矩阵，其满足 行的和 == 列的和 == 对角线的和，且矩阵中的元素都是正整数；现在调整其中两个数的位置，找出这两个数的位置并调换到正确的位置上。
// 输入描述: N*N 的矩阵
// 输出描述: 两个数的位置，以空格分隔

// 判断行 相等
function checkRowEqual(matrix){
  let res = [];
  for(let i = 0; i < matrix.length; i++){
    let sum = 0;
    for(let j = 0; j < matrix[i].length; j++){
      sum += matrix[i][j];
    }
    res.push(sum);
  }
  return res;

}
// 判断列 相等
function checkColEqual(matrix){
  let res = [];
  for(let i = 0; i < matrix.length; i++){
    let sum = 0;
    for(let j = 0; j < matrix[i].length; j++){
      sum += matrix[j][i];
    }
    res.push(sum);
  }
  return res;
}
// 判断对角线 相等
function checkDiagonalEqual(matrix){
  let res = [];
  let sum = 0;
  for(let i = 0; i < matrix.length; i++){
    sum += matrix[i][i];
  }
  res.push(sum);
  sum = 0;
  for(let i = 0; i < matrix.length; i++){
    sum += matrix[i][matrix.length - 1 - i];
  }
  res.push(sum);
  return res;
}