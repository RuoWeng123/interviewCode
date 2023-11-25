const {Tree} = require('./按之字行打印二叉树');
const tree = new Tree();
tree.arrToTree([1, 2, 3, "#", "#", 4, 5]);

// 获取树的最大深度
const getTreeDeep = (tree) => {
  let level = 0;
  let queue = []
  queue.push(tree.root);
  while (queue.length > 0){
    let len = queue.length;
    for(let i = 0; i < len; i++){
      let node = queue.shift();
      if(node.left){
        queue.push(node.left);
      }
      if(node.right){
        queue.push(node.right);
      }
    }
    level++;
  }
  return level;
}

console.log(getTreeDeep(tree));

const tree2 = new Tree();
tree2.arrToTree([5,4,8,1,11,'#',9,'#','#',2,7]);
console.log(getTreeDeep(tree2));
