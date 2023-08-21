function fibonacci(n) {
  if(n < 2) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log('----');
// 如果n> 10000 是否会有问题？内存溢出
console.log(fibonacci(20));

// 优化
function fibonacci2(n) {
  if(n < 2) {
    return n;
  }
  let prev = 0;
  let curr = 1;
  for(let i = 0; i < n - 1; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
};

console.log(fibonacci2(2000));