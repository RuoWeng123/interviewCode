const levelMap = {
  9: 'VERY_SECURE',
  8: 'SECURE',
  7: 'VERY_STRONG',
  6: 'STRONG',
  5: 'AVERAGE'
}
const checkPasswordLength = (password) =>{
  if(password.length <= 4){
    return 5;
  }else if(password.length <= 7){
    return 10;
  }else{
    return 25;
  }
}
const checkPasswordStr = (password) =>{
  if(password.match(/[a-z]/) && password.match(/[A-Z]/)){
    return 20;
  }else if(password.match(/[a-z]/) || password.match(/[A-Z]/)){
    return 10;
  }
  return 0;
}

const checkPasswordNum = (password) =>{
  const numCount = password.replace(/[^0-9]/g, "").length;
  if(numCount === 0){
    return 0;
  }else if(numCount === 1){
    return 10;
  }else{
    return 20;
  }
}
const checkPasswordSymbol = (password) =>{
  const symbolCount = password.replace(/[0-9a-zA-Z]/g, "").length;
  if(symbolCount === 0){
    return 0;
  }else if(symbolCount === 1){
    return 10;
  }else{
    return 25;
  }
}
const checkAddition = (strValue, numValue, symbolValue) =>{
  if(symbolValue === 0){
    return 2;
  }
  if(numValue !== 0 && strValue === 10){
    return 3;
  }
  if(numValue !== 0 && strValue === 25){
    return 5;
  }
  return 0;
}
const calPasswordSafetyLevel = (password) =>{
  
  let lenValue = checkPasswordLength(password);
  let strValue = checkPasswordStr(password);
  let numValue = checkPasswordNum(password);
  let symbolValue = checkPasswordSymbol(password);
  let additionValue = checkAddition(strValue, numValue, symbolValue);
  let value = lenValue + strValue + numValue + symbolValue + additionValue;
  if(value < 25){
    return 'VERY_WEAK';
  }else if(value < 50){
    return 'WEAK';
  }else {
    let level = Math.floor(value / 10);
    return levelMap[level];
  }
}

console.log(calPasswordSafetyLevel('38$@NoNoN'));