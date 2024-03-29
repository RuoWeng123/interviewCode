function jumpFloor(n){
  return 1<<(--n);
}
console.log(jumpFloor(1));
console.log(jumpFloor(2));
console.log(jumpFloor(3));
console.log(jumpFloor(4));
// 题目
// 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

// f(n) = f(n-1) + f(n-2)

// #基本思路
// 每个台阶都可以选择跳或者不跳，最后一个台阶必跳。

// 每个台阶有两种选择，n个台阶有2的n次方种选择。

// 所以一共有2的n-1次跳法。

// 使用位运算

