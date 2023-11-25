// 第一行 从左到右，第二行从右到左，第三行从左到右，第四行从右到左，以此类推

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }
  
  arrToTree(arr) {
    const nodesQueue = arr.map(e => e !== "#" ? new TreeNode(e) : null);
    let i = 0;
    while (i * 2 + 1 < nodesQueue.length) {
      if (nodesQueue[i] !== null) {
        nodesQueue[i].left = nodesQueue[i * 2 + 1] !== undefined ? nodesQueue[i * 2 + 1] : null;
        nodesQueue[i].right = nodesQueue[i * 2 + 2] !== undefined ? nodesQueue[i * 2 + 2] : null;
      }
      i++;
    }
    this.root = nodesQueue[0];  // Root of the tree
  }
}

module.exports = {
  TreeNode,
  Tree
};
const tree = new Tree();
tree.arrToTree([1, 2, 3, "#", "#", 4, 5]);

function printTreeByToAndFro(tree){
  let res = [];
  if(!tree.root) return res;
  let queue = [];
  queue.push(tree.root);
  let isToRight = true;
  while(queue.length > 0){
    // 一定要提前将queue的长度保存下来，因为queue的长度会变化
    let len = queue.length;
    // 定义数组，存储当前层
    let level = [];
    for(let i = 0; i < len; i++){
      let node = queue.shift();
      if(isToRight){
        level.push(node.value);
      }else{
        level.unshift(node.value);
      }
      if(node.left){
        queue.push(node.left);
      }
      if(node.right){
        queue.push(node.right);
      }
    }
    res.push(level);
    isToRight = !isToRight;
  }
  return res;
}

console.log(printTreeByToAndFro(tree));

'abc'.toUpp
