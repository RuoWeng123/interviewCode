// A 向B 发送了连续的包编号0-N+1，B 接收到N个数据包； 请找出丢失的包编号

function getLostPackage(arr) {
  let res = [];
  let max = Math.max(...arr);
  for (let i = 0; i <= max; i++) {
    if (!arr.includes(i)) {
      res.push(i);
    }
  }
  return res;
}
