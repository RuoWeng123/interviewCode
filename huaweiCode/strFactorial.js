/**
 * @param {string} str aab
 * @return {string[]} ['aab', 'aba', 'baa']
 */

function permutation(str) {
  let res = [];
  let arr = str.split('');
  let len = arr.length;
  let visited = new Array(len).fill(false);

  let path = [];
  let dfs = (path) => {
    if (path.length === len) {
      res.push(path.join(''));
      return;
    }
    
    for (let i = 0; i < len; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      path.push(arr[i]);
      dfs(path);
      path.pop();
      visited[i] = false;
    }
  }
  dfs(path);
  return Array.from(new Set(res));
}

console.log(permutation('aba'));