// N个人围城一圈，喊数 包含7和7的倍数的人喊“过”， 最大可以喊到K， 输出每个人 喊过的次数
const is7Num = (num) =>{
  if(num % 7 === 0){
    return true;
  }
  let str = num.toString();
  if(str.includes('7')){
    return true;
  }
  return false;
}
const cal7Nums = (N, K) =>{
  let numMap = {};
  let curNum = 1;
  for(let i = 1; i<= N; i++){
    if(numMap[i.toString()] === undefined){
      numMap[i.toString()] = 0;
    }
    if(is7Num(curNum)){
      numMap[i.toString()]++;
    }
    if(curNum === K){
      return numMap;
    }
    curNum++;
    if(i === N){
      i = 1;
    }
  }
}

const resNums = (N, K) =>{
  return Object.values(cal7Nums(N, K)).join(' ');
}

console.log(resNums(11, 100))