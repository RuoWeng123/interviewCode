// 30个小孩围城1圈，依次报数，数到3 的小孩退出圈，依次循环，最后剩余的小孩 编号是多少？
const residualKids = (num, step) =>{
  let kids = [];
  for(let i = 1; i<= num; i++){
    kids.push(i);
  }
  let exitCount = 0;
  let counter = 0;  // 记录报数
  let curIndex = 0;  // 记录当前的小孩
  while(exitCount < num - 1){
    if(kids[curIndex] !== 0){
      counter++;
      if(counter === step){
        kids[curIndex] = 0;
        exitCount++;
        counter = 0;
      }
    }
    curIndex++;
    if(curIndex === num){
      curIndex = 0;
    }
  }
  return kids.filter(v => v !==0)[0];
}
console.log(residualKids(30, 3));