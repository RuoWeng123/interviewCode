/*
需求： chrome 有最大并发请求限制，超过限制的请求会被阻塞，直到前面的请求完成。现在有一个 sendRequest 的函数，要求最大并发数 maxNum。
请实现一个函数，当调用这个函数，且当前请求超过了最大并发数时，会等待前面的请求完成后，再发送新的请求。
*/

function sendRequest(urls, maxNum) {
  const len = urls.length;
  const result = new Array(len).fill(false);
  let count = 0;
  return new Promise((resolve, reject) => {
    while (count < maxNum) {
      next();
    }
    function next() {
      let current = count++;
      if (current >= len) {
        !result.includes(false) && resolve(result);
        return;
      }
      const url = urls[current];
      console.log(`开始 ${current}`, new Date().toLocaleString());
      new Promise(resolve => resolve(url))
        .then((res) => {
          console.error(`完成 ${current}`, new Date().toLocaleString());
          result[current] = res;
          if (current < len) {
            next();
          }
        })
        .catch((err) => {
          console.log(`结束 ${current}`, new Date().toLocaleString());
          result[current] = err;
          if (current < len) {
            next();
          }
        });
    }
  });
}
const requests = new Array(50).fill('url').map((item, index) => item + index);

sendRequest(requests, 5).then((res) => {
  console.log('finish', res);
});
