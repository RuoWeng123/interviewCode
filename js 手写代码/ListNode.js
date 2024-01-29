//将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
//
//
//
// 示例 1：
//
//
//输入：l1 = [1,2,4], l2 = [1,3,4]
//输出：[1,1,2,3,4,4]
//
//
// 示例 2：
//
//
//输入：l1 = [], l2 = []
//输出：[]
//
//
// 示例 3：
//
//
//输入：l1 = [], l2 = [0]
//输出：[0]
//
//
//
//
// 提示：
//
//
// 两个链表的节点数目范围是 [0, 50]
// -100 <= Node.val <= 100
// l1 和 l2 均按 非递减顺序 排列
//
// Related Topics 递归 链表 👍 2597 👎 0
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
  
  add(val){
    let newNode = new ListNode(val);
    if(this.next === null){
      this.next = newNode;
    }else{
      this.next.add(val);
    }
  }
  
  find(target){
    let currentNode = this;
    while(currentNode.val !== target){
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  insert(target, val){
    let findNode = this.find(val);
    let currentNode = new ListNode(target);
    currentNode.next = findNode.next;
    findNode.next = currentNode;
  }
  
  findPrev(target){
    let currentNode = this;
    while((currentNode.next !== null) && (currentNode.next.val !== target)){
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  
  remove(target){
    let currentNode = this.findPrev(target);
    if(currentNode.next.next !== null){
      currentNode.next = currentNode.next.next;
    }
  }
  
  print(){
    console.log(this.val);
    if(this.next !== null){
      console.log('-->');
      this.next.print();
    }
  }
}
let testMergeListNode = (arr1, arr2)=>{
  let l1 = arr1.reduce((result, item, index)=>{
    if(index === 0){
      result = new ListNode(item);
      return result;
    }else{
      result.add(item);
      return result;
    }
  },{});
  let l2 = arr2.reduce((result, item, index)=>{
    if(index === 0){
      result = new ListNode(item);
      return result;
    }else{
      result.add(item);
      return result;
    }
  },{});
  
  let l3 = mergeTwoLists(l1, l2);
  console.log(l3.find(4));
}
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

var mergeTwoLists = function (l1, l2) {
  if(!l1){
    return l2;
  }else if(!l2){
    return l1;
  }else if(l1.val < l2.val){
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  }else{
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
//leetcode submit region end(Prohibit modification and deletion)


// testMergeListNode([1,2,4], [1,2,5]);

let l4 = [1,2,4].reduce((result, item, index)=>{
  if(index === 0){
    result = new ListNode(item);
    return result;
  }else{
    result.add(item);
    return result;
  }
},{});
l4.insert(3, 2);
l4.print();
