
function getLastWordLength(str) {
  // 去除字符串末尾的空格
  str = str.trim();
  // 找到最后一个单词的起始位置
  let lastWordStart = str.lastIndexOf(' ') + 1;
  str.toLowerCase();
  // 返回最后一个单词的长度
  return str.length - lastWordStart;
}
