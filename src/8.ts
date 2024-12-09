import { importFile, isInBounds } from './utils/utils';

const data = importFile(__filename).trim();
const testAnswer = 0;
const testData = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

const grid = data.split('\n').map(row => row.split(''));

const freqPoints = {};
const anitNodes = new Set();

for(let row = 0; row < grid.length; row++) {
    for(let col = 0; col < grid.length; col++) {
        const cell = grid[row][col];
        if(cell !== '.') {
            if(!(cell in freqPoints)) {
                freqPoints[cell] = [];
            }
            freqPoints[cell].push([row, col]);
        }
    }
}

// console.log(freqPoints)

const pointToString = point => `${point[0]},${point[1]}`;

Object.values(freqPoints).forEach(points => {
    for(let i = 0; i < points.length; i++) {
        for(let j = i + 1; j < points.length; j++) {
            const first = points[i];
            const second = points[j];
            const diff = [first[0] - second[0], first[1] - second[1]]

            let mult = 0;
            let antinode = [points[i][0] + diff[0]*mult, points[i][1] + diff[1]*mult];
            while(isInBounds(antinode, grid)) {
                anitNodes.add(pointToString(antinode));
                mult++;
                antinode = [points[i][0] + diff[0]*mult, points[i][1] + diff[1]*mult];
            }

            mult = 0;
            let antinode2 = [points[j][0] - diff[0]*mult, points[j][1] - diff[1]*mult];
            while(isInBounds(antinode2, grid)) {
                anitNodes.add(pointToString(antinode2));
                mult++;
                antinode2 = [points[i][0] - diff[0]*mult, points[i][1] - diff[1]*mult];
            }
        }
    }
});

// console.log(Array.from(anitNodes).sort((a, b) => a[0] - b[0]))
// console.log(Array.from(anitNodes).sort())
console.log(anitNodes.size)