function reverseLinkedList(head){
  if(!head || !head.next){
    return head;
  }
  let current = head;
  let previous = null;
  let next = null;
  while(current){
    next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }
  return previous;
}

module.exports = reverseLinkedList;
