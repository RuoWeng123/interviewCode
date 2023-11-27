// 二叉树 转 双向链表，本质就是中序遍历
const {Tree} = require('./二叉树');
const tree = new Tree();
tree.arrToTree([10,6,14,4,8,12,16]);

// 中序遍历，时间复杂度O(n)，空间复杂度O(n)
function inorderTraverse(tree){
  let res = [];
  const dfs = (node) => {
    if(!node) return;
    dfs(node.left);
    res.push(node.value);
    dfs(node.right);
  }
  dfs(tree.root);
  return res;
}
console.log(inorderTraverse(tree));

// 中序遍历，时间复杂度O(n)，空间复杂度O(1), 因此不能创建数组

