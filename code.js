// 华为面试，100个字节，有一些字节被占用，给出一个数组，表示被占用的字节，求剩余的字节
function getRemainBytes(materix){
  let bytes = new Array(100).fill(0);
  for(let i = 0; i< materix.length; i++){
    let start = materix[i][0];
    let length = materix
    for(let j = start; j< start+length; j++){
      bytes[j] = 1;
    }
  }

  let remainArr = [];
  let i = 0;
  while( i<100){
    if(bytes[i] === 0){
      let start = i;
      while(bytes[i] === 0){
        i++;
      }
      let length = i - start;
      remainArr.push([start, length]);
    }
  }

}