// 输入一个整数，返回他的所有质数因子
// 例如：输入90，返回[2,3,3,5]
const getPrimeOfNum = (num) =>{
  let res = [];
  for(let i = 2; i< num; i++){
    if(i > Math.sqrt(num) +1){
      i = num;
    }
    while(num % i === 0){
      res.push(i);
      num = num / i;
    }
  }
  return res;
}