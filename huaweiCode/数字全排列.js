function  fullPermutation(arr){
    let result=[];
    let temp=[];
    function dfs(){
        if(temp.length===arr.length){
            result.push(temp.slice());
            return;
        }
        for(let i=0;i<arr.length;i++){
            if(temp.indexOf(arr[i])===-1){
                temp.push(arr[i]);
                dfs();
                temp.pop();
            }
        }
    }
    dfs();
    return result;
}
// 这是回溯法的经典应用，回溯法的核心是递归，递归的过程中需要维护一个路径，当满足条件时，将路径保存下来，这里的路径就是temp，当temp的长度等于arr的长度时，说明已经找到了一条路径，将其保存到result中，然后返回上一层，继续寻找其他路径，这里的回溯体现在temp.pop()，当找到一条路径后，需要返回上一层，继续寻找其他路径，所以需要将temp中的最后一个元素删除，这样就能返回上一层了。

console.log(fullPermutation([1,2,3,4]))
