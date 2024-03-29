function mergeSort(arr){
    if(arr.length<=1){
        return arr;
    }
    let mid=Math.floor(arr.length/2);
    let left=arr.slice(0,mid);
    let right=arr.slice(mid);
    return merge(mergeSort(left),mergeSort(right));
}
function merge(left,right){
    let result=[];
    while(left.length>0&&right.length>0){
        if(left[0]<right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    return result.concat(left,right);
}

// 如果数据格式为{val: number}[],update the code
function merge2(left,right){
    let result=[];
    while(left.length>0&&right.length>0){
        if(left[0].val<right[0].val){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    return result.concat(left,right);
}

// time complexity O(nlogn) space complexity O(n)