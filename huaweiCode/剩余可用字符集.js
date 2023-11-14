function solveMethod(line) {
  const [totalStr, usedStr] = line.split("@");
  
  function toCounter(chars) {
    const charsArray = chars.split(",");
    const charsMap = {};
    for (const char of charsArray) {
      const [key, value] = char.split(":");
      charsMap[key] = parseInt(value);
    }
    return charsMap;
  }
  
  const totalMap = toCounter(totalStr);
  if (usedStr) {
    const usedMap = toCounter(usedStr);
    for (const key in usedMap) {
      if (usedMap.hasOwnProperty(key)) {
        const diff = totalMap[key] - usedMap[key];
        if (diff > 0) {
          totalMap[key] = diff;
        } else {
          delete totalMap[key];
        }
      }
    }
  }
  
  const resultArray = Object.entries(totalMap).map(([key, value]) => `${key}:${value}`);
  return resultArray.join(",");
}

// 示例用法
console.log(solveMethod("a:3,b:5,c:2@a:1,b:2")); // 输出 "a:2,b:3,c:2"
console.log(solveMethod("a:3,b:5,c:2@")); // 输出 "a:3,b:5,c:2"
