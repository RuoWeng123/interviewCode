// 输入数组 长度为  3，输出所有组合
// 例如： 输入【1,4,8】;
// 输出: [1,4,8,14,18,41,48,81,84,148,184,418,481,814,841]
function generateCombinations(nums) {
  let res = [];
  let path = [];

  function dfs(start) {
    if (path.length > 0) {
      res.push(parseInt(path.join('')));
    }

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  }

  dfs(0);
  return res;
}
function getArrange(arr) {
  let res = [];
  let len = arr.length;
  let visited = new Array(len).fill(false);
  let path = [];
  const dfs = (path) => {
    if (path.length === len) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < len; i++) {
      if (visited[i]) {
        continue;
      }
      visited[i] = true;
      path.push(arr[i]);
      dfs(path);
      path.pop();
      visited[i] = false;
    }
  }
  dfs(path);
  return res;
}
// 判断两个数组有交集,使用Es6的Set
function hasIntersection(arr1, arr2) {
  return new Set([...arr1, ...arr2]).size !== arr1.length + arr2.length;
}

function getCombinationList(list){
  if(hasIntersection(list, [2,5,6,9])){
    list = replaceNums(list);
    console.log('新数组',list);
  }
  let list1 = generateCombinations(list).sort((a,b) => a - b);
  let res = [];
  for (let i = 0; i < list1.length; i++) {
    let cur = list1[i];
    if(cur.toString().length === 1){
      res.push(cur);
    }else{
      let temp = getArrange(cur.toString().split(''));
      res = res.concat(temp.map(item => parseInt(item.join(''))))
    }
  }
  return res;
}
// console.log(getCombinationList([1, 4, 8])); // [1,4,8,14,18,41,48,81,84,148,184,418,481,814,841]

// 上面是一个 数组的 全组合，下面要添加一些难度
// 假设输入的数据中，2可以当做5，5可以当做2，6可以当做9，9可以当做6
function replaceNums(nums) {
  let res = Object.assign([], nums);

  for (let i = 0; i < nums.length; i++) {
    let cur = nums[i];
    if (cur === 2) {
      res.push(5);
    } else if (cur === 5) {
      res.push(2);
    } else if (cur === 6) {
      res.push(9);
    } else if (cur === 9) {
      res.push(6);
    }
  }
  return res;
}

console.log(getCombinationList([1, 2, 8])); // [1,4,8,14,18,41,48,81,84,148,184,418,481,814,841]
