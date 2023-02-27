// add函数, 奇数次执行输出1,偶数次执行输出0
// 写个add函数, 奇数次执行输出1，偶数次执行输出0
// add() 1
// add() 0
// add() 1
// add() 0
function test() {
  test.count = test.count ? test.count+1 : 1
  if (test.count % 2 === 0) {
    console.log(0)
  } else {
    console.log(1)
  }
}
test();
test();
test();
test();


function a(){
  let tempNum = 0;
  return function (){
    tempNum++;
    if(tempNum%2 === 1){
      console.log(1);
    }else{
      console.log(0);
      tempNum = 0;
    }
  }
};
let b= a();
b();
b();
b();
b();
