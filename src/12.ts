import { dir } from 'console';
import { dirOffset, importFile, isInBounds, posStr } from './utils/utils';

let shouldLog = true;
const clog = (...args) => shouldLog && console.log(...args);

const data = importFile(__filename).trim();
const testAnswer = 1930;
// const testData = `AAAA
// BBCD
// BBCC
// EEEC`
const testData = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

const expand = (point, crop, grid, visited) => {
    if(visited.has(posStr(point))) {
        return {area: 0, perimeter: 0};
    }
    visited.add(posStr(point));
    console.log(point)
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
    result = result.map(point => expand(point, crop, grid, visited)).reduce((a, b) => ({area: a.area + b.area, perimeter: a.perimeter + b.perimeter}), {area: 0, perimeter: 0});
    console.log('result', result)
    if(result.length === 0) {
        return {area: 1, perimeter};
    }
    return {area: 1 + result.area, perimeter: perimeter + result.perimeter};
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
            if(!(crop in fenceData)) {
                fenceData[crop] = {area: 0, perimeter: 0};
            }
            if(!visited.has(posStr(row, col))) {
                console.log(crop)
                const {area, perimeter} = expand([row, col], crop, grid, visited);
                console.log(area, perimeter)
                cost += area * perimeter;
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