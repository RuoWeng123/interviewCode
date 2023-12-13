function fullCombinations(arr){
  // 获取数组的全组合
  let result = [];
  function dfs(start, curCombination){
    result.push(curCombination.slice());

    for(let i = start; i< arr.length; i++){
      curCombination.push(arr[i]);
      dfs(i+1, curCombination);
      curCombination.pop();
    }
  }
  dfs(0, []);

  return result;
}
// console.log(fullCombinations([1,2,3]));
// 此时我们可以看到输出的结果是[ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 1, 3 ], [ 2 ], [ 2, 3 ], [ 3 ] ]
// 而我们需要输出包含[2,1],[3,1],[3,2]的结果，所以我们需要对数组进行排序
const {FullPermutation} = require('./全排列');
const fullCombinations2 =(arr) =>{
  const permuteArr = FullPermutation(arr);
  const result = [];
  for(let i = 0; i< permuteArr.length; i++){
    const item = permuteArr[i];
    result.push(fullCombinations(item));
  }

  let newResult = result.flat(1);
  let res = [];
  for(let i = 0; i < newResult.length; i++){
    if(res.includes(newResult[i].toString())){
      continue;
    }else{
      res.push(newResult[i].toString());
    }
  }
  return res;
}

// console.log(fullCombinations2([1,2,3]));
// 先全排列，后组合时间复杂度太高，优化为先组合后全排列


function fullCombinations3(arr){
  let resultArr = fullCombinations(arr);
  let result = [];
  for(let i = 0; i< resultArr.length; i++){
    result = result.concat(FullPermutation(resultArr[i]));
  };

  return Array.from(new Set(result));
}

console.log(fullCombinations3([1,2,3]));

// 先组合后排列时间复杂度还是高，