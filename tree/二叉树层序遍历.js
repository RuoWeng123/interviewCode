const {Tree} = require('./二叉树');
const tree = new Tree();
tree.arrToTree([1, 2, 3, "#", "#", 4, 5]);

function printTreeByLevel(tree){
  let res = [];
  if(!tree.root) return res;
  let queue = [];
  queue.push(tree.root);
  while(queue.length > 0){
    // 一定要提前将queue的长度保存下来，因为queue的长度会变化
    let len = queue.length;
    // 定义数组，存储当前层
    let level = [];
    for(let i = 0; i < len; i++){
      let node = queue.shift();
      level.push(node.value);
      if(node.left){
        queue.push(node.left);
      }
      if(node.right){
        queue.push(node.right);
      }
    }
    res.push(level);
  }
}
