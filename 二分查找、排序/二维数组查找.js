function searchInMatrix(matrix, target) {
    // write code here
    let i = 0;
    let j = matrix[0].length - 1;
    while (i < matrix.length && j >= 0) {
        if (target === matrix[i][j]) {
            return true;
        } else if (target < matrix[i][j]) {
            j--;
        } else {
            i++;
        }
    }
    return false;
}

const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8]
];
console.log(searchInMatrix(matrix, 5));
