// 相对开音节的构成为：辅音+元音(aeiou)+辅音(r除外)+e
// 给一个字符串，以空格为分隔符，反转每个单词中的字母，若单词中有非字母时不反转
// 反转后计算其中包含相对开音节结构的单词的个数
// zh sh ch 也算辅音
function reverseWord(str) {
  let arr = str.split('');
  return arr.reverse().join('');
}

function isVowel(char) {
  return 'aeiou'.indexOf(char) !== -1;
}

// 检查是否是辅音
function isConsonant(char) {
  return !isVowel(char);
}

// zh sh ch 
function replaceChar(word) {
  return word.replace(/zh/g, 'z').replace(/sh/g, 's').replace(/ch/g, 'c');
}

function isValidWord(word) {
  return word.match(/^[a-zA-Z]+$/);
}

function isRelativeOpenSyllable(word) {
  let len = word.length;
  if(isConsonant(word[0]) && isVowel(word[1]) && isConsonant(word[2]) && word[2] !== 'r' && word[len-1] ==='e') return true;
  return false;
}

function countRelativeOpenSyllable(str) {
  let count = 0;
  let words = str.split(' ').filter(v => isValidWord(v)).map(item => reverseWord(item)).map(item => replaceChar(item)).filter( v=> v.length === 4);
  for (let word of words) {
    if (isRelativeOpenSyllable(word)) {
      count++;
    }
  }
  return count;
}

console.log(countRelativeOpenSyllable('ekam a ehsahc'));