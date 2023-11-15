function getRemainingBytes(occupied) {
  let bytes = new Array(100).fill(0);
  for (let i = 0; i < occupied.length; i++) {
    let start = occupied[i][0];
    let length = occupied[i][1];
    for (let j = start; j < start + length; j++) {
      bytes[j] = 1;
    }
  }

  let result = [];
  let i = 0;
  while (i < 100) {
    if (bytes[i] === 0) {
      let start = i;
      while (i < 100 && bytes[i] === 0) {
        i++;
      }
      result.push([start, i - start]);
    } else {
      i++;
    }code
  }

  return result;
}
console.log(getRemainingBytes([[0, 1], [3, 2]]));
