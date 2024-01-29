const A = [1,2,3];
const B = [4,5,6];
const C = [7, 8,9];

function find(num){
  let arrMap = {
    'A':A,
    'B':B,
    'C':C
  };
  let result = '';
  for(let key in arrMap){
    if(arrMap[key].includes(num)){
      result = key;
      break;
    }
  }
  return result;
}

console.log(find(4));