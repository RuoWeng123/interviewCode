let arr = [];
for (let i = 0; i < 5; i++) {
  let row = [];
  for (let j = 0; j < 18; j++) {
    row.push(0);
  }
  arr.push(row);
}

let num = 1;
let direction = 'right';
let top = 0, bottom = 4, left = 0, right = 17;

while (num <= 50) {
  if (direction === 'right') {
    for (let i = left; i <= right && num <= 50; i++) {
      arr[top][i] = num++;
    }
    top++;
    direction = 'down';
  } else if (direction === 'down') {
    for (let i = top; i <= bottom && num <= 50; i++) {
      arr[i][right] = num++;
    }
    right--;
    direction = 'left';
  } else if (direction === 'left') {
    for (let i = right; i >= left && num <= 50; i--) {
      arr[bottom][i] = num++;
    }
    bottom--;
    direction = 'up';
  } else if (direction === 'up') {
    for (let i = bottom; i >= top && num <= 50; i--) {
      arr[i][left] = num++;
    }
    left++;
    direction = 'right';
  }
}