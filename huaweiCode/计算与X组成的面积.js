function solveMethod(n, e, steps) {
  // 转变成字典表，便于查找
  const dictSteps = new Map(steps);
  // 每一步的位移，初始为0
  let offset = 0;
  // 总面积
  let area = 0;
  
  // 遍历起点到终点的长度e，如果该点在steps中能找到且做了位移，则进行改变
  for (let i = 0; i < e; i++) {
    if (dictSteps.has(i)) {
      // 更新位移
      offset += dictSteps.get(i);
    }
    // 面积即位移大小，向终点走的每一步都要累加计算
    area += Math.abs(offset);
  }
  
  return area;
}

// 示例用法
console.log(solveMethod(4, 10, [[1, 1], [2, 1], [3, 1], [4, -2]])); // 输出 12
console.log(solveMethod(2, 4, [[0, 1], [2, -2]])); // 输出 4
