// 输入 二维矩阵，0表示通路，1表示障碍物，从左上角走到右下角，只能上下左右走，求最短路径

function minPath(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const queue = [[0, 0]];
  const visited = new Array(rows).fill(0).map(() => new Array(cols).fill(false));
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  let step = 0;

  while (queue.length) {
    const size = queue.length;
    step++;

    for (let i = 0; i < size; i++) {
      const [row, col] = queue.shift();
      if (row === rows - 1 && col === cols - 1) {
        return step;
      }

      for (const [x, y] of dirs) {
        const r = row + x;
        const c = col + y;
        if (r < 0 || c < 0 || r >= rows || c >= cols || visited[r][c] || matrix[r][c] === 1) {
          continue;
        }
        queue.push([r, c]);
        visited[r][c] = true;
      }
    }
  }

  return -1;
}