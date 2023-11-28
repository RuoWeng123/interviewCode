const {Tree} = require('./二叉树.js');
const tree = new Tree();
tree.arrToTree([1,2,3,4,5,6]);

function checkIsCompleteTree(tree) {
  if(!tree) return false;
  let queue = [tree.root];
  let flag = false;

  while(queue.length) {
    let len = queue.length;
    for(let i = 0; i < len; i++) {
      let node = queue.shift();
      if(node.left) {
        if(flag) return false;
        queue.push(node.left);
      } else {
        // 本层设置的标记，下一层才会调用，或者 右节点存在，左结点不存在
        flag = true;
      }
      if(node.right) {
        if(flag) return false;
        queue.push(node.right);
      } else {
        flag = true;
      }
    }
  }
  return true;
}

console.log(checkIsCompleteTree(tree));








1-1-2-3-5-8-13-21

function debounce(fn, wait){
  let current = this;
  let timer = null;
  
  
  return function(...args){
    
    if(timer){
      timer = null;
    }
    
    timer = setTimeout(() =>{
      fn.apply(current, args);
    }, wait)
  }
}
