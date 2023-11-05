//  将一个 数组 调整为  数组树
// type Tree = {
//   id: number;
//   parentId: number;
//   children: Tree[];
// }
/**
 * @param {Array<{id: number; patienId: number}>} arr {id: number, parentId: number}[]
 * @return {Tree} tree
 */

let tree = {};
const findParent = function(id, tree) {
  if (tree.id === id) {
    return tree;
  } else {
    if (tree.children) {
      let len = tree.children.length;
      for (let i = 0; i < len; i++) {
        let item = tree.children[i];
        if (item.id === id) {
          return item;
        } else {
          if (item.children) {
            let parent = findParent(id, item);
            if (parent) {
              return parent;
            }
          }
        }
      }
    }
  }

}
const formataArrToTree = function(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let item = arr[i];
    if (item.patientId === 0) {
      tree = item;
      arr.splice(i, 1);
      i--;
      len--;
    } else {
      let parent = findParent(item.patientId, tree);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(item);
        arr.splice(i, 1);
        i--;
        len--;
      }
    }
  }
  if (arr.length) {
    formataArrToTree(arr);
  }
}

let arr = [
  {id: 1, patientId: 0},
  {id: 2, patientId: 1},
  {id: 3, patientId: 1},
  {id: 8, patientId: 1},
  {id: 4, patientId: 2},
  {id: 5, patientId: 2},
  {id: 6, patientId: 3},
  {id: 7, patientId: 3}];
formataArrToTree(arr);
console.log(tree);

// 将tree 逆转为  数组
let arr1 = [];
const treeToArr = function(tree) {
  if (tree) {
    arr1.push(tree);
    if (tree.children) {
      let len = tree.children.length;
      for (let i = 0; i < len; i++) {
        treeToArr(tree.children[i]);
      }
    }
  }
}