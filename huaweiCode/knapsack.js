// 问题描述：两个参数： 参数一是二维数组，每个元素是一个数组，数组的第一个元素是物品的重量，第二个元素是物品的价值，第三个元素是依赖的物品编号（0表示不依赖，1表示依赖第1个元素），参数二是背包的容量，求背包能装下的最大价值
function knapsack(items, capacity) {
  
  const n = items.length;
  const dp = new Array(n + 1).fill(0).map(() => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const [weight, value, dependency] = items[i - 1];
    for (let j = 1; j <= capacity; j++) {
      if (dependency === 0) {
        if (weight <= j) {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight] + value);
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      } else {
        const [depWeight, depValue] = items[dependency - 1];
        if (depWeight + weight <= j) {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight - depWeight] + value + depValue);
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
  }
  console.log(dp);

  return dp[n][capacity];
}
let arr = [
  [800, 2, 0],
  [400, 5, 1],
  [300, 5, 1],
  [400, 3, 0],
  [500, 2, 0],
];
console.log(knapsack(arr, 5));