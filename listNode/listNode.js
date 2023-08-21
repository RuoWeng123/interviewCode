function ListNode (val) {
  this.val = val
  this.next = null
  this.prev = null
}

ListNode.prototype.insert = function (val) {
  let newNode = new ListNode(val)
  if (this.next === null) {
    this.next = newNode
    newNode.prev = this
  } else {
    this.next.insert(val)
  }
}

ListNode.prototype.find = function (val) {
  if (this.val === val) {
    return this
  } else if (this.next === null) {
    return null
  } else {
    return this.next.find(val)
  }
}

ListNode.prototype.findPrev = function (val) {
  if (this.next === null) {
    return null
  } else if (this.next.val === val) {
    return this
  } else {
    return this.next.findPrev(val)
  }
}

ListNode.prototype.remove = function (val) {
  let node = this.find(val)
  if (node === null) {
    return
  }
  if (node.prev === null) {
    this.val = node.next.val
    this.next = node.next.next
  } else {
    node.prev.next = node.next
  }
}

ListNode.prototype.print = function () {
  let str = ''
  let node = this
  while (node !== null) {
    str += node.val + ' ===>'
    node = node.next
  }
  console.log(str)
}

// 反转链表
ListNode.prototype.reverse = function () {
  let node = this
  let prev = null
  while (node !== null) {
    let next = node.next  // 保存下一个节点
    node.next = prev    // 当前节点指向前一个节点
    prev = node        // 前一个节点变成当前节点
    node = next        // 当前节点变成下一个节点
  }
  return prev
}

// 删除链表中的重复元素
ListNode.prototype.deleteDuplicatesNode = function () {
  let node = this
  while (node !== null) {
    let next = node.next
    if (next !== null && node.val === next.val) {
      node.next = next.next
    } else {
      node = next
    }
  }
  return this
}



const listInstance = new ListNode(1)
listInstance.insert(2)
listInstance.insert(3)
listInstance.insert(4)
listInstance.insert(5)

listInstance.reverse().print();

// 环形链表
ListNode.prototype.hasCycle = function () {
  let slow = this
  let fast = this
  while (fast !== null && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      return true
    }
  }
  return false
}