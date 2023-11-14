// 给出N对括号，输出所有合法的括号组合
function brackets(n) {
  const res = [];
  const backTrack =(path, left, right) =>{
    console.log('path', path);
    console.log('res', res);
    if(left === 0 && right === 0){
      res.push(path);
      return;
    }
    if(left > right){
      return;
    }
    if(left > 0){
      backTrack(path + '(', left - 1, right);
    }
    if(right > 0){
      backTrack(path + ')', left, right - 1);
    }
  }

  backTrack('', n, n);
  return res;
}

console.log(brackets(3));