function doublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
  
  function Node(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
    this.child = [];
  }
  
  doublyLinkedList.prototype.add = function (val) {
    let newNode = new Node(val);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    
    this.length++;
  }
  
  doublyLinkedList.prototype.toString = function () {
    return this.backwordString();
  }
  
  
  doublyLinkedList.prototype.backwordString = function () {
    let current = this.head;
    var str = '';
    
    while (current) {
      str += current.val + '__';
      current = current.next;
    }
    return str;
  }
  
  doublyLinkedList.prototype.insert = function (position, data) {
    if (position < 0 || position >= this.length) return false;
    let newNode = new Node(data);
    
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (position === 0) {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      } else if (position === this.length) {
        newNode.next = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      } else {
        let current = this.head;
        let index = 0;
        while (index++ < position) {
          current = current.next;
        }
        current.prev.next = newNode;  // 修正当前node 的前一位的next指向
        newNode.prev = current.prev;   // 修正新值的，prev的指向
        current.prev = newNode;       // 修正当前值的，前一位指向
        newNode.next = current;       // 修正新值的 next指向
      }
      this.length++;
      return true;
    }
  }
  
  doublyLinkedList.prototype.get = function (position) {
    if (position < 0 || position > this.length) return null;
    
    if (position <= this.length / 2) {
      let current = this.head;
      let index = 0;
      while (index++ < position) {
        current = current.next;
      }
      return current.val;
    } else {
      let current = this.tail;
      let index = this.length - 1;
      while (index-- > position) {
        current = current.prev;
      }
      return current.val;
    }
  }
  
  doublyLinkedList.prototype.indexOf = function(val){
    let current = this.head;
    let index = 0;
    while(current){
      if(current.val === val) return index;
      current = current.next;
      index++;
    }
    return false;
  }
  
  doublyLinkedList.prototype.removeAt = function(position){
    if(position < 0 || position >= this.length) return null;
    
    let current = this.head;
    if(this.length === 1){
      this.head = null;
      this.tail = null;
    }else{
      if(position === 0){
        this.head.next.prev = null;
        this.head = this.head.next;
      }else if(position === this.length -1){
        current = this.tail;
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
      }else{
        let index = 0;
        while(index++ < position){
          current = current.next;
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }
    }
    this.length--;
    return current.val;
  }
  
}

// let doubleListNode = new doublyLinkedList();
//
// [2,5,6,7,10,4,13,34,1,55].forEach(item =>{
//   doubleListNode.add(item)
// })

// console.log(doubleListNode);
// console.log(doubleListNode.toString());


let testArr = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12];
// let listNode = new doubleListNodeOfChild();

function reverseArr(arr){
  let temp = [];
  let newTestArr = [];
  arr.forEach((item,index)=>{
    let prev = arr[index - 1];
    if(item){
      if(index === arr.length -1){
        newTestArr.push(temp);
      }else{
        temp.push(item);
      }
    }else if(item === null && prev !== null){
      newTestArr.push(temp);
      temp = [];
    }else if(item === null && prev === null){
      temp.push(item);
    }
  })
  return newTestArr.reverse();
}

console.log(reverseArr(testArr));
