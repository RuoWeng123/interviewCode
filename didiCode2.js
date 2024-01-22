// function getArrSumOfNum(arr){
//   return arr.reduce((res, cur)=>{
//     if(typeof cur === 'number'){
//       return res + cur;
//     }else{
//       return res;
//     }
//   },0);
// }

// console.log(getArrSumOfNum([1,2,3,4,5,'1',',']));


// function sortArr(arr){
//   for(let i = 0; i< arr.length; i++){
//     for(let j = i+1; j < arr.length; j++){
//       if(arr[i].val > arr[j].val){
//         let temp = arr[i];
//         arr[i] = arr[j];
//         arr[j] = temp;
//       }
//     }
//   }
//   return arr;
// }

// console.log(sortArr([{val: 2},{val: 1},{val: 5},{val: 4},{val: 3}]));
// 该方法用于移除 字符串中 出现次数最少的字符，如果有多个字符出现次数一样，都移除
function formatStr(str){
  let map = new Map();
  let minNum = 0;
  for(let i = 0; i < str.length; i++){
    if(map.has(str[i])){
      map.set(str[i], map.get(str[i])+1);
    }else{
      map.set(str[i], 1);
    }
  }
  let arr = [...map].sort((a,b) => a[1] - b[1])
  let tempArr = arr.filter( v => v[1] === arr[0][1]).map(v => v[0]);
  return str.split('').filter(v => !tempArr.includes(v)).join('');
}

function formatStr2(str){
  const charCount = new Map();
  for (const char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  const minCount = Math.min(...charCount.values());
  return str.split('').filter(char => charCount.get(char) !== minCount).join('');
}
console.log(formatStr('ababac'));
console.log(formatStr2('aaabbbcceeff'))