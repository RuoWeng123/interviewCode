
// 反转链表.js
const { Node } = require('./链表');

function reverseListOfRegion (head, m, n) {
  let dummy = new Node()
  dummy.next = head
  let pre = dummy
  // 先将前m-1个节点遍历出来
  for (let i = 1; i < m; i++) {
    pre = pre.next
  }
  // 从第m个节点开始反转
  let cur = pre.next
  for (let i = m; i < n; i++) {
    let next = cur.next
    cur.next = next.next
    next.next = pre.next
    pre.next = next
  }
  return dummy.next
}

module.exports = reverseListOfRegion;
