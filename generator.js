function getCode(len) {
  len = len || 4;
  if (len > 6) {
    // 如果大于6位，我们采用生成多组的方法来处理，每组6位
    var time = len/6|0;
    var lastNum = len%6;
    var code = [];
    for(var i=0; i<time; i++){
      code.push(generate(6));
    }
    if (lastNum) {
      code.push(generate(lastNum));
    }
    return code.join('');
  }else{
    return generate(len);
  }
  function generate(len) {
    var start = Math.pow(36,len-1);
    var end = (Math.pow(36,len)-1);
    var number = start + Math.random()*(end-start) | 0;
    var code = number.toString(36);
    return code;
  }
}


console.log(getCode(10));
