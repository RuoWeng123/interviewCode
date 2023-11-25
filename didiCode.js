// 获取字符串数组中，最长的公共前缀
function LongestCommonPrefix(strs){
  if(strs.length === 0) return "";
  strs.sort((a, b) => a.length - b.length);
  let strMax = '';
  let strMinLen = strs[0].length;
  for(let i = 0; i< strMinLen; i++){
    let currentStr = strs[0].substring(0, i + 1);
    let flag = strs.every(str => str.startsWith(currentStr));
    if(flag){
      strMax = currentStr;
    }
  }
  return strMax;
}
// 两数之和，返回两数的下标
function twoSum(nums, target){
  let map = new Map();
  for(let i = 0; i < nums.length; i++){
    if(map.has(target - nums[i])){
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
}
