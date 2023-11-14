/*
在学校中，N个小朋友站成一队，第i个小朋友的身高为height[i]，第i个小朋友可以看到第一个比自己身高更高的小朋友j，那么j是i的好朋友，其中j < i。

请重新生成一个列表，对应位置的输出是每个小朋友的好朋友的位置，如果没有看到好朋友，请在该位置用0代替，其中小朋友人数范围是0~40000。
*/
function solveMethod(n, heights) {
  const result = [];
  
  for (let i = 0; i < n; i++) {
    let pos = 0;
    for (let j = i + 1; j < n; j++) {
      if (heights[j] > heights[i]) {
        // 将找到的第一个更高的身高小朋友，则将该位置存入数组中
        pos = j;
        break;
      }
    }
    
    result.push(pos);
  }
  
  return result;
}

// 示例用法
const heights = [1, 3, 2, 4, 1, 5, 6];
const result = solveMethod(heights.length, heights);
console.log(result);
