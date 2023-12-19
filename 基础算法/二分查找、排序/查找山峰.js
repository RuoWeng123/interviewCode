function getMountainTopIndex(arr){
  if(arr.length === 0) return -1;
  if(arr.length === 1) return 0;
  if(arr.length === 2) return arr[0] > arr[1] ? 0 : 1;
  
  // 二分查找
  let low = 0;
  let high = arr.length - 1;
  let mid;
  while(low <= high){
    mid = Math.floor((low + high) / 2);
    if(arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]){
      return mid;
    }else if(arr[mid] < arr[mid + 1]){
      low = mid + 1;
    }else{
      high = mid - 1;
    }
  }
}

console.log(getMountainTopIndex([1,2,3,1]));
