// # 单链表
// 定义：每一个节点包含 数据和 下一个节点的引用。最后一个节点的下一个节点引用为空。
class Node {
  constructor(element) {
    this.val = element;
    this.next = null;
  }
}
class LinkedList{
  constructor() {
    this.head = null;
    this.length = 0;
  }
  insertAtBeginning(data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }
  
  insertAtEnd(data) {
    let newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let tail = this.head;
    while (tail.next) {
      tail = tail.next;
    }
    tail.next = newNode;
  }
  
  deleteNode(data) {
    if (!this.head) {
      return;
    }
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }
    let previous = this.head;
    let current = previous.next;
    while (current) {
      if (current.data === data) {
        previous.next = current.next;
        return;
      }
      previous = current;
      current = current.next;
    }
  }
}

module.exports = {
  Node,
  LinkedList
};
// 构造链表实例
const linkedList = new LinkedList();
linkedList.insertAtEnd(1);
linkedList.insertAtEnd(2);
linkedList.insertAtEnd(3);
linkedList.insertAtEnd(4);
linkedList.insertAtEnd(5);
linkedList.insertAtEnd(6);
linkedList.insertAtEnd(7);

const reverseLinkedList = require('./反转链表');

// 现在你可以使用 reverseLinkedList 函数了
// console.log(reverseLinkedList(linkedList.head));
// console.log(linkedList.head);
const reverseListOfRegion = require('./链表指定区域反转');
// console.log(reverseListOfRegion(linkedList.head, 2, 5));

// 合并两个链表
const list1 = new LinkedList();
list1.insertAtEnd(1);
list1.insertAtEnd(3);
list1.insertAtEnd(5);
const list2 = new LinkedList();
list2.insertAtEnd(2);
list2.insertAtEnd(4);
list2.insertAtEnd(6);
const list3 = new LinkedList();
list3.insertAtEnd(7);
list3.insertAtEnd(8);
const list4 = new LinkedList();
list4.insertAtEnd(-1);
// const mergeList = require('./合并链表');
// console.log(mergeList(list1.head, list2.head));
const {mergeListByArr} = require('./合并链表');
console.log(mergeListByArr([list1.head, list2.head, list3.head, list4.head]));
