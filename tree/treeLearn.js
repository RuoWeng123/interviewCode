// 二叉树类
class myTree {
  constructor() {
    this.root = null;
  }
  // 插入节点
  insert(data) {
    let newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  // 插入节点
  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
  // 中序遍历
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  // 中序遍历
  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.data);
      this.inOrderTraverseNode(node.right, callback);
    }
  }
  // 先序遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  // 先序遍历
  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.data);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }
  // 后序遍历
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  // 后序遍历
  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.data);
    }
  }

  // 广度优先遍历
  breadthFirstTraverse(callback) {
    let queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let node = queue.shift();
      callback(node.data);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }
  // 最小值
  min() {
    return this.minNode(this.root);
  }
  // 最小值
  minNode(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node.data;
    }
    return null
  }
  // 最大值
  max() {
    return this.maxNode(this.root);
  }
  // 最大值
  maxNode(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node.data;
    }
    return null
  }
}

// 节点类
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

let treeInstance = new myTree();
treeInstance.insert(1);
treeInstance.insert(2);
treeInstance.insert(3);
treeInstance.insert(null);
treeInstance.insert(5);
treeInstance.insert(null);
treeInstance.insert(4);
console.log(treeInstance);

// treeInstance.inOrderTraverse((data) =>{ console.log('innerSport', data)});
// treeInstance.preOrderTraverse((data) =>{ console.log('preSport', data)});
treeInstance.postOrderTraverse((data) =>{ console.log('postSport', data)});

