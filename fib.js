function fib(n){
  if(n < 2){
    return n;
  }
  return fib(n-1) + fib(n-2);
}

// 优化逻辑，避免内存溢出
function fib(n) {
  if (n === 1 || n === 2) {
    return 1;
  }

  let prev = 1;
  let curr = 1;

  for (let i = 3; i <= n; i++) {
    let temp = curr;
    curr = prev + curr;
    prev = temp;
  }

  return curr;
}