let promiseAll = new Set();

const s1 = () =>{
  return new Promise((resolve, reject) =>{
    setTimeout(() =>{
      resolve('111');
    },1000)
  })
}

const s2 = () =>{
  return new Promise((resolve, reject) =>{
    setTimeout(() =>{
      resolve('222');
    },2000)
  })
}
const s3 = () =>{
  return new Promise((resolve, reject) =>{
    setTimeout(() =>{
      resolve('333');
    },3000)
  })
}

promiseAll.add(s3());
promiseAll.add(s2());
promiseAll.add(s1());

// promise.all中传入的是 iterable对象，包括（SET  MAP ARRAY）。
// iterable对象应该是 可执行promise对象
Promise.all(promiseAll).then(res =>{
  console.log(res);
}).catch(err =>{
  console.log(err);
})
