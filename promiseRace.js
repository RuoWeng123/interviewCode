let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2)
  }, 3000)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3)
  }, 2000)
})
let p4 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    reject(4)
  }, 4000)
})
Promise.race([p3, p1, p2]).then(res => {
  console.log(res,'race')
}, err => {
  console.log(err);
})

Promise.all([p3, p1, p2]).then(res => {
  console.log(res, 'all')
}, err => {
  console.log(err);
})
Promise.allSettled([p3, p1, p2, p4]).then(res => {
  console.log(res, 'allsettled')
}, err => {
  console.log(err);
})
