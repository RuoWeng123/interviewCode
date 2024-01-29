// 代码2
console.log(1);

// 立刻执行 micorTask.push('XXX')
new Promise((resolve)=>{
  resolve();
}).then(()=>{
  console.log("XXX")
})

async function fn(){
  console.log(2)
  await console.log(3)
  // micorTask.push(下面的代码)
  console.log(4)
  new Promise((resolve)=>{
      resolve();
  }).then(()=>{
      console.log("YYY")
  })
}

setTimeout(() =>{
  console.log('timeout')
},0)
fn();

new Promise((resolve)=>{
  console.log(6)
  resolve();
}).then(()=>{
  // microTask.push(7)
  console.log(7)
})

console.log(8)
// 1 2 3 6 7 然后第一轮微任务 xxx  4 7  ；第二轮微任务 yyy  ； 宏任务 setTimeout

// 所以，微任务循环一轮后，如果当前轮执行中又添加了微任务，则立刻处理微任务队列； 直到微任务队列为空，才处理宏任务对嘞