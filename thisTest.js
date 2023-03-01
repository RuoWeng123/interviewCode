const obj = {
  fn1: () => console.log(this),
  fn2: function() {console.log(this)}
 }
 
 obj.fn1(); // undefined
 obj.fn2();  // obj
 
 const x = new obj.fn1();  // 报错
 const y = new obj.fn2();  // obj