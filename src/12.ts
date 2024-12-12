import { dir } from 'console';
import { dirOffset, importFile, isInBounds, posStr } from './utils/utils';

let shouldLog = true;
const clog = (...args) => shouldLog && console.log(...args);

const data = importFile(__filename).trim();
const testAnswer = 80;
const testData = `AAAA
BBCD
BBCC
EEEC`
// const testData = `RRRRIICCFF
// RRRRIICCCF
// VVRRRCCFFF
// VVRCCCJFFF
// VVVVCJJCFE
// VVIVCCJJEE
// VVIIICJJEE
// MIIIIIJJEE
// MIIISIJEEE
// MMMISSJEEE`

const above = (row, col, grid) => isInBounds([row - 1, col], grid) ? grid[row - 1][col] : null;
const left = (row, col, grid) => isInBounds([row, col - 1], grid) ? grid[row][col - 1] : null;
const below = (row, col, grid) => isInBounds([row + 1, col], grid) ? grid[row + 1][col] : null;
const right = (row, col, grid) => isInBounds([row, col + 1], grid) ? grid[row][col + 1] : null;
const topright = (row, col, grid) => isInBounds([row - 1, col + 1], grid) ? grid[row - 1][col + 1] : null;
const bottomright = (row, col, grid) => isInBounds([row + 1, col + 1], grid) ? grid[row + 1][col + 1] : null;
const topleft = (row, col, grid) => isInBounds([row - 1, col - 1], grid) ? grid[row - 1][col - 1] : null;
const bottomleft = (row, col, grid) => isInBounds([row + 1, col - 1], grid) ? grid[row + 1][col - 1] : null;

const countCorners = (point, grid) => {
    const [row, col] = point;
    const crop = grid[row][col];
    let corners = 0;
    // check top left
    if(left(row, col, grid) !== crop && above(row, col, grid) !== crop) {
        corners++;
    } else if(left(row, col, grid) === crop && above(row, col, grid) === crop && topleft(row, col, grid) !== crop) {
        corners++;
    }

    // check top right
    if(right(row, col, grid) !== crop && above(row, col, grid) !== crop) {
        corners++;
    } else if(right(row, col, grid) === crop && above(row, col, grid) === crop && topright(row, col, grid) !== crop) {
        corners++;
    }

    // check bottom left
    if(left(row, col, grid) !== crop && below(row, col, grid) !== crop) {
        corners++;
    } else if(left(row, col, grid) === crop && below(row, col, grid) === crop && bottomleft(row, col, grid) !== crop) {
        corners++;
    }

    // check bottom right
    if(right(row, col, grid) !== crop && below(row, col, grid) !== crop) {
        corners++;
    } else if(right(row, col, grid) === crop && below(row, col, grid) === crop && bottomright(row, col, grid) !== crop) {
        corners++;
    }
    return corners;
}

const expand = (point, crop, grid, visited) => {
    if(visited.has(posStr(point))) {
        return {area: 0, perimeter: 0, corners: 0};
    }
    visited.add(posStr(point));
    console.log(point)
    const corners = countCorners(point, grid);
    console.log(corners, 'corners at', point)
    let perimeter = 0;
    const nextPoints = dirOffset.map(([rowOffset, colOffset]) => ([point[0] + rowOffset, point[1] + colOffset]))
    // clog(nextPoints)
    nextPoints.forEach(point => {
        if(!isInBounds(point, grid)) {
            perimeter++;
        }
        if(isInBounds(point, grid) && grid[point[0]][point[1]] !== crop) {
            perimeter++;
        }
    });
    console.log('peri', perimeter)
    let result = nextPoints.filter(point => isInBounds(point, grid))
    // console.log('inbounds', result)
    result = result.filter(point => grid[point[0]][point[1]] === crop)
    // console.log('samecrop', result)
    result = result.filter(point => !visited.has(posStr(point)));
    console.log('newonly', result)
    result = result
                .map(point => expand(point, crop, grid, visited));
                console.log('map', result)
                result = result
                .reduce((a, b) => ({area: a.area + b.area, perimeter: a.perimeter + b.perimeter, corners: a.corners + b.corners}), {area: 0, perimeter: 0, corners: 0});
    console.log('result', result)
    if(result.length === 0) {
        return {area: 1, perimeter, corners};
    }
    return {area: 1 + result.area, perimeter: perimeter + result.perimeter, corners: corners + result.corners};
    // result.area++;
    // result.perimeter += perimeter;
    // return result;
}

const run = (data) => {
    const grid = data.split('\n').map(row => row.split(''));

    // clog(grid)
    const fenceData = {};
    const visited = new Set();
    let cost = 0;
    // console.log(expand([1, 0], grid[1][0], grid, visited))
    // return 0;
    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[0].length; col++) {
            const crop = grid[row][col];
            // if(!(crop in fenceData)) {
            //     fenceData[crop] = {area: 0, perimeter: 0, corn};
            // }
            if(!visited.has(posStr(row, col))) {
                clog(crop)
                const {area, perimeter, corners} = expand([row, col], crop, grid, visited);
                clog(area, perimeter, corners)
                // cost += area * perimeter;
                cost += area * corners;
            }
            
        }
    }
    // clog(fenceData)
    return cost;
}

const testRunResult = run(testData);
console.log(testRunResult);

if(testRunResult === testAnswer) {
    console.log('Test data answer correct! Trying with real input')
    shouldLog = false;
    console.log(run(data))
}