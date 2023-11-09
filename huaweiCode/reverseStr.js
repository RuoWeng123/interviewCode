
function reverseWords(str, start, end) {
  // 将字符串转换为字符数组
  const arr = str.split(' ');
  if(start > arr.length - 1) throw new Error('start must be less than arr.length');
  if(end < 0) throw new Error('end must be greater than 0');
  if(end < start) throw new Error('end must be greater than start')
  if(start < 0) {
    start = 0;
  }
  if(end > arr.length - 1) {
    end = arr.length - 1;
  }

  // 存储单词的数组
  const words = [];

  // 遍历字符数组
  for (let i = 0; i < arr.length; i++) {
    if(i >= start && i <= end){
      words.push(arr[i]);
    }
  }

  // 反转单词数组
  words.reverse();
  console.log('words', words);


  arr.splice(start, end - start +1, words.join(' '));

  // 将字符数组转换回字符串并返回
  return arr.join(' ');
}

console.log(reverseWords('I am a student.', 1, 2));