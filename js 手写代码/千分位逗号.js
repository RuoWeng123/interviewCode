// 将数字没千分位用逗号隔开

let format = (num) =>{
  let newNum = num.toString();
  let decimal = newNum.indexOf('.') > -1 ? newNum.split('.')[1] : '';
  let realNum = newNum.indexOf('.') > -1 ? newNum.split('.')[0] : realNum;

  let resNum = '';
  let len = realNum.length;
  if(len <= 3){
    resNum = realNum;
  }else{
    for(let i = realNum.length - 1; i >= 0; i--){
      resNum = realNum[i] + resNum;
      if((len - i) % 3 === 0 && i !== 0){
        resNum = ',' + resNum;
      }
    }
  }
  return decimal ? resNum + '.' + decimal : resNum;
}


console.log(format(123456789.123456789)); // 123,456,789.123456789
console.log(format(1234567890.123456789)); 