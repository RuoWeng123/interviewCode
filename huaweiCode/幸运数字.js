// 这是一个 十进制到 M进制的函数
function decimalToBaseM(decimalNumber, M) {
  if (M < 2 || M > 36) {
    return "目标进制M必须在2到36之间";
  }
  
  if (decimalNumber === 0) {
    return "0";
  }
  
  let result = "";
  let num = Math.abs(decimalNumber);
  
  while (num > 0) {
    const remainder = num % M;
    result = (remainder < 10 ? remainder : String.fromCharCode(87 + remainder)).toString() + result;
    num = Math.floor(num / M);
  }
  
  return decimalNumber < 0 ? "-" + result : result;
}

// 示例用法
console.log(decimalToBaseM(10, 4));
