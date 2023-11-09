
function solveNQueens(n) {
  const board = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
  const queens = [];
  const res = [];

  function isValid(row, col) {
    for (let i = 0; i < row; i++) {
      if (queens[i] === col || queens[i] - i === col - row || queens[i] + i === col + row) {
        return false;
      }
    }
    return true;
  }

  function backtrack(row) {
    if (row === n) {
      res.push(queens.slice());
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        queens.push(col);
        board[row][col] = 1;
        backtrack(row + 1);
        queens.pop();
        board[row][col] = 0;
      }
    }
  }

  backtrack(0);

  return res;
}


console.log(solveNQueens(4));
