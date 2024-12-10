import { off } from 'process';
import { dirOffset, importFile, isInBounds } from './utils/utils';
import { Logger } from './utils/utils';

const data = importFile(__filename).trim();
const testAnswer = 36;
const testData = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

const posStr = (row, col) => `${row},${col}`;

const dfs = (row, col, grid, visited) => {
    const currentHeight = grid[row][col];
    // console.log(row, col)
    return dirOffset.map(([rowOs, colOs]) => {
        if(!isInBounds([row + rowOs, col+colOs], grid)) {
            return 0;
        }
        const offsetHeight = grid[row + rowOs][col + colOs];
        if(visited.has(posStr(row + rowOs, col + colOs))) {
            return 0;
        } else if(offsetHeight === currentHeight + 1) {
            visited.add(posStr(row + rowOs, col + colOs));
            if(offsetHeight === 9) {
                return 1;
            }
            console.log('going to', row + rowOs, col + colOs)
            return dfs(row + rowOs, col + colOs, grid, visited);
        } else {
            return 0;
        }
    }).reduce((a, b) => a + b);
}


const run = (data, showLogs) => {
    const clog = new Logger(showLogs);
    // clog.log()
    
    let sum = 0;

    const grid = data.split('\n').map(row => row.split('').map(x => parseInt(x)));
    // console.log(grid)
    // dfs(5, 2, grid, new Set())
    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[0].length; col++) {
            if(grid[row][col] === 0) {
                const visited = new Set();
                clog.log(row, col)
                sum += dfs(row, col, grid, visited);
            }
        }
    }
    return sum;
}

const testRunResult = run(testData, true);
console.log(testRunResult);

if(testRunResult === testAnswer) {
    console.log('Test data answer correct! Trying with real input')
    console.log(run(data, false))
}