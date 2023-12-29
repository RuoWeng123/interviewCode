let arr = [];
let arr2 = [2,3];

console.log(0 == arr);  // arr 会被转换为数字 0
console.log(1 == arr2);  // arr2 转换为数字 2,3
console.log(arr2.toString());  // arr2 转换为字符串 "2,3"
let obj = {};
let obj2 = {a: 3};
console.log(0 == obj);
console.log(1 == obj2);

// null undefined  是特殊值，他们只等于自己
console.log('0==null',0 == null);  // false
console.log('0==undefined',0 == undefined);   // false
// false  会被转化为 数字进行比较
console.log('0==false',0 == false);  // true

console.log(0=='');
console.log(0=='0');
console.log(0=='1');