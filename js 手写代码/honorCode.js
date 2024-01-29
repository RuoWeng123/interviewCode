function getMaxChangeStepNum(arr) {
  let maxRightDownStepNum = 0;
  let maxDownRightStepNum = 0;
  let maxNum = 0;
  // 检查从左下角到 右上角 是否对角线上都是-1；
  function backtrackDownRight(row, col, count) {
    // 到达右下角，更新最大修改次数
    if (row === arr.length - 1 && col === arr[0].length - 1) {
      maxRightDownStepNum = Math.max(maxRightDownStepNum, count);
      backtrackLeftUp(row, col, maxRightDownStepNum);
      backtrackUpLeft(row, col, maxRightDownStepNum)
      return 0;
    }
    // 向下走
    if (row < arr.length - 1 && (arr[row + 1][col] === 0 || arr[row + 1][col] === 1)) {
     let temp = arr[row][col];
     arr[row][col] = 0;
     backtrackDownRight(row + 1, col, count + (temp === 1 ? 1 : 0));
    }

    // 向右走
    if (col < arr[0].length - 1 && (arr[row][col + 1] === 0 || arr[row][col + 1] === 1)) {
      let temp = arr[row][col];
      arr[row][col] = 0;
      // 只有当前值为1时，才需要修改次数+1
      backtrackDownRight(row, col + 1, count + (temp === 1 ? 1 : 0));
    }
  }
  function backtrackRightDown(row, col, count) {
    // 到达右下角，更新最大修改次数
    if (row === arr.length - 1 && col === arr[0].length - 1) {
      maxDownRightStepNum = Math.max(maxDownRightStepNum, count);
      backtrackLeftUp(row, col, maxDownRightStepNum)
      backtrackUpLeft(row, col, maxDownRightStepNum);
      return;
    }
    // 向右走
    if (col < arr[0].length - 1 && (arr[row][col + 1] === 0 || arr[row][col + 1] === 1)) {
      let temp = arr[row][col];
      arr[row][col] = 0;
      // 只有当前值为1时，才需要修改次数+1
      backtrackRightDown(row, col + 1, count + (temp === 1 ? 1 : 0));
    }

    // 向下走
    if (row < arr.length - 1 && (arr[row + 1][col] === 0 || arr[row + 1][col] === 1)) {
     let temp = arr[row][col];
     arr[row][col] = 0;
     backtrackRightDown(row + 1, col, count + (temp === 1 ? 1 : 0));
    }
  }
  function backtrackLeftUp(row, col, count) {
    // 到达右下角，更新最大修改次数
    if (row === 0 && col === 0) {
      maxNum = Math.max(maxNum, count);
      return;
    }
    // 向上走
    if (row > 0 && (arr[row - 1][col] === 0 || arr[row - 1][col] === 1)) {
      let temp = arr[row][col];
      arr[row][col] = 0;
      backtrackLeftUp(row - 1, col, count + (temp === 1 ? 1 : 0));
    }

    // 向左走
    if (col > 0 && (arr[row][col - 1] === 0 || arr[row][col - 1] === 1)) {
      let temp = arr[row][col];
      arr[row][col] = 0;
      backtrackLeftUp(row, col - 1, count + (temp === 1 ? 1 : 0));
    }
  }

  function backtrackUpLeft(row, col, count) {
    // 到达右下角，更新最大修改次数
    if (row === 0 && col === 0) {
      maxNum = Math.max(maxNum, count);
      return;
    }
    // 向左走
    if (col > 0 && (arr[row][col - 1] === 0 || arr[row][col - 1] === 1)) {
      let temp = arr[row][col];
      arr[row][col] = 0;
      backtrackUpLeft(row, col - 1, count + (temp === 1 ? 1 : 0));
    }
    // 向上走
    if (row > 0 && (arr[row - 1][col] === 0 || arr[row - 1][col] === 1)) {
      let temp = arr[row][col];
      arr[row][col] = 0;
      backtrackUpLeft(row - 1, col, count + (temp === 1 ? 1 : 0));
    }
  }

  // 从左上角开始回溯
  backtrackDownRight(0, 0, 0);
  backtrackRightDown(0, 0, 0);

  return maxNum;
}

console.log(getMaxChangeStepNum([[0,1,-1],[1,0,-1],[1,1,1]]));  // 返回是3， 但是最多应该是 5