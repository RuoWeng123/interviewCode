// 字符串首位相连组成一个圆环，找出圆环中‘o’出现了偶数次，的最长字符串的长度
const calOMaxStr = (str) => {
  if(str.length === 0 || !str.includes('o')){
    return 0;
  }
  let maxLen = 0;
  let rk = 0;
  let len = str.length;
  for(let i = 0; i< len; i++){
    let oNum = 0;

    while(rk < len){
      if(str[rk] === 'o'){
        oNum++;
      }
      if(oNum % 2 === 0){
        maxLen = Math.max(maxLen, rk - i + 1);
      }
      rk++;
    }
  }    
  return maxLen;
}

console.log(calOMaxStr('oxdolxl'))