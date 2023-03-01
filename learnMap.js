let map1 = new Map([[1, 'val1'], [2, 'val2'], [3, 'val3'], [4, 'val4'], [5, 'val5']]);
console.log(map1); // Map { 1 => 'val1', 2 => 'val2', 3 => 'val3', 4 => 'val4', 5 => 'val5' }

let obj = {name: 'anne'};

let map2 = new Map();
map2.set(1, 'test1');
map2.set('2', 'test2');
map2.set(obj, 'test3');
console.log(map2); // Map { 1 => 'test1', '2' => 'test2', { name: 'anne' } => 'test3' }

console.log(map2.get(1)); // test1
console.log(map2.has(obj)); // true
console.log(map2.has(2)); // false

console.log(map2.size); // 3

map2.delete('2');
console.log(map2.size); // 2

map2.clear();
console.log(map2.size); // 0

// weekMap 和 Map的区别，weekMap中的key只能是对象，且对象的引用地址不能改变