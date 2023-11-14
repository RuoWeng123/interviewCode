function getSum(arr, n) {
  arr = Array.from(new Set(arr)).sort((a, b) => a - b);
  if(n >=Math.ceil(arr.length / 2)){
    throw new Error('n is too large')
  }
  let minList = arr.slice(0, n);
  let maxList = arr.slice(arr.length - n);
  console.log(minList);
  console.log(maxList);
  return [...minList, ...maxList].reduce((pre, cur) => pre + cur, 0);
}

console.log(getSum([95,88,83,64,100], 2));
