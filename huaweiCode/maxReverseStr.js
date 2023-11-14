// 一个字符串中 最大非连续回文字符串的长度
// 例如输入  abcda  输出 3    最长  aba 或者 aca 或者 ada
// 例如输入  abcdca  输出 5   最长字符串为  acdca

function maxDiscontinuousReverseStr(str) {
  let len = str.length;
  let dp = new Array(len).fill(0);
  dp[0] = 1;
  for (let i = 1; i < len; i++) {
    let max = 0;
    for (let j = 0; j < i; j++) {
      if (str[i] === str[j]) {
        max = Math.max(max, dp[j]);
      }
    }
    dp[i] = max + 1;
  }
  return Math.max(...dp);
}
console.log(maxDiscontinuousReverseStr('abcda'));