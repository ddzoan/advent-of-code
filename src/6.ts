import { importFile } from './utils/utils';

const data = importFile(__filename).trim();
// const data = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`

const locations = new Set();

const grid = data.split('\n').map(row => row.split(''));

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

// console.log(grid)

const findGuard = (grid): number[] => {
    for (let [i, row] of grid.entries()) {
        for (let [j, col] of row.entries()) {
            if (col === '^') {
                // grid[i][j] = '.';
                return [i, j];
            }
        }
    }
}

const inBounds = (position, grid) => {
    return position[0] >= 0 &&
        position[0] < grid.length &&
        position[1] >= 0 &&
        position[1] < grid[0].length
}

const logPosition = (position, set) => {
    set.add(`${position[0]},${position[1]}`)
}

const getNextPosition = (position, dirIndex) => {
    return [
        position[0] + directions[dirIndex][0],
        position[1] + directions[dirIndex][1],
    ];
}

let guardPosition = findGuard(grid);
console.log(guardPosition)

// let dirIndex = 0;
// while (inBounds(guardPosition, grid)) {
//     logPosition(guardPosition, locations);
//     const nextPosition = getNextPosition(guardPosition, dirIndex);
//     if(inBounds(nextPosition, grid)) {
//         if (grid[nextPosition[0]][nextPosition[1]] === "#") {
//             dirIndex = (dirIndex + 1) % 4;
//         } else {
//             guardPosition = nextPosition;
//         }
//     } else {
//         guardPosition = nextPosition;
//     }
// }
// console.log(locations.size)

const posWithDirStr = (position, dir) => `${JSON.stringify(position)}${JSON.stringify(dir)}`;

const logPositionWithDir = (position, dir, set) => {
    set.add(posWithDirStr(position, dir));
}

const hasCycle = (startingPosition, grid) => {
    const visitedPositionsWithDir = new Set();
    let position = [...startingPosition];
    let dirIndex = 0;
    while (inBounds(position, grid) && !visitedPositionsWithDir.has(posWithDirStr(position, directions[dirIndex]))) {
        // console.log("position", position)
        // console.log("dirIndex", dirIndex)
        logPositionWithDir(position, directions[dirIndex], visitedPositionsWithDir);
        // console.log(visitedPositionsWithDir)
        const nextPosition = getNextPosition(position, dirIndex);
        if (!inBounds(nextPosition, grid)) {
            return false;
        } else {
            if (grid[nextPosition[0]][nextPosition[1]] === "#") {
                dirIndex = (dirIndex + 1) % 4;
            } else {
                position = nextPosition;
            }
        }
    }

    return true;
}

// grid[6][3] = '#';
// console.log(hasCycle(guardPosition, grid))

let loopCount = 0;

for(let row = 0; row < grid.length; row++) {
    for(let col = 0; col < grid[0].length; col++) {
        if(grid[row][col] === '.') {
            grid[row][col] = '#';
            hasCycle(guardPosition, grid) && loopCount++;
            grid[row][col] = '.';
        }
    }
}

console.log(loopCount);