// 给一个01矩阵，1代表是陆地，0代表海洋，如果两个1相邻，那么这两个1属于同一个岛。
// 求这个矩阵中岛的个数。
function countIslands(matrix) {
  let count = 0;
  const rows = matrix.length;
  const cols = matrix[0].length;

  function dfs(row, col) {
    if (row < 0 || col < 0 || row >= rows || col >= cols || matrix[row][col] === '0') {
      return;
    }

    // 将1 修改为0，表示已经访问过
    matrix[row][col] = '0';

    dfs(row - 1, col);
    dfs(row + 1, col);
    dfs(row, col - 1);
    dfs(row, col + 1);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === '1') {
        count++;
        // 递归，将其本身，和其上下左右 都标记为0 ，简化了逻辑, 不需要判断是否与其他岛屿相连
        dfs(i, j);
      }
    }
  }

  return count;
}
