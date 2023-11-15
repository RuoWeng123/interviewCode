// 函数，输入四个参数（x, y, cntx, cnty）
// x 表示一个国家代号，cntx表示一个国家需要的人员数量
// y 表示一个国家代号，cnty表示一个国家需要的人员数量
// 需要从1-N中找出满足如下规则的人员分配方案：
// 规则1： 编号为x的倍数的人员不能去x国家，编号为y的倍数的人员不能去y国家

function getMinN(x, y, cntx, cnty) {
  let peopleX = [];
  let peopleY = [];
  let i;
  for (i = 1; peopleX.length < cntx || peopleY.length < cnty; i++) {
    if (i % x !== 0 && peopleX.length < cntx) {
      peopleX.push(i);
    } else if (i % y !== 0 && peopleY.length < cnty) {
      peopleY.push(i);
    }
  }
  return i - 1;
}
