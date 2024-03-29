function quickSort(arr){
    if(arr.length<=1){
        return arr;
    }
    let pivotIndex=Math.floor(arr.length/2);
    let pivot=arr.splice(pivotIndex,1)[0];
    let left=[];
    let right=[];
    for(let i=0;i<arr.length;i++){
        if(arr[i]<pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot],quickSort(right));
}
// 如果arr的数据格式四{val: number}[],update the code
function quickSort(arr){
    if(arr.length<=1){
        return arr;
    }
    let pivotIndex=Math.floor(arr.length/2);
    let pivot=arr.splice(pivotIndex,1)[0].val;
    let left=[];
    let right=[];
    for(let i=0;i<arr.length;i++){
        if(arr[i].val<pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([{val:pivot}],quickSort(right));
}

// quecksort time complexity O(nlogn) space complexity O(nlogn)