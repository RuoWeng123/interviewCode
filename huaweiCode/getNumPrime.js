// 输入一个整数，返回他的所有质数因子
// 例如：输入90，返回[2,3,3,5]
const getPrimeOfNum = (num) =>{
  let res = [];
  for(let i = 2; i< num; i++){
    if(i > Math.sqrt(num) +1){
      i = num;
    }
    while(num % i === 0){
      res.push(i);
      num = num / i;
    }
  }
  return res;
}
// 定义二叉树节点
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// 层序遍历函数
const levelOrderTraversal = (root) => {
  if (!root) {
    return [];
  }
  const queue = [root];
  const res = [];
  while (queue.length) {
    const level = [];
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    res.push(level);
  }
  return res;
};

// 测试
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);
console.log(levelOrderTraversal(root)); // [[3], [9, 20], [15, 7]]
