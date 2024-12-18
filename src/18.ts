import { adjacent, importFile, isInBounds, makeGrid, PositionSet } from './utils/utils';

let shouldLog = true;
const clog = (...args) => shouldLog && console.log(...args);

const data = importFile(__filename).trim();
const testAnswer = 22;
const testData = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`

const pathThrough = (grid, size) => {
    const visited = new PositionSet();
    visited.add([0,0]);
    const queue = [{position: [0,0], distance: 0}];
    while(queue.length > 0) {
        const currentPosition = queue.shift();
        const nextPositions = adjacent(currentPosition?.position).filter(adjPos => grid.isInBounds(adjPos)).filter(adjPos => !visited.has(adjPos)).filter(pos => grid.get(pos) !== '#');
        console.log('current', currentPosition?.position);
        console.log(nextPositions)
        for(let adjPosition of nextPositions) {
            if(adjPosition[0] === size - 1 && adjPosition[1] === size - 1) {
                return currentPosition.distance + 1;
            }
            visited.add(adjPosition);
            queue.push({
                position: adjPosition,
                distance: currentPosition.distance + 1,
            })
        }
    }
    return null;
}

const run = (data, size, bytes) => {
    const grid = makeGrid(size, size);
    // clog(grid)
    const commands = data.split('\n').map(line => line.split(','));
    for(let t = 0; t < bytes && commands[t] !== undefined; t++) {
        console.log(commands[t])
        grid.place(commands[t], '#');
    }
    // grid.display()
    return pathThrough(grid, size);
}

const testRunResult = run(testData, 6 + 1, 12);
console.log(testRunResult);

if(testRunResult === testAnswer) {
    console.log('Test data answer correct! Trying with real input')
    shouldLog = false;
    console.log(run(data, 70 + 1, 1024))
}