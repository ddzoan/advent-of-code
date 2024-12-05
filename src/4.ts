import {importFile} from './utils/utils';

const data = importFile(__filename).trim();
// console.log(data)
// const data = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`
// const data = `..X...
// .SAMX.
// .A..A.
// XMAS.S
// .X....`

const nextLetterMap = {
    X: 'M',
    M: 'A',
    A: 'S',
}

const isInBounds = (position, grid) => {
    const [row, col] = position;
    return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
}

const searchDir = (diff, row, col, grid): number => {
    // console.log(diff, row, col)
    let searchingFor = 'X';
    let currentRow = row;
    let currentCol = col;
    while(isInBounds([currentRow, currentCol], grid)) {
        if(grid[currentRow][currentCol] === searchingFor) {
            // console.log(currentRow, currentCol)
            if(searchingFor === 'S') {
                return 1;
            }
            currentRow += diff[0];
            currentCol += diff[1];
            searchingFor = nextLetterMap[searchingFor];
        } else {
            return 0;
        }
    }
    return 0;
}

const corners = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
]

const isXmas = (row, col, grid): boolean => {
    const opposites1 = [
        grid[row + 1][col + 1],
        grid[row - 1][col - 1],
    ];
    const opposites2 = [
        grid[row + 1][col - 1],
        grid[row - 1][col + 1],
    ]
    return opposites1.includes('M') && opposites1.includes('S') && opposites2.includes('M') && opposites2.includes('S');
}

const grid = data.split('\n').map(line => line.split(''));
// console.log(grid)

let count = 0;
for(let row = 1; row < grid.length - 1; row++) {
    for(let col = 1; col < grid[0].length - 1; col++) {
        // count += dirDiff.map(diff => searchDir(diff, row, col, grid)).reduce((a, b) => a + b);
        if(grid[row][col] === 'A') {
            count += isXmas(row, col, grid) ? 1 : 0;
        }
    }
}

// console.log(searchDir([1,1], 0, 4, grid))

console.log(count)