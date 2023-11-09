// 这是一个输入 0XAB 的16进制的字符串，输出10进制

const formatNumOf16 = (str) => {
  str = str.substring(2, str.length).toLowerCase();
  let newMap = new Map();
  newMap.set('a', 10);
  newMap.set('b', 11);
  newMap.set('c', 12);
  newMap.set('d', 13);
  newMap.set('e', 14);
  newMap.set('f', 15);

  let res = 0;
  for(let i = 0; i< str.length; i++){
    if(newMap.has(str[i])){
      res = res * 16 + newMap.get(str[i]);
    }else{
      res = res * 16 + Number(str[i]);
    }
  }

  return res;
}

console.log(formatNumOf16('0X000011'));