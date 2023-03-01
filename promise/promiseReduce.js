// promise 顺序执行
function createPromise(time, id){
  return function(){
    return new Promise(resolve =>
      setTimeout(() => {
        console.log("promise", id);
        resolve();
      }, time)
    );
  }
}
async function runPromise(myPromises) {
  for (let value of myPromises) {
    await value();
  }
}

runPromise([
  createPromise(3000, 1),
  createPromise(2000, 2),
  createPromise(1000, 3)
]).then((res =>{
  console.log(res);
}))
