// 类数组无重复对象的集合
let set1 = new Set(['val1', 'val2', 'val3', 'val4', 'val5']);
console.log(set1);

let set2 = new Set();
set2.add('1');
set2.add('2');
set2.add('3').add(4);
console.log(set2.length); // undefined

console.log(set2.has('1'));  // true

console.log(set2.size); // 4

set2.delete('1');
console.log(set2);
console.log(set2.size); // 3

set2.clear();
console.log(set2.size);
for(let item in set1){
  console.log(item);
}

// 去重
let arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
let set3 = new Set(arr);
console.log(set3);

console.log(set3.keys()); // [Set Iterator] { 1, 2, 3, 4, 5 }

// weekSet 与set的区别, weekSet中的元素只能是对象，且对象的引用地址不能改变