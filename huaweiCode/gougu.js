// 勾股数元组，满足 a^2+b^2 = c^2 的三个整数称之为勾股数，若a,b,c 之间没有公约数则 a,b,c是勾股数元组
// 例如： （3，4，5） 是勾股数元组，（6，8，10）不是
// 先需要 给出起始范围N (1~10000) 到 结束范围M (N~10000) 之间的所有 勾股数元组

function isGougu(a, b, c) {
  if (a * a + b * b === c * c) {
    return true;
  }
  return false;
}

function isGongyue(a, b) {
  let min = Math.min(a, b);
  let max = Math.max(a, b);
  let res = [];
  for (let i = 1; i <= min; i++) {
    if (min % i === 0 && max % i === 0) {
      res.push(i);
    }
  }
  return res.length > 1 ? false : true;
}

function getGougu(N, M) {
  let res = [];
  for (let i = N; i <= M; i++) {
    for (let j = i; j <= M; j++) {
      for (let k = j; k <= M; k++) {
        if (isGougu(i, j, k) && isGongyue(i, j) && isGongyue(i, k) && isGongyue(j, k)) {
          res.push([i, j, k]);
        }
      }
    }
  }
  return res;
}

console.log(getGougu(1, 20));
