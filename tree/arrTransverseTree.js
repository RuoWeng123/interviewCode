const arr = [{
    id: 2,
    name: '部门B',
    parentId: 0
  },
  {
    id: 3,
    name: '部门C',
    parentId: 1
  },
  {
    id: 1,
    name: '部门A',
    parentId: 2
  },
  {
    id: 4,
    name: '部门D',
    parentId: 1
  },
  {
    id: 5,
    name: '部门E',
    parentId: 2
  },
  {
    id: 6,
    name: '部门F',
    parentId: 3
  },
  {
    id: 7,
    name: '部门G',
    parentId: 2
  },
  {
    id: 8,
    name: '部门H',
    parentId: 4
  }
]

const arrTransverseTree = (arr) =>{
  let result = []
  let map = {}
  arr.forEach(item => {
    map[item.id] = item
  })
  arr.forEach(item => {
    let parent = map[item.parentId]
    if(parent){
      (parent.children || (parent.children = [])).push(item)
    }else{
      result.push(item)
    }
  })
  return result
}
let result = arrTransverseTree(arr);
console.log(result);

// 递归
function nest(pid, arr){
  return arr.filter(item => item.parentId === pid).map(item => ({...item, children: nest(item.id, arr)}));
}