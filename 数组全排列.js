/**
 * @description: 全排列
 * @param {number[]} arr
 * @return {number[][]}
 */
var permute = function(arr) {
  let res = [];
  let len = arr.length;
  let path = [];
  let used = new Array(len).fill(false);
  const dfs = () =>{
    if(path.length === len){
      res.push(path.slice());
      return;
    }
    for(let i = 0; i < len; i++){
      if(used[i]) continue;
      used[i] = true;
      path.push(arr[i]);
      dfs();
      used[i] = false;
      path.pop();
    }
  }
  dfs();

  return res;
}

let permuteArr = permute([1,2,3,4]);
console.log(permuteArr);