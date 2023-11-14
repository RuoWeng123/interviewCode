// 有效括号问题
function isValid( s ) {
  // write code here
  let leftMap = ['(', '{', '['];
  let leftStack = [];
  let len = s.length;
  if(len % 2 !== 0) return false;
  for(let i = 0; i< len; i++){
    console.log(i);
      let target = s.charAt(i);
      if(leftMap.includes(target)){
          leftStack.push(target);
      }else{
          if(leftStack.length === 0){
              return false;
          }
          if(target === ')'){
              let leftLastTarget = leftStack.pop();
              if(leftLastTarget !== '('){
                  return false;
              }
          }else if(target === ']'){
              let leftLastTarget = leftStack.pop();
              if(leftLastTarget !== '['){
                  return false;
              }
          }else if(target === '}'){
              let leftLastTarget = leftStack.pop();
              if(leftLastTarget !== '{'){
                  return false;
              }
          }
      }
  }
  return leftStack.length === 0;
}

console.log(isValid('()'));
