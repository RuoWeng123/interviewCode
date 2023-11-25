// 输入{1，2，3，4，5}， 在 num =2时，输出{2，1，4，3，5}
function reverseListOfGroup(head, k){
  if(k ===1 || !head || !head.next) return head;
  let tail = head;
  let pre = null;
  let cur = head;
  let root = null;
  
  for(let i = 1; i <= k; i++){
    // 长度不足时，不反转了
    if(!tail && i < k) return head;
    tail = tail.next;
  }
  // 反转K 个长度的链表
  for(let i = 1; i<= k; i++){
    let temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }
  // 一组反转后，root指向的是反转后的头节点
  root = pre;
  head.next = reverseListOfGroup(tail, k);
  
  return root;
}
