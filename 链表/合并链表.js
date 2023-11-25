function mergeList(head1, head2){
  if(head1 === null){
      return head2;
  }
  if(head2 === null){
      return head1;
  }
  let newHead = null;
  if(head1.val <= head2.val){
    newHead = head1;
    newHead.next = mergeList(head1.next, head2);
  }else{
    newHead = head2;
    newHead.next = mergeList(head1, head2.next);
  }
  return newHead;
}

module.exports = mergeList

// 升级版本，传入的参数是 数组，包含N个链表
function mergeListByArr(arr){
  if(arr.length === 0){
    return null;
  }
  if(arr.length === 1){
    return arr[0];
  }
  let mid = Math.floor(arr.length/2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  return mergeList(mergeListByArr(left), mergeListByArr(right));
}

module.exports = {
  mergeList,
  mergeListByArr,
}
