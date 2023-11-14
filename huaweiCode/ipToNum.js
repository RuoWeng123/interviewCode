const ipToNum = (str) =>{
  let ipArr = str.split('.');
  if(ipArr.length !== 4) throw new Error('ip地址不合法');
  if(ipArr.some(item => item > 255 || item < 0)) throw new Error('ip地址不合法');

  let tempStr = ipArr.reduce((pre, cur) => {
    return pre + Number(cur).toString(2).padStart(8, '0');
  },'');
  return parseInt(tempStr, 2);
}

// let ip = '10.0.3.193';
// console.log(ipToNum(ip));

const numToIp = (num) => {
  if(num < 0 || num > 4294967295) throw new Error('数字不在有效范围内');
  let tempStr = num.toString(2).padStart(32, '0');
  let arr = [];
  for(let i = 0; i< 32; i+=8){
    let str = tempStr.slice(i, i+8);
    let temp = parseInt(str, 2);
    arr.push(temp);
  }
  return arr.join('.');
}

console.log('get ip:',numToIp(167773121));