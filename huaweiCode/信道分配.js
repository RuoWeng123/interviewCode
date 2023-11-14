/*问题：
标题：信道分配
算法工程师经常面临这样一个问题，需要将有限的信道资源分配给尽可能多的用户。
信道的条件及分配规则如下：
所有信道都有阶数：r，能够承载的信道的容量为2^r；
所有用户需要传输的数据量都一样：D比特；
一个用户可以分配多个信道，但每个信道只能分配给一个用户；
只有当分配给一个用户的所有信道的容量之和大于等于D，用户才能传输数据。
输入：
第一行，一个数字r，意为最大阶数。
第二行，R+1个数字，用空格隔开。
代表各信道的容量。按照阶的值从小到大排列。
第三行，一个数字D。
D为单个用户需要传输的数据量。 0<D<1000000
输出：
一个数字，代表最多可以供多少用户传输数据。
示例：
输入：
5
10 50 132 250
30
输出：
2*/

let r = 5;
let N = [10, 5, 0, 1, 3, 2];
let d = 30;

// 算法入口
function result() {
  let D = d.toString(2).split('').reverse().map(Number);

  let count = 0;

  if (N.length > D.length) {
    for (let i = D.length; i < N.length; i++) {
      count += N[i];
    }
  }

  while (true) {
    let D2 = [...D];

    for (let i = D.length - 1; i > 0; i--) {
      if (N[i] > 0) {
        let diff = N[i] - D2[i];

        if (diff >= 0) {
          N[i] = diff;
          D2[i] = 0;
        } else {
          D2[i] = 0;
          D2[i - 1] += Math.abs(diff) * 2;
          N[i] = 0;
        }
      } else {
        D2[i - 1] += D2[i] * 2;
        D2[i] = 0;
      }
    }

    let flag = false;

    if (N[0] >= D2[0]) {
      N[0] -= D2[0];
      count += 1;
    } else {
      N[0] -= D2[0];
      D2[0] = 0;

      for (let i = 0; i < D.length; i++) {
        if (N[i] < 0) {
          if (i !== D.length - 1) {
            N[i + 1] += Math.floor(N[i] / 2);
            N[i] = 0;
          } else {
            flag = true;
          }
        } else {
          count += 1;
          break;
        }
      }
    }

    if (flag) {
      break;
    }
  }

  return count;
}

// 算法调用
console.log(result());
