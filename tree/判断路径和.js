// 判断是否有一条路径的和  等于参数2
const {Tree} = require('./按之字行打印二叉树');
const tree2 = new Tree();
tree2.arrToTree([5,4,8,1,11,'#',9,'#','#',2,7]);
function checkIsPathSumEqNum(tree, num){
  
  const dfs = (node, sum) => {
    if(!node) return false;
    sum += node.value;
    if(!node.left && !node.right){
      return sum === num;
    }
    return dfs(node.left, sum) || dfs(node.right, sum);
  }
  return dfs(tree.root, 0);
}

console.log(checkIsPathSumEqNum(tree2, 27));
