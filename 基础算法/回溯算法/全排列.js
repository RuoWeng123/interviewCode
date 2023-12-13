function FullPermutation(arr){
  let result = [];
  let used = Array(arr.length).fill(false);
  function dfs(path){
    if(path.length === arr.length){
      result.push(path.slice());
      return;
    }
    for(let i = 0; i < arr.length; i++){
      if(!used[i]){
        path.push(arr[i]);
        used[i] = true;
        dfs(path);
        path.pop();
        used[i] = false;
      }
    }
  }
  dfs([]);
  return result;
}

// console.log(FullPermutation([1,2,3]))

module.exports = {
  FullPermutation
}