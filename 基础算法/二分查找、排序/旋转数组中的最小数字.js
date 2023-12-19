// 一个排序后的数组，将前N个数据移动到数组末尾，求最小值

// 写法1： 排序后取第一个， 时间复杂度 O(nlogn)
function getMinNum(arr){
  return arr.sort()[0];
}
// 写法2： 遍历一遍，时间复杂度 O(n)
function getMinNum2(arr){
  let min = arr[0];
  for(let i = 1; i < arr.length; i++){
    if(arr[i] < min){
      min = arr[i];
    }
  }
  return min;
}
// 写法3： 二分查找，时间复杂度 O(logn)
function getMinByBinary(arr){
  let low = 0;
  let high = arr.length - 1;
  let mid;
  while(low < high){
    mid = Math.floor((low + high) / 2);
    if(arr[mid] > arr[high]){
      low = mid + 1;
    }else if(arr[mid] < arr[high]){
      high = mid;
    }else{
      high--;
    }
  }
  return arr[low];
}

console.log(getMinByBinary([3,4,5,1,2]));
