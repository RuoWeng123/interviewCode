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

const promise = new Promise((resolve, reject) => {
  reject("error");
  resolve("success2");
});
promise
.then(res => {
    console.log("then1: ", res);
  }).then(res => {
    console.log("then2: ", res);
  }).catch(err => {
    console.log("catch: ", err);
  }).then(res => {
    console.log("then3: ", res);
  })



import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';

const App: React.FC = () => {
const [count, setCount] = useState(0);
useEffect(() => {
console.log(count, 'x');
setTimeout(() => {
console.log(count, 'y');
}, 1000);
return () => {
console.log(count, 'z');
};
});
return (
<div>
<button onClick={() => setCount(count + 1)}>count:{count}</button>
</div>
);
};

export default App;


function fib(n){
  if(n === 1 || n === 2){
    return 1;
  }
  return fib(n-1) + fib(n-2);
}