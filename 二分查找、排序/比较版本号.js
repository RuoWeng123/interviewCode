// version1 < version2 返回 -1；version1 > version2 返回 1；其余情况返回 0。

// 时间复杂度：O(n)
function compareVersion(version1, version2) {
  const v1 = version1.split('.');
  const v2 = version2.split('.');
  const len = Math.max(v1.length, v2.length);
  for (let i = 0; i < len; i++) {
    const num1 = Number(v1[i]) || 0;
    const num2 = Number(v2[i]) || 0;
    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}
