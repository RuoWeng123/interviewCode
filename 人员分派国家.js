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
console.log(getMinN(2,3,3,1));
// 如果我现在对上面的题做一个变种，输入一个数组长度为2N； 前N位表示国家代号，后N位表示国家需要的人员数量
// 需要从1-N中找出满足如下规则的人员分配方案：
function getMinK(list){
  let citys = list.slice(0, list.length/2);
  let cityPersonList = list.slice(list.length/2);
  let cityPersonMap = {};
  for(let i = 0; i< citys.length; i++){
    cityPersonMap[citys[i]] = cityPersonList[i];
  }
  let peopleMap = {};
  let i = 1;
  while(true){
    let flag = true;
    for(let key in cityPersonMap){
      if(i%key === 0){
        flag = false;
        break;
      } 
    }
    if(flag){
      peopleMap[i] = true;
    }
    if(Object.keys(peopleMap).length === cityPersonList.length){
      break;
    }
    i++;
  }
}
console.log(getMinK([2,3,3,1]));