// 去除字符串中出现次数最少的字符， 不改变字符的相对位置
function removeLeastCharOfString(str){
  var obj = {};
  for(var i = 0; i < str.length; i++){
      if(!obj[str[i]]){
          obj[str[i]] = 1;
      }else{
          obj[str[i]]++;
      }
  }
  var min = 0;
  for(var key in obj){
      if(min === 0){
          min = obj[key];
      }else{
          min = Math.min(min, obj[key]);
      }
  }
  var result = '';
  for(var i = 0; i < str.length; i++){
      if(obj[str[i]] !== min){
          result += str[i];
      }
  }
  return result;
}
// 测试
console.log(removeLeastCharOfString('ababacf'));