function coinChange(coins, target){
  let dp = new Array(target + 1).fill(Infinity);
  dp[0] = 0;
  for(let i = 1; i <= target; i++){
    for(let j = 0; j < coins.length; j++){
      if(i - coins[j] >= 0){
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  return dp[target] === Infinity ? -1 : dp[target];
}