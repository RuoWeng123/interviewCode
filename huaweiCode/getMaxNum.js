// 输入： 整数 数组
// 输出： 最大的整数， 因为会超过最大数，所以返回字符串

function getMaxNum(nums){
    nums.sort((a,b) => {
        let str1 = a.toString() + b.toString();
        let str2 = b.toString() + a.toString();
        return str2 - str1;
    })
    return nums.join('');
}

console.log(getMaxNum([0,10,9,23]));

