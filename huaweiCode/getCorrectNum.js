/**
 * 设定一组四码的数字为谜底，另外一方猜，每次猜完后，给出XAYB，X表示数字和位置都正确的个数，Y表示数字正确但位置不对的个数
 *  第一行表示有N组测试数据，每组测试数据有列，第一列表示猜测的数，第二列表示提示结构
 *  可以猜测出数字输出数组，否则输出NA
 */
/**
 * 
 * @param {[number, string][]} list 
 * @return {number | NA}
 */
// 判断两个数组是否有交集
function hasIntersection(arr1, arr2){
  return arr1.some(item => arr2.includes(item));
}
// 检查密码数字 和 猜测数字的匹配情况
function checkSecret(secret, guess){
  let secretArr = secret.toString().split('');
  let guessArr = guess.toString().split('');
  let A = 0;
  let B = 0;

  guessArr.forEach((item, idx) => {
    if(item === secretArr[idx]){
      A++;
      guessArr[idx] = null;
      secretArr[idx] = null;
    }
  });

  guessArr.forEach((item, idx) => {
    if(secretArr.includes(item) && item !== secretArr[idx]){
      B++;
    }
  });

  return `${A}A${B}B`;
}

function canDeduceSecret(testData) {
  let possibleSecrets = Array.from({ length: 10000 }, (_, idx) => idx.toString().padStart(4, '0'));
  // 剪枝处理，先判断OAOB的情况
  const data0A0B = testData.filter(([_, feedback]) => feedback === "0A0B");
  let neverVal = '0';
  if(data0A0B.length > 0){
    // 0A0B情况下， 秘密数字不包含这四个数字
    const notIncludeNums = data0A0B.map(([guess, _]) => guess.toString().split('')).flat();
    neverVal = notIncludeNums[0];
    possibleSecrets = possibleSecrets.filter(secret => !hasIntersection(notIncludeNums, secret.split('')));
  }
  // 剪枝处理， 判断0A 的情况， 表示对应的位置上和当前秘密数字不相等
  const data0A = testData.filter(([_, feedback]) => feedback !== "0A0B").filter(([_, feedback]) => feedback.includes('0A'));
  if(data0A.length > 0){
    // 0A情况下， 秘密数字对应位置上的数字不是这些数字
    data0A.forEach(([guess, feedback]) => {
      let guessArr = guess.toString().split('');
      possibleSecrets = possibleSecrets.filter(secret => {
        let secretArr = secret.split('');
        // 4个位置比较，密码数组对应的位置上，不能是 guessArr对应位置上的数字
        return guessArr.every((item, idx) => item !== secretArr[idx]);
      });
    });
  }
  // 剪枝处理，对OAXB的情况处理
  possibleSecrets = possibleSecrets.filter(secret => {
    return data0A.every(([guess, feedback]) => {
      return checkSecret(secret, guess) === feedback;
    });
  });
  // 对于剩下的秘密数字，判断是否有可能是秘密数字
  possibleSecrets = possibleSecrets.filter(secret => {
    return testData.filter(([guess, feedback]) => feedback !== '0A0B' && !feedback.startsWith('0A')).every(([guess, feedback]) => {
      return checkSecret(secret, guess) === feedback;
    });
  });
  if(possibleSecrets.length === 1){
    return possibleSecrets[0];
  }else{
    return 'NA'
  }
}

const testData = [
  [4815, "1A1B"],
  [5716, "0A1B"],
  [7842, "0A1B"],
  [4901, "0A0B"],
  [8555, "2A1B"],
  [8585, "3A0B"]
];

// const secret = "1238"; // 设置秘密数字

const result = canDeduceSecret(testData);
console.log(result);
