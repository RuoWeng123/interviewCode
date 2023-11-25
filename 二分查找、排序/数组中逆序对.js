function getArrPreGtNextNumCount(arr) {
  let count = 0;
  for(let i = 0; i< arr.length; i++){
    for(let j = i+1; j < arr.length; j++){
      if(arr[i] > arr[j]){
        count++;
      }
    }
  }
  return count;
}

// 采用归并排序统计
function countInversionsAndSort(arr) {
  if(arr.length < 2) {
    return { count: 0, array: arr };
  }
  
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  
  const { count: leftCount, array: sortedLeft } = countInversionsAndSort(left);
  const { count: rightCount, array: sortedRight } = countInversionsAndSort(right);
  
  const merged = [];
  let i = 0;
  let j = 0;
  let mergeCount = 0;
  
  while(i < sortedLeft.length && j < sortedRight.length) {
    if(sortedLeft[i] > sortedRight[j]) {
      mergeCount += sortedLeft.length - i;
      merged.push(sortedRight[j++]);
    } else {
      merged.push(sortedLeft[i++]);
    }
  }
  
  while(i < sortedLeft.length) {
    merged.push(sortedLeft[i++]);
  }
  
  while(j < sortedRight.length) {
    merged.push(sortedRight[j++]);
  }
  
  return { count: leftCount + rightCount + mergeCount, array: merged };
}
