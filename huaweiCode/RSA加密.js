function solveMethod(num) {
  // 找出所有小于num的素数
  let tmp = num;
  let f = 2;
  let factors = new Set();
  
  while (tmp !== 1) {
    if (tmp % f !== 0) {
      f++;
    } else {
      factors.add(f);
      tmp /= f;
    }
  }
  
  // 找出两个素数，满足因数分解
  for (let f1 of factors) {
    for (let f2 of factors) {
      if (f1 * f2 === num) {
        return [Math.min(f1, f2), Math.max(f1, f2)];
      }
    }
  }
  
  return [-1, -1];
}

// 示例用法
const result = solveMethod(15);
console.log(result);
