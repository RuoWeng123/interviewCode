// leetcode 数组元素的唯一组合 78 https://leetcode-cn.com/problems/subsets-ii/
const subsets = function(nums) {
  return nums.reduce((result, item)=>{
    return result.map(subItem =>{
      let newCur = [item].concat(subItem);
      return [newCur, subItem];
    }).flat();
  } , [[]])
}

let arr = subsets([1,2,3,4]);
console.log(arr);

// 其实这个题，主要考回溯，递归