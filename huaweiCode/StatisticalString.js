// 统计字符串的出现次数，并排序返回， 小写在前面

function StatisticalString(str) {
  let map = {};
  for(let i = 0; i< str.length; i++){
    if(map[str[i]] === undefined){
      map[str[i]] = 0;
    }
    map[str[i]]++;
  }
  let entriesValue = Object.entries(map);
  let newValues = entriesValue.sort((a, b) => {
    if(b[1] === a[1]){ 
      if(a[0].toLowerCase() === b[0].toLowerCase()){
        return b[0].charCodeAt() - a[0].charCodeAt();
      }
      return a[0].charCodeAt() - b[0].charCodeAt();
    }  
    return b[1] - a[1];
  })
  console.log(newValues);
  
  return newValues.reduce((res, item) =>{
    return res = res + `${item[0]}:${item[1]};`;
  },'');
}

console.log(StatisticalString('xyxyXXX'));