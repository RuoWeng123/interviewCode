// 输入第一行 每次取值的长度
// 第二行 x需要合并的数组数量
// 第三行 到第N 行，需要合并的数组

const mergeArr = (str) =>{
  let arr = str.split('\n');
  let chuck = arr[0];
  let len = arr[1];
  let valuesList = arr.slice(2).map(item => item.split(','));
  let res = [];
  const getValueFormNextArr = (target, i) =>{
    let nextTargetKey = i + 1 > len - 1 ? 0 : i + 1;
    let nextTarget = valuesList[nextTargetKey];
    if(target.length === chuck || valuesList.every(item => item.length === 0)){
      return target;
    }
    if(nextTarget.length + target.length >= chuck){
      let need = chuck - target.length;
      target.push(nextTarget.splice(0, need));
      return target;
    }else{
      let newTarget = [...target, ...nextTarget.slice(0, nextTarget.length)];
      getValueFormNextArr(newTarget, nextTargetKey);
    }
  }
  for(let i = 0; i< len; i++){
    let target = valuesList[i];
    if(target.length >= chuck){
      res.push(target.splice(0, chuck));
    }else{
      // 如果当前数组长度小于chuck， 则需要从下一个数组中取值，如果下一个数组也不满足，继续从下一个数组获取
      // 如果下一位的下标大于数组长度，则从第一个数组开始获取
      let target = valuesList[i].splice(0, chuck);
      target = getValueFormNextArr(target, i);
      res.push(target);
    }
    if(valuesList.every(item => item.length === 0)){
      break;
    }
    if(i === len - 1){
      i = -1;
    }
  }
  return res.flat(Infinity).join(',');
}

let str = `3
2
1,2,3,4,5,6,7,8,9
2,5,6,7`;
console.log(mergeArr(str));