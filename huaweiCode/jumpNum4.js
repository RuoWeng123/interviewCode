// 这是一个数字跳过含有数字4的函数，例如23 跳过含有 数字4的数 返回25；39 跳过含有数字4的数 变成50；399 跳过含有数字4的数 变成500
// 输入： 结果数
// 输出： 真实数 = 结果数 - 跳过的数字个数

function getNum(num){
  let jumpNum = 0;
  for(let i = 0; i< num; i++){
    if(i.toString().includes('4')){
      jumpNum++;
    }
  }
  return num - jumpNum;
}

console.log(getNum(500));
