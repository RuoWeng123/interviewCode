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
